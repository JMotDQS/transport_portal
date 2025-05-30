$(document).ready(function() {
	$('.nav-logo').on('click', function() {
		refreshApp();
	});
	refreshApp();
});

function refreshApp() {
	g_CURRENT_LOGIN_USER_ID = 0;
	g_USER_SEARCH = [];
	g_NO_SEARCH_RESULTS = '';
	g_COMPANIES = [];
	g_NEW_LOCATION = '';
	g_ASSOCIATE_ITEMS = '';
	g_PRINT_USER_OBJ = {};

	document.getElementById('nav').textContent = '';
	document.getElementById('app').textContent = '';
	document.getElementById('search-results').textContent = '';
	//loadDialog('login', g_DIALOG, 'dialog_login');
	loadPage('nav', g_NAV);
}

function loadPage(param_template, param_element = 'app') {
	var temp_dir = "templates/" + param_element + "/";
	if (param_template != '') {
		temp_dir += param_element + ".html?nc=" + (Math.random() * 1000000);

		$('#' + param_element).load(temp_dir,
			function(responseTxt, statusTxt, xhr) {
				switch(statusTxt) {
					case "success":
						$('.navbar-click').on('click', function() {
							loadPage($(this).data('page'));
						});
						pageCheck(param_template);
						break;

					case "error":
						break;
				}
		});
	}
}
function loadDialog(param_template, param_template_dir, param_load_ele, param_user_id = 0) {
	var temp_dir = "templates/" + param_template_dir + "/";
	if (param_template != '') {
		temp_dir += param_template + ".html?nc=" + (Math.random() * 1000000);

		$('#' + param_load_ele).load(temp_dir,
			function(responseTxt, statusTxt, xhr) {
				switch(statusTxt) {
					case "success":
						pageCheck(param_template, param_user_id);
						break;

					case "error":
						break;
				}
		});
	}
}
function pageCheck(param_page, param_user_id) {
	clearTimer(g_TIMER);

	switch(param_page) {
		case "addUser":	
			buildCompanyDropdown('dialog_user_company');
			openDialogUser(g_NO_SEARCH_RESULTS);
			break;

		case "itemAssociation":
			openDialogUser();
			setKeyEvents(param_page, 'dialog_user_location_id');
			$('#dialog_user_asso_button').on('click', recordAssociation);
			break;

		case "login":
			LOGIN_DIALOG.showModal();
			document.getElementById('dialog-login-form-button').addEventListener('click', () => {
				userLoginCheck();
			});
			document.getElementById('dialog-login-grid').addEventListener('keydown', (event) => {
				if(event.key === 'Enter') {
					userLoginCheck();
				}
			});
			break;

		case "passwordUpdate":
			setKeyEvents(param_page, 'update_password', .5);
			setKeyEvents(param_page, 'update_password_conf', .5);
			toggleDisabled('#dialog-password-update-form-button', true);
			document.getElementById('dialog-password-update-form-button').classList.add('button-disabled');
			document.getElementById('update_password').focus();
			document.getElementById('dialog-password-update-form-button').addEventListener('click', () => {
				updatePasswordCheck();
			});
			document.getElementById('dialog-password-grid').addEventListener('keydown', (event) => {
				if(event.key === 'Enter' && !checkIfDisabled('dialog-password-update-form-button')) {
					updatePasswordCheck();
				}
			});
			break;

		case "addAdmin":
			setKeyEvents(param_page, 'add-admin_email', .5);
			toggleDisabled('#dialog-add-admin-form-button', true);
			document.getElementById('dialog-add-admin-form-button').classList.add('button-disabled');
			document.getElementById('dialog-add-admin-form-button').addEventListener('click', () => {
				validateEmail(param_user_id);
			});
			document.getElementById('dialog-add-admin-grid').addEventListener('keydown', (event) => {
				if(event.key === 'Enter') {
					validateEmail(param_user_id);
				}
			});
			ADD_ADMIN_DIALOG.showModal();
			break;

		case "bulkAddUser":
			buildCompanyDropdown('dialog_bulk_add_user_company');
			document.getElementById('dialog-bulk-add-user-button').addEventListener('click', () => {
				sendBulkAddUserData();
			});

			setdialogBulkAddUserEventListenerAssociations();
			BULK_ADD_USER_DIALOG.showModal();
			break;
	}
}

function getCompanies() {
	getCompaniesPromise().then(function(resolve) {
		console.log("getCompaniesPromise:Success");
		//loadPage('nav', g_NAV);
	}).catch(function(reject) {
		console.log("reject:", reject);
	}).finally(function() {
		console.log("Moving On.");
	});
}

function buildCompanyDropdown(param_element) {
	var temp_html = `<option selected="true" disabled="disabled" value="">Please Choose Company</option>`;
	for(i = 0; i < g_COMPANIES.length; i++) {
		temp_html += `<option value="${g_COMPANIES[i]['abb_name']}" data-compId=${g_COMPANIES[i]['pk_id']}>${g_COMPANIES[i]['company_name']}</option>`
	}
	$('#' + param_element).html(temp_html);
}

function dataCleanUp(param_string) {
	var temp_string = param_string.trim().replace(/&/g, "&amp;");
	var temp_len = g_SEARCH_ENTITIES.length;
	for(i = 0; i < temp_len; i++) {
		temp_string = temp_string.replace(new RegExp(g_SEARCH_ENTITIES[i], 'g'), g_REPLACE_ENTITIES[i]);
	}
	return temp_string;
}
function reverseEntities(param_string) {
	var temp_string;
	if(typeof param_string == "string") {
		temp_string = param_string.trim().replace(/&amp;/g, "&");
		var temp_len = g_SEARCH_ENTITIES.length;
		for(i = 0; i < temp_len; i++) {
			temp_string = temp_string.replace(new RegExp(g_REPLACE_ENTITIES[i], 'g'), g_SEARCH_ENTITIES[i]);
		}
		return temp_string;
	}
}

function feedBackColoring(param_ele, param_color = 'default') {
	switch(param_color) {
		case 'red':
			$(param_ele).removeClass('feedback-green');
			$(param_ele).removeClass('feedback-blue');
			$(param_ele).addClass('feedback-red');
			break;

		case 'green':
			$(param_ele).removeClass('feedback-red');
			$(param_ele).removeClass('feedback-blue');
			$(param_ele).addClass('feedback-green');
			break;

		case 'blue':
			$(param_ele).removeClass('feedback-red');
			$(param_ele).removeClass('feedback-green');
			$(param_ele).addClass('feedback-blue');
			break;

		default:
			$(param_ele).removeClass('feedback-red');
			$(param_ele).removeClass('feedback-green');
			$(param_ele).removeClass('feedback-blue');
			break;
	}
}

function sliderSet(param_id, param_copy) {
	if($('#' + param_id).is(':checked')) {
		$('#active-label_' + param_id).removeClass('user-inactive');
		$('#active-label_' + param_id).html('Is ' + param_copy);
	} else {
		$('#active-label_' + param_id).addClass('user-inactive');
		$('#active-label_' + param_id).html('Not ' + param_copy);
	}
}

function sliderClicked(e, param_copy) {
	e.preventDefault;
	let temp_id = parseInt(e.slice(e.indexOf('_') + 1));
	let temp_field = param_copy;
	let temp_value;
	if($('#' + e).is(':checked')) {
		$('#active-label_' + e).removeClass('user-inactive');
		$('#active-label_' + e).html('Is ' + param_copy);
		temp_value = 1;

		if(param_copy == 'Admin') {
			loadDialog('addAdmin', g_DIALOG, 'dialog_add_admin', temp_id);
		} else {
			sliderUpdateRecord('sliderUpdateUser', temp_id, temp_field, temp_value);
		}
	} else {
		$('#active-label_' + e).addClass('user-inactive');
		$('#active-label_' + e).html('Not ' + param_copy);
		temp_value = 0;

		sliderUpdateRecord('sliderUpdateUser', temp_id, temp_field, temp_value);
	}
}

function toggleDisabled(param_ele, param_disabled) {
    $(param_ele).prop('disabled', param_disabled);
}
function toggleDisplay(param_ele, param_class, param_flag) {
	if (param_flag) {
		$(param_ele).addClass(param_class);
	} else {
		$(param_ele).removeClass(param_class);
	}
}

function checkIfDisabled(param_element) {
	return document.getElementById(param_element).disabled;
}

function setKeyEvents(param_page, param_element, param_multiplier = 1) {
	$('#' + param_element).on('keypress', {page: param_page, inputEl: param_element, timerMultiplier: param_multiplier}, keyPressEvent);
	$('#' + param_element).on('keyup', {page: param_page, inputEl: param_element, timerMultiplier: param_multiplier}, keyUpEvent);
}

function clearTimer(param_timer) {
	window.clearTimeout(param_timer); // prevent errant multiple timeouts from being generated
}

function consoleReporting(param) {
	console.log(param);
}