'use strict';

define('forum/contact', ['translator', 'jquery-form'], function(translator) {
	var Contact = {};
	Contact.init = async () => {
		var email = $('#email');

		email.on('blur', function () {
			if (email.val().length) {
				if(!utils.isEmailValid(email.val())) {
					showError('[[contactpage:invalid.email]]')
				} else {
					$('#contact-notify').hide();
				}
			}
		});

		$('#send').on('click', function(e) {
			e.preventDefault();
			$('#contact-notify').hide();
			$('#contact-form').ajaxSubmit({
				headers: {
					'x-csrf-token': config.csrf_token,
				},
				success: (data) => {
					showSuccess('[[contactpage:send.success]]');
					$('#contact-form').hide();
				},
				error: (resp) => {
					if(resp && (resp.status == 400 || resp.status == 500) && resp.responseJSON) {
						showError(resp.responseJSON.msg);
					}
					else {
						showError('[[contactpage:error.mail]]');
					}
				}
			});
		});

		function showError(msg) {
			translator.translate(msg, function(translatedMsg) {
				$('#contact-notify').find('p').html(translatedMsg);
				$('#contact-notify').removeClass('hidden');
				$('#contact-notify-success').hide();
				$('#contact-notify').show();
			});
		}

		function showSuccess(msg) {
			translator.translate(msg, function(translatedMsg) {
				$('#contact-notify-success').find('p').html(translatedMsg);
				$('#contact-notify-success').removeClass('hidden');
				$('#contact-notify').hide();
				$('#contact-notify-success').show();
			});
		}

		function injectTag(tagName, attrs, options) {
			options = options || {};

			var tag = document.createElement(tagName);
			tag.onload = options.onload || null; // @ie8; img.onload cannot be undefined

			var setAttr = tag.setAttribute ?
				function (tag, key, value) { tag.setAttribute(key, value); return tag; } :
				function (tag, key, value) { tag[key] = value; return tag; };

			Object.keys(attrs).forEach(function (key) {
				tag = setAttr(tag, key, attrs[key]);
			});

			if (options.insertBefore) {
				options.insertBefore.parentNode.insertBefore(tag, options.insertBefore);
			} else if (options.appendChild) {
				options.appendChild.appendChild(tag);
			} else {
				var scripts = document.getElementsByTagName('script');
				scripts[scripts.length - 1].parentNode.appendChild(tag);
			}
		}

		function injectScript(src, options) {
			options = options || {};
			injectTag('script', { src: src, type: 'text/javascript', async: '', defer: '' }, options);
		}

		// Load Google recaptcha if configured
		if (config.contactpage.reCaptchaPubKey) {
			if (!$('script[src*="www.recaptcha.net/recaptcha/api.js"]').length) {
				injectScript('//www.recaptcha.net/recaptcha/api.js?onload=__contactPageRenderReCaptcha__&render=explicit');
			} else if (grecaptcha !== undefined) {
				window.__contactPageRenderReCaptcha__();
			}
		}

		// Load hcaptcha if configured
		if (config.contactpage.hcaptchaPubKey) {
			if (!$('script[src*="js.hcaptcha.com/1/api.js"]').length) {
				injectScript('//js.hcaptcha.com/1/api.js?render=explicit');
			}
		}
	};

	// For a unknown reason, h-captcha won't load with onload query arg, so the plugin use ajaxify.end event to render it.
	$(window).on('action:ajaxify.end', function (evt, data) {
		if (data.url == 'contact' && config.contactpage.hcaptchaPubKey && hcaptcha) {
			hcaptcha.render('contact-page-h-captcha', {
				sitekey: config.contactpage.hcaptchaPubKey,
			});
		}
	});

	return Contact;
});

window.__contactPageRenderReCaptcha__ = function() {
	grecaptcha.render('contact-page-google-recaptcha', {
		sitekey: config.contactpage.reCaptchaPubKey,
		callback: function() {
			var error = utils.param('error');
			if (error) {
				app.alertError(error);
			}
		}
	});
}
