function updatePasswordCheck() {
	updatePasswordCheckPromise('updatePasswordCheck', dataCleanUp($('#update_password').val()), g_CURRENT_LOGIN_USER_ID).then(function(resolve) {
		if(parseInt(resolve) === 0) {
			getCompaniesPromise().then(function(resolve) {
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