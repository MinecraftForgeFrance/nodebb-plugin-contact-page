<!-- IMPORT partials/breadcrumbs.tpl -->

<div class="alert alert-danger hidden" id="contact-notify">
    <strong>[[contactpage:contact-error]]</strong>
    <p></p>
</div>

<div class="alert alert-success hidden" id="contact-notify-success">
    <p></p>
</div>

<form id="contact-form" class="form-horizontal" role="form" method="post">
    <div class="form-group">
        <label class="control-label col-sm-2" for="email">[[contactpage:form.email]]</label>
        <div class="col-sm-10">
            <input type="email" class="form-control" id="email" name="email">
        </div>
    </div>
    <div class="form-group">
        <label class="control-label col-sm-2" for="name">[[contactpage:form.name]]</label>
        <div class="col-sm-10">
            <input type="text" class="form-control" id="name" name="name">
        </div>
    </div>
    <div class="form-group">
        <label class="control-label col-sm-2" for="subject">[[contactpage:form.subject]]</label>
        <div class="col-sm-10">
            <input type="text" class="form-control" id="subject" name="subject">
        </div>
    </div>
    <div class="form-group">
        <label class="control-label col-sm-2" for="message">[[contactpage:form.message]]</label>
        <div class="col-sm-10">
            <textarea class="form-control vresize" rows="8" id="message" name="message"></textarea>
        </div>
    </div>
    <input type="hidden" name="_csrf" value="{config.csrf_token}" />
    <!-- IF recaptcha -->
    <div class="form-group">
        <label class="control-label col-sm-2">[[contactpage:form.captcha]]</label>
        <div class="col-sm-10">
            <div id="contact-page-google-recaptcha"></div>
        </div>
    </div>
    <!-- ENDIF recaptcha -->
    <div class="form-group">
        <div class="col-sm-offset-2 col-sm-10">
            <button id="send" class="btn btn-primary">[[contactpage:btn.send]]</button>
        </div>
    </div>
</form>
