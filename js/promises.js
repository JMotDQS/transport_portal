/********************************************************
	User Login Promises Start
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
	User Login Promises End
********************************************************/

/********************************************************
	User Update Password Promises Start
********************************************************/
function updatePasswordCheckPromise(param_file, param_pw, param_user_id) {
	return new Promise(function(resolve, reject) {
		$.ajax({
			url: "includes/" + param_file + ".php",
			type: 'POST',
			cache: false,
			dataType: 'json',
			data: {
				'newPW': param_pw,
				'userId': param_user_id
			},

			success: function (data) {
				resolve(data[0]['change_password']);
			},

			error: function(xhr, desc, err) {
				reject(false);
				consoleReporting(xhr)
				consoleReporting("Details: " + desc + "\nError:" + err);
				consoleReporting("updatePasswordCheckPromise():Something broke");
			}
		});
	});
}
/********************************************************
	User Update Password Promises End
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
	console.log("param_search_string:", param_search_string);
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
				console.log("data:", data);
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
				'abbName': $('#dialog_user_company').val()
			},

			success: function (data) {
				$('#nav-search-field').val(data);
				userSearch(CLICK_EVENT);
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
	Slider Update User Promises Start
********************************************************/
function sliderUpdateRecordPromise(param_file, param_index, param_field, param_value, param_email, param_pw) {
	return new Promise(function(resolve, reject) {
		$.ajax({
			url: "includes/" + param_file + ".php",
			type: 'POST',
			cache: false,
			dataType: 'json',
			data: {
				'indexId': param_index,
				'field': param_field,
				'newValue': param_value,
				'newEmail': param_email,
				'newPw': param_pw
			},

			success: function (data) {
				resolve(true);
			},

			error: function(xhr, desc, err) {
				reject(false);
				console.log(xhr)
				console.log("Details: " + desc + "\nError:" + err);
				console.log("sliderUpdateRecordPromise():Something broke");
			}
		});
	});
}
/********************************************************
	Slider Update User Promises End
********************************************************/

/********************************************************
	Validate Badge Promises Start
********************************************************/
function validateLocationPromise(param_file, param_badge) {
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