<form role="form" class="contact-page-settings">
	<div class="row">
		<div class="col-xs-12">
            <h2>Contact page settings</h2>
            <div class="row">
                <div class="col-lg-6 col-xs-12">
                    <div class="panel panel-default">
                        <div class="panel-heading">Main settings</div>
                        <div class="panel-body">
                            <div class="form-group">
                                <label for="contactEmail">
                                    Contact email (where the message will be send)
                                </label>
                                <input class="form-control" type="email" name="contactEmail" id="contactEmail" />
                            </div>
                            <div class="form-group">
                                <label for="messageFooter">
                                    Message footer (optional)
                                </label>
                                <input class="form-control" type="text" name="messageFooter" id="messageFooter" />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-6 col-xs-12">
                    <div class="panel panel-default">
                        <div class="panel-heading">Google Re-Captcha (optional)</div>
                        <div class="panel-body">
                            <div class="form-group">
                                <label for="reCaptchaPubKey">
                                    Public API key
                                </label>
                                <input class="form-control" type="text" name="reCaptchaPubKey" id="reCaptchaPubKey" />
                            </div>

                            <div class="form-group">
                                <label for="reCaptchaPrivKey">
                                    Private API key (keep it secret)
                                </label>
                                <input class="form-control" type="text" name="reCaptchaPrivKey" id="reCaptchaPrivKey" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
		</div>
	</div>
</form>

<button id="save" class="floating-button mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored">
	<i class="material-icons">save</i>
</button>