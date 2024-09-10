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

function loadDashboardDataPromise(param_file) {
	return new Promise(function(resolve, reject) {
		$.ajax({
			url: "includes/" + param_file + ".php",
			type: 'POST',
			cache: false,
			dataType: 'json',
			/*data: {
				'vin': checkoutVin,
				'bin': checkoutBin,
				'key_in': 0
			},*/

			success: function (data) {
				resolve(data);
			},

			error: function(xhr, desc, err) {
				reject(false);
				consoleReporting(xhr)
				consoleReporting("Details: " + desc + "\nError:" + err);
				consoleReporting("checkoutKeysPromise():Something broke");
			}
		});
	});
}

/********************************************************
	VIN/Key Audit Export
********************************************************/

function vinInventoryListPromise(param_file) {
	return new Promise(function(resolve, reject) {
		$.ajax({
			url: "includes/" + param_file + ".php",
			type: 'POST',
			cache: false,
			dataType: 'json',

			success: function (data) {
				resolve(data);
			},

			error: function(xhr, desc, err) {
				reject(false);
				consoleReporting(xhr)
				consoleReporting("Details: " + desc + "\nError:" + err);
				consoleReporting("vinInventoryListPromise():Something broke");
			}
		});
	});
}

function exportKMSAuditPromise(param_file) {
	return new Promise(function(resolve, reject) {
		$.ajax({
			url: "includes/" + param_file + ".php",
			type: 'POST',
			cache: false,
			dataType: 'json',

			success: function (data) {
				resolve(data);
			},

			error: function(xhr, desc, err) {
				reject(false);
				consoleReporting(xhr)
				consoleReporting("Details: " + desc + "\nError:" + err);
				consoleReporting("vinInventoryListPromise():Something broke");
			}
		});
	});
}

function checkVINRegPromise(param_file, param_vin) {
	return new Promise(function(resolve, reject) {
		$.ajax({
			url: "includes/" + param_file + ".php",
			type: 'POST',
			cache: false,
			dataType: 'json',
			data: {
				'vin': param_vin
			},

			success: function (data) {
				resolve(data);
			},

			error: function(xhr, desc, err) {
				reject(false);
				consoleReporting(xhr)
				consoleReporting("Details: " + desc + "\nError:" + err);
				consoleReporting("checkVINRegPromise():Something broke");
			}
		});
	});
}

function createKMSAuditRecordPromise(param_file, param_vin_id, param_vin, param_reg) {
	return new Promise(function(resolve, reject) {
		$.ajax({
			url: "includes/" + param_file + ".php",
			type: 'POST',
			cache: false,
			dataType: 'json',
			data: {
				'vin_id': param_vin_id,
				'vin': param_vin,
				'vin_reg': param_reg
			},

			success: function (data) {
				resolve(data);
			},

			error: function(xhr, desc, err) {
				reject(false);
				consoleReporting(xhr)
				consoleReporting("Details: " + desc + "\nError:" + err);
				consoleReporting("createKMSAuditRecordPromise():Something broke");
			}
		});
	});
}

function getKMSAuditRecordsPromise(param_file) {
	return new Promise(function(resolve, reject) {
		$.ajax({
			url: "includes/" + param_file + ".php",
			type: 'POST',
			cache: false,
			dataType: 'json',

			success: function (data) {
				resolve(data);
			},

			error: function(xhr, desc, err) {
				reject(false);
				consoleReporting(xhr)
				consoleReporting("Details: " + desc + "\nError:" + err);
				consoleReporting("getKMSAuditRecordsPromise():Something broke");
			}
		});
	});
}