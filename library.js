const { verify } = require('hcaptcha');
const simpleRecaptcha = require('simple-recaptcha-new');

const meta = require.main.require('./src/meta');
const winston = require.main.require('winston');
const emailer = require.main.require('./src/emailer');
const helpers = require.main.require('./src/controllers/helpers');
const routeHelpers = require.main.require('./src/routes/helpers');

const ContactPage = {
    reCaptchaPubKey: null,
    reCaptchaPrivKey: null,
    hcaptchaPubKey: null,
    hcaptchaSecretKey: null,
    contactEmail: null,
    messageFooter: null,
    // init the plugin
    async init(params) {
        const { router } = params;

        routeHelpers.setupPageRoute(router, '/contact', renderContact);
        router.post('/contact', postContact);

        // admin panel
        routeHelpers.setupAdminPageRoute(router, '/admin/plugins/contact-page', [], renderAdmin);

        try {
            const options = await meta.settings.get('contactpage');
            for(let settingName of ['reCaptchaPubKey', 'reCaptchaPrivKey', 'hcaptchaPubKey', 'hcaptchaSecretKey', 'contactEmail', 'messageFooter']) {
                if (options.hasOwnProperty(settingName)) {
                    ContactPage[settingName] = options[settingName];
                }
            }
        }
        catch (err) {
            winston.warn(`[plugin/contactpage] Unable to retrieve settings, will keep defaults: ${err.message}`);
        }
    },
    // add public token to api
    async getConfig(config) {
        config.contactpage = {
            reCaptchaPubKey: ContactPage.reCaptchaPubKey,
            hcaptchaPubKey: ContactPage.hcaptchaPubKey
        };
        return config;
    },
    async addToAdminNav(header) {
        header.plugins.push({
            route: '/plugins/contact-page',
            name: 'Contact page',
        });

        return header;
    },
    async modifyEmail(mailData) {
        if(mailData && mailData.template == 'contact-page') {
            mailData = modifyFrom(mailData);
        }
        return mailData;
    }
};

function renderContact(req, res) {
    return res.render('contact', {
        recaptcha: ContactPage.reCaptchaPubKey,
        hcaptcha: ContactPage.hcaptchaPubKey,
        breadcrumbs: helpers.buildBreadcrumbs([{ text: '[[contactpage:contact]]' }]),
        title: '[[contactpage:contact]]'
    });
}

async function postContact(req, res) {
    if (!req.body.email || !req.body.name || !req.body.subject || !req.body.message) {
        return res.status(400).json({ success: false, msg: '[[contactpage:error.incomplete]]' });
    }

    try {
        if (ContactPage.reCaptchaPubKey && ContactPage.reCaptchaPrivKey) {
            if(!req.body['g-recaptcha-response']) {
                return res.status(400).json({ success: false, msg: '[[contactpage:error.incomplete.recaptcha]]' });
            }
            await checkReCaptcha(ContactPage.reCaptchaPrivKey, req.ip, req.body['g-recaptcha-response']);
        }

        if (ContactPage.hcaptchaPubKey && ContactPage.hcaptchaSecretKey) {
            if(!req.body['h-captcha-response']) {
                return res.status(400).json({ success: false, msg: '[[contactpage:error.incomplete.recaptcha]]' });
            }
            await verify(ContactPage.hcaptchaSecretKey, req.body['h-captcha-response']);
        }
    }
    catch (err) {
        return res.status(400).json({ success: false, msg: '[[contactpage:error.invalid.recaptcha]]' });
    }

    try {
        await sendMail(req.body.email, req.body.name, req.body.subject, req.body.message);
        res.json({ success: true });
    }
    catch (error) {
        winston.error("[plugin/contactpage] Failed to send mail:" + error);
        res.status(500).json({ success: false, message: '[[contactpage:error.mail]]' });
    }
}

function checkReCaptcha(privateKey, remoteIP, response) {
    return new Promise((resolve, reject) => {
        simpleRecaptcha(privateKey, remoteIP, response, (err, resp) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(resp);
            }
        });
    });
}

function sendMail(replyTo, name, subject, message) {
    let mailParams = {
        content_text: message.replace(/(?:\r\n|\r|\n)/g, '<br>'),
        footer_text: ContactPage.messageFooter,
        from_name: name,
        subject: subject,
        template: 'contact-page',
        uid: 0,
        replyTo
    }

    mailParams = Object.assign({}, emailer._defaultPayload, mailParams);

    return emailer.sendToEmail('contact-page', ContactPage.contactEmail, undefined, mailParams);
}

function modifyFrom(mailData) {
    mailData.from_name = mailData._raw.from_name;
    mailData.replyTo = mailData._raw.replyTo;
    return mailData;
}

function renderAdmin(req, res) {
    return res.render('admin/plugins/contact-page');
}

module.exports = ContactPage;
