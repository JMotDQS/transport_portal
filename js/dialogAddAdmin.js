function validateEmail(param_user_id) {
	let enteredEmail = document.getElementById('add-admin_email').value;
	let indexOfAt = enteredEmail.indexOf('@');
	let indexOfDot = enteredEmail.indexOf('.');
	let atPass = false;
	let dotPass = false;

	if(indexOfAt > 0 && indexOfAt < indexOfDot) {
		atPass = true;
	}
	if(indexOfDot > indexOfAt && indexOfDot < (enteredEmail.length - 1)) {
		dotPass = true;
	}

	if(atPass && dotPass) {
		document.getElementById('dialog-add-admin-error').textContent = '';
		document.getElementById('dialog-add-admin-error').classList.remove('dialog-error-show');

		sliderUpdateRecord('sliderUpdateUser', param_user_id, 'Admin', 1, enteredEmail, DEFAULT_PASSWORD);
	} else {
		document.getElementById('dialog-add-admin-error').textContent = 'Please enter a valid email';
		feedBackColoring(document.getElementById('dialog-add-admin-error'), 'red');
		document.getElementById('dialog-add-admin-error').classList.add('dialog-error-show');
	}
}

function sliderUpdateRecord(param_file, temp_id, temp_field, temp_value, param_email = 'null', param_pw = 'null') {
	sliderUpdateRecordPromise(param_file, temp_id, temp_field, temp_value, param_email, param_pw).then(function(resolve) {
		userSearch(CLICK_EVENT);
		ADD_ADMIN_DIALOG.close();
	}).catch(function(reject) {
		//console.log("Search Loaded!");
	}).finally(function() {
		//console.log("Fresh Search.");
	});
}