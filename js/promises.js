/********************************************************
	User Login array Promises Start
********************************************************/
function userLoginCheckPromise(param_file, param_email, param_pw) {
	return new Promise(function(resolve, reject) {
		$.ajax({
			url: "includes/" + param_file + ".php",
			type: 'POST',
			cache: false,
			dataType: 'json',
			data: {
				'userEmail': param_email,
				'userPW': param_pw
			},

			success: function (data) {
				resolve(data);
			},

			error: function(xhr, desc, err) {
				reject(false);
				consoleReporting(xhr)
				consoleReporting("Details: " + desc + "\nError:" + err);
				consoleReporting("userLoginCheckPromise():Something broke");
			}
		});
	});
}
/********************************************************
	User Login array Promises End
********************************************************/

/********************************************************
	Set company array Promises Start
********************************************************/
function getCompaniesPromise() {
	return new Promise(function(resolve, reject) {
		$.ajax({
			url: "includes/getCompanies.php",
			type: 'POST',
			cache: false,
			dataType: 'json',

			success: function (data) {
				g_COMPANIES = [];
				g_COMPANIES = data;
				resolve(true);
			},

			error: function(xhr, desc, err) {
				reject(false);
				consoleReporting(xhr)
				consoleReporting("Details: " + desc + "\nError:" + err);
				consoleReporting("getCompaniesPromise():Something broke");
			}
		});
	});
}
/********************************************************
	Set company array Promises End
********************************************************/

/********************************************************
	User Search Promises Start
********************************************************/
function userSearchPromise(param_file, param_search_string) {
	return new Promise(function(resolve, reject) {
		$.ajax({
			url: "includes/" + param_file + ".php",
			type: 'POST',
			cache: false,
			dataType: 'json',
			data: {
				'searchString': param_search_string
			},

			success: function (data) {
				g_USER_SEARCH = [];
				g_USER_SEARCH = data;
				resolve(true);
			},

			error: function(xhr, desc, err) {
				reject(false);
				consoleReporting(xhr)
				consoleReporting("Details: " + desc + "\nError:" + err);
				consoleReporting("userSearchPromise():Something broke");
			}
		});
	});
}
/********************************************************
	User Search Promises End
********************************************************/

/********************************************************
	Add User Promises Start
********************************************************/
function addUserPromise(param_file) {
	return new Promise(function(resolve, reject) {
		$.ajax({
			url: "includes/" + param_file + ".php",
			type: 'POST',
			cache: false,
			dataType: 'json',
			data: {
				'firstName': dataCleanUp($('#dialog_user_first_name').val()),
				'lastName': dataCleanUp($('#dialog_user_last_name').val()),
				'companyId': $('#dialog_user_company').val()
			},

			success: function (data) {
				$('#nav-search-field').val(data);
				userSearch(click_event);
				resolve(true);
			},

			error: function(xhr, desc, err) {
				reject(false);
				console.log(xhr)
				console.log("Details: " + desc + "\nError:" + err);
				console.log("addUserPromise():Something broke");
			}
		});
	});
}
/********************************************************
	Add User Promises End
********************************************************/

/********************************************************
	Validate Badge Promises Start
********************************************************/
function validateLocationPromise(param_file, param_badge) {
	console.log("param_badge:", param_badge);

	return new Promise(function(resolve, reject) {
		$.ajax({
			url: "includes/" + param_file + ".php",
			type: 'POST',
			cache: false,
			dataType: 'json',
			data: {
				'badge_id': param_badge
			},

			success: function (data) {
				resolve(data);
			},

			error: function(xhr, desc, err) {
				reject(false);
				consoleReporting(xhr)
				consoleReporting("Details: " + desc + "\nError:" + err);
				consoleReporting("validateLocationPromise():Something broke");
			}
		});
	});
}
/********************************************************
	Validate Badge Promises End
********************************************************/

/********************************************************
	Record Association Promises Start
********************************************************/
function recordAssociationPromise(param_file) {

	return new Promise(function(resolve, reject) {
		$.ajax({
			url: "includes/" + param_file + ".php",
			type: 'POST',
			cache: false,
			dataType: 'json',
			data: {
				'asso_string': g_ASSOCIATE_ITEMS,
				'new_location': g_NEW_LOCATION
			},

			success: function (data) {
				resolve(data);
			},

			error: function(xhr, desc, err) {
				reject(false);
				console.log(xhr)
				console.log("Details: " + desc + "\nError:" + err);
				console.log("recordAssociationPromise():Something broke");
			}
		});
	});
}
/********************************************************
	Record Association Promises End
********************************************************/

/********************************************************
	Reporting Promises Start
********************************************************/
function reportingPromise(param_file) {

	return new Promise(function(resolve, reject) {
		$.ajax({
			url: "includes/" + param_file + ".php",
			type: 'POST',
			cache: false,
			dataType: 'json',

			success: function (data) {
				console.log("data:", data);
				resolve(data);
			},

			error: function(xhr, desc, err) {
				reject(false);
				console.log(xhr)
				console.log("Details: " + desc + "\nError:" + err);
				console.log("recordAssociationPromise():Something broke");
			}
		});
	});
}
/********************************************************
	Reporting Promises End
********************************************************/