var flag_array = [];
var new_user_array = [];

function openModal(param_search_string) {
	//resetModalForm()

    var temp_title = `<h3>${param_search_string}</h3><h2>Add User</h2><p>all fields required</p>`;
    $('#title').html(temp_title);

	$('#first_name').keyup( () => {
		if ($('#first_name').val().length > 0) {
			flag_array['first'] = true;
		} else {
			flag_array['first'] = false;
		}

		//checkInput();
	});

	$('#last_name').keyup( () => {
		if ($('#last_name').val().length > 0) {
			flag_array['last'] = true;
		} else {
			flag_array['last'] = false;
		}

		//checkInput();
	});

	$('#role').change( () => {
		if ($('#role').val() == null) {
			flag_array['role'] = false;
		} else {
			flag_array['role'] = true;
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
	//myModal.close();
	$('#first_name').prop('disabled', true);
	$('#last_name').prop('disabled', true);
	$('#role').prop('disabled', true);

	addUserPromise().then(function(resolve) {
		var temp_html = ``;
		temp_html += `<p>First Name:&nbsp;${new_user_array[0]['first_name']}</p>`;
		temp_html += `<p>Last Name:&nbsp;${new_user_array[0]['last_name']}</p>`;
		temp_html += `<p>Badge ID:&nbsp;${new_user_array[0]['badge']}</p>`;
		$('app').html(temp_html);
		closeModal()
	}).catch(function(reject) {
		//console.log("Search Loaded!");
	}).finally(function() {
		//console.log("Fresh Search.");
	});
}

function checkInput() {
	$('.modal-save').addClass('invisible');

	if(flag_array['first'] && flag_array['last'] && flag_array['role']) {
		$('.modal-save').removeClass('invisible');
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

function resetModalForm() {
	flag_array['first'] = false;
	flag_array['last'] = false;
	flag_array['role'] = false;

	$('#first_name').off('keyup');
	$('#last_name').off('keyup');
	$('#role').off('change');

	$('#first_name').val('');
	$('#last_name').val('');
	$('#role').val('');

	$('#first_name').prop('disabled', false);
	$('#last_name').prop('disabled', false);
	$('#role').prop('disabled', false);

	checkInput();
}