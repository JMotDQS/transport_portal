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
				consoleReporting("createVINRecordPromise():Something broke");
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
				console.log("userSearchPromise:data:", data);
				g_USER_SEARCH = [];
				g_USER_SEARCH = data;
				resolve(true);
			},

			error: function(xhr, desc, err) {
				reject(false);
				consoleReporting(xhr)
				consoleReporting("Details: " + desc + "\nError:" + err);
				consoleReporting("createVINRecordPromise():Something broke");
			}
		});
	});
}
/********************************************************
	User Search Promises End
********************************************************/
