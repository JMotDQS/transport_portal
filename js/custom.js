function keyPressEvent(e) {
	e.preventDefault;
	clearTimer(g_TIMER); // prevent errant multiple timeouts from being generated

	switch(e.data.page) {
		case 'itemAssociation':
			break;

		case 'passwordUpdate':
			break;
	}
}
function keyUpEvent(e) {
	e.preventDefault;
	clearTimer(g_TIMER); // prevent errant multiple timeouts from being generated

	switch(e.data.page) {
		case 'itemAssociation':
			switch(e.data.inputEl) {
				case 'dialog_user_location_id':
				g_TIMER = window.setTimeout(() => {
						toggleDisabled('#' + e.currentTarget.id, true);
						validateLocation(e.data.inputEl, e.data.page);
					}, (g_TIMEOUT_VAL * parseInt(e.data.timerMultiplier)));
					break;

				case 'dialog_user_asso_items':
					g_TIMER = window.setTimeout(() => {
						g_ASSOCIATE_ITEMS = $('#' + e.data.inputEl).val();
						g_ASSOCIATE_ITEMS += ',';
						$('#' + e.data.inputEl).val(g_ASSOCIATE_ITEMS);
						$('#dialog_user_asso_button').removeClass('invisible');
						toggleDisabled('dialog_user_asso_button', false);
					}, (g_TIMEOUT_VAL * parseInt(e.data.timerMultiplier)));
					break;
			}
			break;

		case 'passwordUpdate':
			g_TIMER = window.setTimeout(() => {
				var pw = document.getElementById('update_password').value;
				var pwc = document.getElementById('update_password_conf').value;

				if(pw === pwc) {
					feedBackColoring(document.getElementById('dialog-login-error'), 'green');
					document.getElementById('dialog-login-error').value = 'Passwords match!';
					document.getElementById('dialog-login-error').classList.add('dialog-error-show');
				} else {
					feedBackColoring(document.getElementById('dialog-login-error'), 'red');
					document.getElementById('dialog-login-error').value = 'Passwords MUST match!';
					document.getElementById('dialog-login-error').classList.add('dialog-error-show');
				}
				//toggleDisabled('#' + e.currentTarget.id, true);
				//validateLocation(e.data.inputEl, e.data.page);
			}, (g_TIMEOUT_VAL * parseInt(e.data.timerMultiplier)));
			break;
	}
}