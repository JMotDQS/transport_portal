$(document).ready(function() {
	$('.nav-logo').on('click', function() {
		loadPage($(this).data('page'));
		loadPage('nav', g_NAV);
	});

	getCompaniesPromise().then(function(resolve) {
		console.log("getCompaniesPromise:Success");

		/*var temp_html = `<option selected="true" disabled="disabled" value="">Please Choose Company</option>`;
		for(i = 0; i < g_COMPANIES.length; i++) {
			temp_html += `<option value="${g_COMPANIES[i]['pk_id']}">${g_COMPANIES[i]['company_name']}</option>`
		}
		$('#modal_company').html(temp_html);*/

		//loadPage('index');
		loadPage('nav', g_NAV);
	}).catch(function(reject) {
		console.log("Fail");
	}).finally(function() {
		console.log("Moving On.");
	});
});

function loadPage(param_template, param_element = 'app') {
	var temp_dir = "templates/" + param_element + "/";
	if (param_template != '') {
		temp_dir += param_template + ".html?nc=" + (Math.random() * 1000000);

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
function pageCheck(param_page) {
	clearTimer(g_TIMER);
	clearTimer(g_KEY_RESET_TIMER);

	switch(param_page) {
		case "addUser":	
			buildCompanyDropdown('modal_company');
			openModal('');
			break;

		case "vinCheckIn":
			$('#vinNum').focus();
			setKeyEvents(param_page, 'vinNum');
			break;

		case "keyCheckIn":
			$('#storage-vin-column').css('opacity', 1);
			$('#vinNum').focus();
			setKeyEvents(param_page, 'vinNum');

			$('#storage-bin-column').css('opacity', 0.5);
			toggleDisabled('#binNum', true);
			setKeyEvents(param_page, 'binNum');

			findAllOpenSlots();

			/*$('#storage-badge-column').css('opacity', 0.5);
			toggleDisabled('#badgeNum', true);
			setKeyEvents(param_page, 'badgeNum');*/

			toggleDisabled('.button-container button', true);
			break;

		case "keyCheckOut":
			$('#vinSearch').focus();
			$('#vinSearch').on('keypress', vinSearchKeyPressEvent);
			toggleDisabled('#search-button', true);
			toggleDisabled('#clear-button', false);
			$('#search-results-table').addClass('invisible');

			//setKeyEvents(param_page, 'badgeNumCheckout');

			toggleDisabled('#binNumCheckout', true);
			setKeyEvents(param_page, 'binNumCheckout');

			toggleDisabled('#binNumCheckout', true);
			setKeyEvents(param_page, 'vinNumCheckout');
			break;

		case "search":
			$('#vinSearch').focus();
			$('#vinSearch').on('keypress', vinSearchKeyPressEvent);
			break;

		case "dashboard":
			loadDashboardData();
			break;
			
		default:
			$('#app_version').html(`v ${g_VER}`);
			break;

	}
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

function userSearch(e) {
	e.preventDefault;
	var temp_html = '';	

	/*** If search is done with blank search field ***/
	if($('#nav-search-field').val() == '') {
		temp_html = `Please enter a name to search for.`;
		$('.search-results').html(temp_html);
		$('#app').removeClass('app-feedback');
		$('#app').html('');
	} else {
		temp_html = `<progress></progress>`;
		$('.search-results').html(temp_html);
		$('#app').addClass('app-feedback');
		$('#app').html('Searching...');

		userSearchPromise('userSearch', dataCleanUp($('#nav-search-field').val())).then(function(resolve) {
			console.log("userSearchPromise:Success");
			temp_html = '';
			
			/*** If search result is empty ***/
			if(g_USER_SEARCH.length == 0) {
				temp_html = 'No results found for <b><i>'+ $('#nav-search-field').val() + '</i></b>';
				$('.search-results').html('');
				$('#app').removeClass('app-feedback');
				$('#app').html('');
				openModal(temp_html);

				return false;
			} else {
				temp_html = '';
				for(i = 0; i < g_USER_SEARCH.length; i++) {
					temp_html += `<div class="card" data-id='${g_USER_SEARCH[i]['pk_id']}'>`;
						temp_html += `<div class="card-grid card-titles">`;
								temp_html += `<div>Last, First Name</div>`;
								temp_html += `<div>Badge</div>`;
								temp_html += `<div>Print QR</div>`;
						temp_html += `</div>`;
						temp_html += `<div class="card-grid card-data">`;
							temp_html += `<div>${g_USER_SEARCH[i]['last_name']}, ${g_USER_SEARCH[i]['first_name']}</div>`;

							if(g_USER_SEARCH[i]['badge_id'] == '' || g_USER_SEARCH[i]['badge_id'] == null) {
								g_USER_SEARCH[i]['badge_id'] = null;
								temp_html += `<div class="modal-create" id="new-badge-id_${g_USER_SEARCH[i]['pk_id']}" onclick="generateNewBadge(this)">`;
									temp_html += `<i class="fas fa-plus-square"></i>`;
								temp_html += `</div>`;
							} else {
								temp_html += `<div>${g_USER_SEARCH[i]['badge_id']}</div>`;
							}

							temp_html += `<div class="modal-print" id="user-print_${g_USER_SEARCH[i]['pk_id']}" onclick="printUser(this)">`;
								temp_html += `<i class="fas fa-print"></i>`;
							temp_html += `</div>`;

						temp_html += `</div>`;
					temp_html += `</div>`;
				}

				$('#app').addClass('app-feedback');
				$('#app').html(g_USER_SEARCH.length + ' results found.');
			}
			$('.search-results').html(temp_html);

		}).catch(function(reject) {
			console.log("Fail");
		}).finally(function() {
			console.log("Moving On.");
		})
	}

	return false;
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