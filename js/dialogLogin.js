function userLoginCheck() {
	var userEmail = dataCleanUp($('#login_email').val());
	var userPW = dataCleanUp($('#login_password').val());

	userLoginCheckPromise('userLoginCheck', userEmail, userPW).then(function(resolve) {
		console.log("userLoginCheckPromise:Success");
		console.log("resolve.length:", resolve.length);

		if(resolve.length == 0) {
			console.log("No Match");
		} else {
			console.log("resolve:", resolve);
			if(resolve[0]['is_admin'] === 1) {
				console.log("You are an Admin!");

				getCompaniesPromise().then(function(resolve) {
					console.log("getCompaniesPromise:Success");
					loadPage('nav', g_NAV);
				}).catch(function(reject) {
					console.log("Fail");
				}).finally(function() {
					console.log("Moving On.");
				});
				closeDialogLogin();
			} else {
				console.log("You are NOT an Admin...");
			}
		}

	}).catch(function(reject) {
		console.log("Fail");
	}).finally(function() {
		console.log("Moving On.");
	});
}

function closeDialogLogin() {
	loginDialog.close();
}