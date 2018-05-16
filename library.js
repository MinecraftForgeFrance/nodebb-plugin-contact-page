const simpleRecaptcha = require('simple-recaptcha-new');
const meta = module.parent.require('./meta');
const emailer = module.parent.require('./emailer');

const ContactPage = {
    reCaptchaPubKey: null,
    reCaptchaPrivKey: null,
    contactEmail: null,
    messageFooter: null,
    // init the plugin
    init(params, callback) {
        let app = params.router;
        let middleware = params.middleware;

        app.get('/contact', middleware.buildHeader, renderContact);
        app.get('/api/contact', renderContact);
        app.post('/contact', postContact);

        // admin panel
        app.get('/admin/plugins/contact-page', middleware.admin.buildHeader, renderAdmin);
        app.get('/api/admin/plugins/contact-page', renderAdmin);

        meta.settings.get('contactpage', (err, options) => {
            if (err) {
                console.log(`[plugin/contactpage] Unable to retrieve settings, will keep defaults: ${err.message}`);
            }
            else {
                // load setting from config if exist
                for(let settingName in ["reCaptchaPubKey", "reCaptchaPrivKey", "contactEmail", "messageFooter"]) {
                    if (options.hasOwnProperty(settingName)) {
                        ContactPage[settingName] = options[settingName];
                    }
                }
            }
        });

        callback();
    },
    // add public token to api
    getConfig(config, callback) {
        config.contactpage = {
            reCaptchaPubKey: ContactPage.reCaptchaPubKey
        };
        callback(null, config);
    },
    addToAdminNav(header, callback) {
        header.plugins.push({
            route: '/plugins/contact-page',
            name: 'Contact page',
        });

        callback(null, header);
    }
};

function renderContact(req, res) {
    return res.render('contact', {
        recaptcha: ContactPage.reCaptchaPubKey,
        title: "Contact"
    });
}

function postContact(req, res) {
    if(!req.body.email || !req.body.name || !req.body.subject || !req.body.message) {
        return res.json({success: false, msg: 'contact-page:form.incomplete'});
    }
    if(ContactPage.reCaptchaPubKey) {
        if(!req.body['g-recaptcha-response']) {
            return res.json({success: false, msg: 'contact-page:form.captcha.incomplete'});
        }
        simpleRecaptcha(ContactPage.reCaptchaPrivKey, req.ip, req.body['g-recaptcha-response'], (err) => {
            if (err) {
                return res.json({success: false, msg: 'contact-page:recaptcha.invalid'});
            } else {
                sendMail(req.body.email, req.body.name, req.body.subject, req.body.message, () => {
                    res.json({success: true});
                });
            }
        });
    } else {
        sendMail(req.body.email, req.body.name, req.body.subject, req.body.message, () => {
            res.json({success: true});
        });
    }
}

function sendMail(from, name, subject, message, callback) {
    var data = {
        to: ContactPage.contactEmail,
        from: meta.config['email:from'] || 'no-reply@' + getHostname(),
        reply_to: from,
        from_name: name,
        subject: subject,
        html: message,
        plaintext: message
    };
    emailer.sendViaFallback(data, () => {
        callback();
    });
}

function renderAdmin(req, res) {
    return res.render('admin/plugins/contact-page');
}

module.exports = ContactPage;
