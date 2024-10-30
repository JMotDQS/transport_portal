function userLoginCheck() {
	var userEmail = dataCleanUp($('#login_email').val());
	var userPW = dataCleanUp($('#login_password').val());

	userLoginCheckPromise('userLoginCheck', userEmail, userPW).then(function(resolve) {
		console.log("userLoginCheckPromise:Success");
		console.log("resolve.length:", resolve.length);

		if(resolve.length == 0) {
			console.log("No Match");
		} else {
			console.log("Got a Match");
		}

	}).catch(function(reject) {
		console.log("Fail");
	}).finally(function() {
		console.log("Moving On.");
	});
}