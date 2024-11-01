var flag_array = [];
var new_user_array = [];

function openDialogUser(param_search_string = '') {
	resetDialogUserForm()
	$('#dialog-user-no-results').html(param_search_string);

	$('#dialog_user_first_name').keyup( () => {
		if ($('#dialog_user_first_name').val().length > 0) {
			flag_array['first'] = true;
		} else {
			flag_array['first'] = false;
		}

		checkDialogUserInput();
	});

	$('#dialog_user_last_name').keyup( () => {
		if ($('#dialog_user_last_name').val().length > 0) {
			flag_array['last'] = true;
		} else {
			flag_array['last'] = false;
		}

		checkDialogUserInput();
	});

	$('#dialog_user_company').change( () => {
		if ($('#dialog_user_company').val() == null) {
			flag_array['company'] = false;
		} else {
			flag_array['company'] = true;
		}

		checkDialogUserInput();
	});

	userDialog.showModal();
}

function closeDialogUser() {
	userDialog.close();
	resetDialogUserForm()
}

function addUser() {
	$('#dialog_user_first_name').prop('disabled', true);
	$('#dialog_user_last_name').prop('disabled', true);
	$('#dialog_user_company').prop('disabled', true);

	addUserPromise('addUser').then(function(resolve) {
		closeDialogUser()
	}).catch(function(reject) {
		//console.log("Search Loaded!");
	}).finally(function() {
		//console.log("Fresh Search.");
	});
}

function checkDialogUserInput() {
	$('.dialog-save').addClass('invisible');

	if(flag_array['first'] && flag_array['last'] && flag_array['company']) {
		$('.dialog-save').removeClass('invisible');
	}
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

function resetDialogUserForm() {
	flag_array['first'] = false;
	flag_array['last'] = false;
	flag_array['company'] = false;

	$('#dialog_user_first_name').off('keyup');
	$('#dialog_user_last_name').off('keyup');
	$('#dialog_user_company').off('change');

	$('#dialog_user_first_name').val('');
	$('#dialog_user_last_name').val('');
	$('#dialog_user_company').val('');

	$('#dialog_user_first_name').prop('disabled', false);
	$('#dialog_user_last_name').prop('disabled', false);
	$('#dialog_user_company').prop('disabled', false);

	$('#dialog_user_location_id').val('');
	$('#dialog_user_location_id').off('keyup');
	$('#dialog_user_asso_items').val('');
	$('#dialog_user_asso_items').addClass('invisible');

	checkDialogUserInput();
}