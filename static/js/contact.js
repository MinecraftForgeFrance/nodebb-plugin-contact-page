'use strict';

define('forum/contact', [], function() {
	var Contact = {};
	
	Contact.init = function() {
		$('#send').on('click', function(e) {
			e.preventDefault();
			$('#contact-form').ajaxSubmit({
				headers: {
					'x-csrf-token': config.csrf_token,
				},
				success: function (data) {
					console.log(data);
				},
				error: function (data) {
					console.log(data);
				},
			});
		});
	};
	
	return Contact;
});