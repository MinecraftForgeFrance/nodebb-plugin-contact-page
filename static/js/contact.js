'use strict';

define('forum/contact', ['translator', '//www.recaptcha.net/recaptcha/api.js?onload=renderContactPageCaptcha&render=explicit'], function(translator) {
	var Contact = {};
	var firstLoad = true;
	Contact.init = function() {
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
				success: function (data) {
					showSuccess('[[contactpage:send.success]]');
					$('#contact-form').hide();
				},
				error: function (resp) {
					if(resp && (resp.status == 400 || resp.status == 500) && resp.responseJSON) {
						showError(resp.responseJSON.msg);
					}
					else {
						showError('[[contactpage:error.unknow]]');
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

		// Recaptcha is loaded from onload callback on first load.
		if (!firstLoad) {
			renderContactPageCaptcha();
		} else {
			firstLoad = false;
		}
	};
	return Contact;
});

renderContactPageCaptcha = function() {
	if (config.contactpage.reCaptchaPubKey) {
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
}
