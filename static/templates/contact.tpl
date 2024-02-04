<!-- IMPORT partials/breadcrumbs.tpl -->

<div class="alert alert-danger hidden" id="contact-notify">
    <strong>[[contactpage:contact-error]]</strong>
    <p></p>
</div>

<div class="alert alert-success hidden" id="contact-notify-success">
    <p></p>
</div>

<form id="contact-form" role="form" method="post">
    <div class="row mb-3">
        <label for="email" class="col-sm-2 col-form-label">[[contactpage:form.email]]</label>
        <div class="col-sm-10">
            <input type="email" class="form-control" id="email" name="email">
        </div>
    </div>

    <div class="row mb-3">
        <label for="name" class="col-sm-2 col-form-label">[[contactpage:form.name]]</label>
        <div class="col-sm-10">
            <input type="text" class="form-control" id="name" name="name">
        </div>
    </div>

    <div class="row mb-3">
        <label for="subject" class="col-sm-2 col-form-label">[[contactpage:form.subject]]</label>
        <div class="col-sm-10">
            <input type="text" class="form-control" id="subject" name="subject">
        </div>
    </div>

    <div class="row mb-3">
        <label for="message" class="col-sm-2 col-form-label">[[contactpage:form.message]]</label>
        <div class="col-sm-10">
            <textarea class="form-control resize-v" id="message" name="message" rows="8"></textarea>
        </div>
    </div>

    <input type="hidden" name="_csrf" value="{config.csrf_token}" />
    {{{if recaptcha}}}
    <div class="row mb-3">
        <label class="col-sm-2 col-form-label">[[contactpage:form.captcha]]</label>
        <div class="col-sm-10">
            <div id="contact-page-google-recaptcha"></div>
        </div>
    </div>
    {{{end}}}
    {{{if hcaptcha}}}
    <div class="row mb-3">
        <label class="col-sm-2 col-form-label">[[contactpage:form.captcha]]</label>
        <div class="col-sm-10">
            <div id="contact-page-h-captcha"></div>
        </div>
    </div>
    {{{end}}}
    <div class="row mb-3">
        <div class="offset-sm-2 col-sm-10">
            <button type="submit" id="send" class="btn btn-primary">[[contactpage:btn.send]]</button>
        </div>
    </div>
</form>
