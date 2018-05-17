'use strict';

define('forum/contact', ['translator', 'https://www.google.com/recaptcha/api.js'], function(translator) {
	var Contact = {};
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
				$('#contact-notify').removeClass('alert-success hidden').addClass('alert-danger');
				$('#contact-notify').show();
			});
		}
	
		function showSuccess(msg) {
			translator.translate(msg, function(translatedMsg) {
				$('#contact-notify').find('p').html(translatedMsg);
				$('#contact-notify').removeClass('alert-danger hidden').addClass('alert-success');
				$('#contact-notify').show();
			});
		}
	};
	
	return Contact;
});