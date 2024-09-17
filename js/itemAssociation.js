function validateLocation(param_ele, param_page) {
    var temp_location = dataCleanUp($('#modal_location_id').val());
    if(temp_location.slice(0, 2) == 'MB' && temp_location.length == g_MAILBOX_LENGTH) {
        feedBackColoring('#' + param_ele + '_feedback', 'green');
		$('#' + param_ele + '_feedback').html('Valid Mailbox');

		setKeyEvents(param_page, 'modal_asso_items');
		$('#modal_asso_items').removeClass('invisible');
		$('#modal_asso_items').focus();
    } else {
        feedBackColoring('#' + param_ele + '_feedback', 'blue');
		$('#' + param_ele + '_feedback').html('Checking Badge Id...');

		validateLocationPromise('validate_badge', temp_location).then(
			function(resolve) {
				console.log("Success.");

				if(resolve.length < 1) {
					feedBackColoring('#' + param_ele + '_feedback', 'red');
					$('#' + param_ele + '_feedback').html('Invalid Badge Id');
				} else {
					feedBackColoring('#' + param_ele + '_feedback', 'green');
					$('#' + param_ele + '_feedback').html('Valid Badge Id');

					setKeyEvents(param_page, 'modal_asso_items');
					$('#modal_asso_items').removeClass('invisible');
					$('#modal_asso_items').focus();
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
	console.log("g_ASSOCIATE_ITEMS:", g_ASSOCIATE_ITEMS);

	recordAssociationPromise('record_association', param_string).then(
		function(resolve) {
			console.log("Success.");

			if(resolve.length < 1) {
				feedBackColoring('#' + param_ele + '_feedback', 'red');
				$('#' + param_ele + '_feedback').html('Invalid Badge Id');
			} else {
				feedBackColoring('#' + param_ele + '_feedback', 'green');
				$('#' + param_ele + '_feedback').html('Valid Badge Id');

				setKeyEvents(param_page, 'modal_asso_items');
				$('#modal_asso_items').removeClass('invisible');
				$('#modal_asso_items').focus();
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