function updatePasswordCheck() {
	console.log('updatePasswordCheck() called');

	updatePasswordCheckPromise('updatePasswordCheck', dataCleanUp($('#update_password').val()), g_CURRENT_LOGIN_USER_ID).then(function(resolve) {
		console.log("getCompaniesPromise:Success");
		if(parseInt(resolve) === 0) {
			getCompaniesPromise().then(function(resolve) {
				console.log("getCompaniesPromise:Success");
				loadPage('nav', g_NAV);
				closeDialogLogin();
			}).catch(function(reject) {
				console.log("reject:", reject);
			}).finally(function() {
				console.log("Moving On.");
			});
		}else {
			console.log("Password change failed");
		}
	}).catch(function(reject) {
		console.log("reject:", reject);
	}).finally(function() {
		console.log("Moving On.");
	});
}