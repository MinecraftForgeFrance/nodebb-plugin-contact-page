define('contact', function() {
	var Contact = {};
	
	Contact.init = function() {
		$('#send').on('click', function(e) {
			e.preventDefault();
		});
	};
	
	return Contact;
});