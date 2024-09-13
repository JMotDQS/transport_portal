var flag_array = [];
var new_user_array = [];

function openModal(param_search_string = '') {
	resetModalForm()

    var temp_title = `<h3>${param_search_string}</h3><h2>Add User</h2>`;
    $('#title').html(temp_title);

	$('#modal_first_name').keyup( () => {
		if ($('#modal_first_name').val().length > 0) {
			flag_array['first'] = true;
		} else {
			flag_array['first'] = false;
		}

		checkInput();
	});

	$('#modal_last_name').keyup( () => {
		if ($('#modal_last_name').val().length > 0) {
			flag_array['last'] = true;
		} else {
			flag_array['last'] = false;
		}

		checkInput();
	});

	$('#modal_company').change( () => {
		if ($('#modal_company').val() == null) {
			flag_array['company'] = false;
		} else {
			flag_array['company'] = true;
		}

		checkInput();
	});

	myModal.showModal();
}

function closeModal() {
	myModal.close();
	resetModalForm()
}

function addUser() {
	$('#modal_first_name').prop('disabled', true);
	$('#modal_last_name').prop('disabled', true);
	$('#modal_company').prop('disabled', true);

	addUserPromise('addUser').then(function(resolve) {
		closeModal()
	}).catch(function(reject) {
		//console.log("Search Loaded!");
	}).finally(function() {
		//console.log("Fresh Search.");
	});
}

function checkInput() {
	$('.modal-save').addClass('invisible');

	if(flag_array['first'] && flag_array['last'] && flag_array['company']) {
		$('.modal-save').removeClass('invisible');
	}
}

function buildCompanyDropdown(param_element) {
	var temp_html = `<option selected="true" disabled="disabled" value="">Please Choose Company</option>`;
	for(i = 0; i < g_COMPANIES.length; i++) {
		temp_html += `<option value="${g_COMPANIES[i]['pk_id']}">${g_COMPANIES[i]['company_name']}</option>`
	}
	$('#' + param_element).html(temp_html);
}

function generateNewBadge(ele) {
	var chosen_user_id = parseInt(ele.id.substr( ( parseInt(ele.id.indexOf('_') + 1) ) ));

	generateBadgePromise(chosen_user_id).then(function(resolve) {
		startSearch();
	}).catch(function(reject) {
		//console.log("Search Loaded!");
	}).finally(function() {
		//console.log("Fresh Search.");
	});
}

function resetModalForm() {
	flag_array['first'] = false;
	flag_array['last'] = false;
	flag_array['company'] = false;

	$('#modal_first_name').off('keyup');
	$('#modal_last_name').off('keyup');
	$('#modal_company').off('change');

	$('#modal_first_name').val('');
	$('#modal_last_name').val('');
	$('#modal_company').val('');

	$('#modal_first_name').prop('disabled', false);
	$('#modal_last_name').prop('disabled', false);
	$('#modal_company').prop('disabled', false);

	checkInput();
}