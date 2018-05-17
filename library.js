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
                for(let settingName of ["reCaptchaPubKey", "reCaptchaPrivKey", "contactEmail", "messageFooter"]) {
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
        return res.status(400).json({success: false, msg: '[[contactpage:error.incomplete]]'});
    }
    if(ContactPage.reCaptchaPubKey) {
        if(!req.body['g-recaptcha-response']) {
            return res.status(400).json({success: false, msg: '[[contactpage:error.incomplete.recaptcha]]'});
        }
        simpleRecaptcha(ContactPage.reCaptchaPrivKey, req.ip, req.body['g-recaptcha-response'], (err) => {
            if (err) {
                return res.status(400).json({success: false, msg: '[[contactpage:error.invalid.recaptcha]]'});
            } else {
                sendMail(req.body.email, req.body.name, req.body.subject, req.body.message, res);
            }
        });
    } else {
        sendMail(req.body.email, req.body.name, req.body.subject, req.body.message, res);
    }
}

function sendMail(from, name, subject, message, res) {
    if(ContactPage.messageFooter) {
        message += "\n\n" + ContactPage.messageFooter;
    }
    let mailData = {
        from: `"${name}" <${from}>`,
        to: ContactPage.contactEmail,
        replyTo: from,
        subject: subject, 
        text: message
    };

    // send mail with defined transport object
    emailer.fallbackTransport.sendMail(mailData, (error, info) => {
        if (error) {
            return res.status(500).json({success: false, message: '[[contactpage:error.mail]]'});
        }
        return res.json({success: true});
    });
}

function renderAdmin(req, res) {
    return res.render('admin/plugins/contact-page');
}

module.exports = ContactPage;
