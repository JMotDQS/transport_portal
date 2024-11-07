function keyPressEvent(e) {
	e.preventDefault;
	clearTimer(g_TIMER); // prevent errant multiple timeouts from being generated

	switch(e.data.page) {
		case 'itemAssociation':
			break;

		case 'passwordUpdate':
			break;

		case 'addAdmin':
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

				if(pw === pwc && pw != '' && pwc != '') {
					feedBackColoring(document.getElementById('dialog-password-error'), 'green');
					document.getElementById('dialog-password-error').textContent = 'Passwords match!';
					document.getElementById('dialog-password-error').classList.add('dialog-error-show');
					toggleDisabled('#dialog-password-update-form-button', false);
					document.getElementById('dialog-password-update-form-button').classList.remove('button-disabled');
				} else if(pw == '' && pwc == '') {
					document.getElementById('dialog-password-error').textContent = '';
					document.getElementById('dialog-password-error').classList.remove('dialog-error-show');
					toggleDisabled('#dialog-password-update-form-button', true);
					document.getElementById('dialog-password-update-form-button').classList.add('button-disabled');
				} else {
					feedBackColoring(document.getElementById('dialog-password-error'), 'red');
					document.getElementById('dialog-password-error').textContent = 'Passwords MUST match!';
					document.getElementById('dialog-password-error').classList.add('dialog-error-show');
					toggleDisabled('#dialog-password-update-form-button', true);
					document.getElementById('dialog-password-update-form-button').classList.add('button-disabled');
				}
			}, (g_TIMEOUT_VAL * parseInt(e.data.timerMultiplier)));
			break;

		case 'addAdmin':
			g_TIMER = window.setTimeout(() => {
				var email = document.getElementById('add-admin_email').value;

				if(email.length > 0) {
					toggleDisabled('#dialog-add-admin-form-button', false);
					document.getElementById('dialog-add-admin-form-button').classList.remove('button-disabled');
				} else {
					toggleDisabled('#dialog-add-admin-form-button', true);
					document.getElementById('dialog-add-admin-form-button').classList.add('button-disabled');
				}
			}, (g_TIMEOUT_VAL * parseInt(e.data.timerMultiplier)));
			break;
	}
}