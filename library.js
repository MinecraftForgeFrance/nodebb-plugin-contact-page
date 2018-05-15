const socketModule = module.parent.require("./socket.io/modules");
const socketIndex = module.parent.require('./socket.io/index');
const socketPlugins = module.parent.require('./socket.io/plugins');
const meta = module.parent.require('./meta');

const ContactPage = {
    reCaptchaPubKey: null,
    reCaptchaPrivKey: null,
    contactEmail: null,
    messageFooter: null,
    // init the plugin
    init(params, callback) {
        let app = params.router;
        let middleware = params.middleware;

        app.get("/contact", renderContact);

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
        recaptcha: ContactPage.reCaptchaPubKey
    });
}

function renderAdmin(req, res) {
    return res.render('admin/plugins/contact-page');
}

module.exports = ContactPage;
