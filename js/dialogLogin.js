function userLoginCheck(e) {
	var userEmail = dataCleanUp($('#login_email').val());
	var userPW = dataCleanUp($('#login_password').val());

	userLoginCheckPromise('userLoginCheck', userEmail, userPW).then(function(resolve) {
		console.log("userLoginCheckPromise:Success");

		if(resolve.length == 0) {
			document.getElementById('dialog-login-error').textContent = 'email/password do not match for admin user';
			feedBackColoring(document.getElementById('dialog-login-error'), 'red');
			document.getElementById('dialog-login-error').classList.add('dialog-error-show');
		} else {
			if(parseInt(resolve[0]['is_admin']) === 1 && parseInt(resolve[0]['is_active']) === 1) {
				document.getElementById('dialog-login-error').classList.remove('dialog-error-show');
				feedBackColoring(document.getElementById('dialog-login-error'));
				document.getElementById('dialog-login-error').textContent = '';
				g_CURRENT_LOGIN_USER_ID = parseInt(resolve[0]['pk_id']);

				if(parseInt(resolve[0]['change_password']) === 1) {
					loadDialog('passwordUpdate', g_DIALOG, 'dialog_login');
					console.log("Must update password.");
				}

				/*if(getCompanies()) {
					loadPage('nav', g_NAV);
				}*/
				/*getCompaniesPromise().then(function(resolve) {
					console.log("getCompaniesPromise:Success");
					loadPage('nav', g_NAV);
				}).catch(function(reject) {
					console.log("reject:", reject);
				}).finally(function() {
					console.log("Moving On.");
				});*/
				//closeDialogLogin();
			} else {
				document.getElementById('dialog-login-error').textContent = 'You are NOT an Admin and/or Active';
				feedBackColoring(document.getElementById('dialog-login-error'), 'red');
				document.getElementById('dialog-login-error').classList.add('dialog-error-show');
			}
		}

	}).catch(function(reject) {
		console.log("Fail");
	}).finally(function() {
		console.log("Moving On.");
	});
}

function closeDialogLogin() {
	console.log("closeDialogLogin() called");
	loginDialog.close();
}