# nodebb-plugin-contact-page

This NodeBB plugin add a contact form and send the content by email, with a support for Google recaptcha v2.
This allows you to not display your contact email while remaining reachable and reduice spam.

## Installation

`npm install nodebb-plugin-contact-page`

## Configuration

In the admin control panel, go to the setting of the plugin and define the email adress that will receive the email.
You can also define a footer that will be appended to the end of the email.
To avoid spam, add keys for [Google recaptcha v2](https://www.google.com/recaptcha).

You can add a link to the contact form by adding a widget (in Global Footer for example) in the AdminCP, with the follows html code:
```html
<a href="/contact">Contact us</a>
```
if your forum is not installed at the root of your website but in a subfolder (for example www.my-website.com/forum), use this code instead:
```html
<a href="/forum/contact">Contact us</a>
```

## Screenshots

Contact form:
![Contact form](/screenshots/form.png)

And the result mail, preview in thunderbird:
![Result mail](/screenshots/mail.png)

The mail is generated using a template, which can be modified in the AdminCP.