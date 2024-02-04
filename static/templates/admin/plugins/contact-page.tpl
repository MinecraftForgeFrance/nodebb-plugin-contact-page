<div class="acp-page-container">
	<!-- IMPORT admin/partials/settings/header.tpl -->

	<div class="row m-0">
		<div id="spy-container" class="col-12 px-0 mb-4" tabindex="0">
			<form class="form contact-page-settings">
				<div class="mb-4">
					<h5 class="fw-bold tracking-tight settings-header">Main settings</h5>

                    <div class="mb-3">
						<label class="form-label" for="contactEmail">
							Contact email (where the message will be send)
						</label>
						<input class="form-control" type="email" name="contactEmail" id="contactEmail" />
					</div>

                    <div class="mb-3">
						<label class="form-label" for="messageFooter">
							Message footer (optional)
						</label>
						<input class="form-control" type="text" name="messageFooter" id="messageFooter" />
					</div>
				</div>

				<div class="mb-4">
					<h5 class="fw-bold tracking-tight settings-header">Google Re-Captcha (optional)</h5>

                    <div class="mb-3">
						<label class="form-label" for="reCaptchaPubKey">
							Public API key
						</label>
						<input class="form-control" type="text" name="reCaptchaPubKey" id="reCaptchaPubKey"  />
					</div>

                    <div class="mb-3">
						<label class="form-label" for="reCaptchaPrivKey">
							Private API key (keep it secret)
						</label>
                        <input class="form-control" type="text" name="reCaptchaPrivKey" id="reCaptchaPrivKey" />
					</div>
				</div>

				<div class="mb-4">
                    <h5 class="fw-bold tracking-tight settings-header">hCaptcha (optional)</h5>

                    <div class="mb-3">
						<label class="form-label" for="hcaptchaPubKey">
							API key
						</label>
						<input class="form-control" type="text" name="hcaptchaPubKey" id="hcaptchaPubKey"  />
					</div>

                    <div class="mb-3">
						<label class="form-label" for="hcaptchaSecretKey">
							Private API key (keep it secret)
						</label>
                        <input class="form-control" type="text" name="hcaptchaSecretKey" id="hcaptchaSecretKey" />
					</div>
				</div>
			</form>
		</div>
	</div>
</div>
