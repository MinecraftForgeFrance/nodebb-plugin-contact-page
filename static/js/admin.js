'use strict';

define('admin/plugins/contact-page', ['settings'], function(Settings) {
	var ContactPage = {};
	
	ContactPage.init = function() {
		Settings.load('contactpage', $('.contact-page-settings'));
	
		$('#save').on('click', function() {
            Settings.save('contactpage', $('.contact-page-settings'), function() {
                app.alert({
                    type: 'success',
                    alert_id: 'contactpage-saved',
                    title: 'Settings Saved',
                    message: 'Please reload your NodeBB to apply these settings',
                    clickfn: function() {
                        socket.emit('admin.reload');
                    }
                })
            });
        });
	};
	
	return ContactPage;
});