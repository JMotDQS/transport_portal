function userLoginCheck(e) {
	var userEmail = dataCleanUp($('#login_email').val());
	var userPW = dataCleanUp($('#login_password').val());

	userLoginCheckPromise('userLoginCheck', userEmail, userPW).then(function(resolve) {
		console.log("userLoginCheckPromise:Success");

		if(resolve.length == 0) {
			document.getElementById('dialog-login-error').textContent = 'email/password do not match for admin user';
			document.getElementById('dialog-login-error').classList.add('dialog-login-error-show');
		} else {
			if(parseInt(resolve[0]['is_admin']) === 1) {
				document.getElementById('dialog-login-error').classList.remove('dialog-login-error-show');
				document.getElementById('dialog-login-error').textContent = '';
				g_CURRENT_LOGIN_USER_ID = parseInt(resolve[0]['pk_id']);

				getCompaniesPromise().then(function(resolve) {
					console.log("getCompaniesPromise:Success");
					loadPage('nav', g_NAV);
				}).catch(function(reject) {
					console.log("reject:", reject);
				}).finally(function() {
					console.log("Moving On.");
				});
				closeDialogLogin();
			} else {
				document.getElementById('dialog-login-error').textContent = 'You are NOT an Admin';
				document.getElementById('dialog-login-error').classList.add('dialog-login-error-show');
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