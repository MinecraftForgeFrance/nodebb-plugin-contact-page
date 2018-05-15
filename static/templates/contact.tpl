<h2>Contact</h2>
<form class="form-horizontal" action="/action_page.php">
    <div class="form-group">
        <label class="control-label col-sm-2" for="email">Email:</label>
        <div class="col-sm-10">
            <input type="email" class="form-control" id="email" name="email">
        </div>
    </div>
    <div class="form-group">
        <label class="control-label col-sm-2" for="name">Name:</label>
        <div class="col-sm-10">          
            <input type="text" class="form-control" id="name" name="name">
        </div>
    </div>
    <div class="form-group">
        <label class="control-label col-sm-2" for="subject">Subject:</label>
        <div class="col-sm-10">          
            <input type="text" class="form-control" id="subject" name="subject">
        </div>
    </div>
    <div class="form-group">
        <label class="control-label col-sm-2" for="message">Message:</label>
        <div class="col-sm-10">
            <textarea class="form-control" rows="8" id="message"></textarea>
        </div>
    </div>
    <!-- IF recaptcha -->
    <div class="form-group">
        <div class="g-recaptcha" data-sitekey="{recaptcha}"></div>
    </div>
    <!-- ENDIF recaptcha -->
    <div class="form-group">
        <div class="col-sm-offset-2 col-sm-10">
            <button id="send" class="btn btn-default">Send</button>
        </div>
    </div>
</form>