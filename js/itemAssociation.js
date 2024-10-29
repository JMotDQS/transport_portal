function validateLocation(param_ele, param_page) {
	console.log("validateLocation called");
    g_NEW_LOCATION = dataCleanUp($('#dialog_user_location_id').val());
    if(g_NEW_LOCATION.slice(0, 2) == 'MB' && g_NEW_LOCATION.length == g_MAILBOX_LENGTH) {
        feedBackColoring('#' + param_ele + '_feedback', 'green');
		$('#' + param_ele + '_feedback').html('Valid Mailbox');

		setKeyEvents(param_page, 'dialog_user_asso_items');
		$('#dialog_user_asso_items').removeClass('invisible');
		$('#dialog_user_asso_items').focus();
    } else {
        feedBackColoring('#' + param_ele + '_feedback', 'blue');
		$('#' + param_ele + '_feedback').html('Checking Badge Id...');

		validateLocationPromise('validate_badge', g_NEW_LOCATION).then(
			function(resolve) {
				console.log("Success.");

				if(resolve.length < 1) {
					feedBackColoring('#' + param_ele + '_feedback', 'red');
					$('#' + param_ele + '_feedback').html('Invalid Badge Id');
				} else {
					feedBackColoring('#' + param_ele + '_feedback', 'green');
					$('#' + param_ele + '_feedback').html('Valid Badge Id');

					setKeyEvents(param_page, 'dialog_user_asso_items');
					$('#dialog_user_asso_items').removeClass('invisible');
					$('#dialog_user_asso_items').focus();
				}
			}
		).catch(
			function(reject) {
				console.log("Fail");
			}
		).finally(
			function() {
				console.log("Moving On.");
			}
		)
    }
}

function recordAssociation() {
	toggleDisabled('dialog_user_asso_button', true);

	recordAssociationPromise('record_association').then(
		function(resolve) {
			console.log("Success.");
			closeDialogUser();
		}
	).catch(
		function(reject) {
			console.log("Fail");
		}
	).finally(
		function() {
			console.log("Moving On.");
		}
	)
}