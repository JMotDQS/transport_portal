let fileChosen = false;
let companyChosen = false;

function setdialogBulkAddUserEventListenerAssociations() {
	document.getElementById('dialog_bullk_add_user_file').addEventListener('change', () => {
		const file = document.getElementById('dialog_bullk_add_user_file').files[0];
		if(file && file.type === 'text/csv') {
			fileChosen = true;
		} else {
			fileChosen = false;
			document.getElementById('dialog_bullk_add_user_file').value = '';
		}

		setDialogBulkAddUserButton();
	});

	document.getElementById('dialog_bulk_add_user_company').addEventListener('change', () => {
		const company = document.getElementById('dialog_bulk_add_user_company').value;
		if(parseInt(company.length) > 0) {
			companyChosen = true;
		} else {
			fileChosen = false;
		}

		setDialogBulkAddUserButton();
	});
}

function setDialogBulkAddUserButton() {
	const myButton = document.getElementById('dialog-bulk-add-user-button');
	if(fileChosen && companyChosen) {
		myButton.disabled = false;
		myButton.classList.remove('button-disabled');
	} else {
		myButton.disabled = true;
		myButton.classList.add('button-disabled');
	}
}