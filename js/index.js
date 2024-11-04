$(document).ready(function() {
	loadDialog('login', g_DIALOG, 'dialog_login');
});

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
function loadDialog(param_template, param_template_dir, param_load_ele) {
	var temp_dir = "templates/" + param_template_dir + "/";
	if (param_template != '') {
		temp_dir += param_template + ".html?nc=" + (Math.random() * 1000000);

		$('#' + param_load_ele).load(temp_dir,
			function(responseTxt, statusTxt, xhr) {
				switch(statusTxt) {
					case "success":
						pageCheck(param_template);
						break;

					case "error":
						break;
				}
		});
	}
}
function pageCheck(param_page) {
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
			loginDialog.showModal();
			document.getElementById('dialog-form-button').addEventListener('click', () => {
				userLoginCheck();
			});
			document.getElementById('dialog-login-grid').addEventListener('keydown', (event) => {
				if(event.key === 'Enter') {
					userLoginCheck();
				}
			});
			break;

		case "bulkAddUser":
			buildCompanyDropdown('dialog_bulk_add_user_company');
			document.getElementById('dialog-bulk-add-user-button').addEventListener('click', () => {
				sendBulkAddUserData();
			});

			setdialogBulkAddUserEventListenerAssociations();
			bulkAddUserDialog.showModal();
			break;
	}
}

function buildCompanyDropdown(param_element) {
	var temp_html = `<option selected="true" disabled="disabled" value="">Please Choose Company</option>`;
	for(i = 0; i < g_COMPANIES.length; i++) {
		temp_html += `<option value="${g_COMPANIES[i]['abb_name']}">${g_COMPANIES[i]['company_name']}</option>`
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