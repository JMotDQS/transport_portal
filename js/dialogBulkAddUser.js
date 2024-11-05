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

function sendBulkAddUserData() {
	console.log('sendBulkAddUserData() called');
	feedBackColoring('#upload-feedback');
	const apiEndpoint = 'https://identity-api-stg.dqstaff.com/Transport/UploadTransportUsersFile';
	const csvFile = document.getElementById('dialog_bullk_add_user_file').files[0];
	const companyCode = document.getElementById('dialog_bulk_add_user_company').value;
	const formData = new FormData();
	formData.set('file', csvFile, csvFile.name);
	formData.set('companyCode', companyCode);

	temp_html = '';
	temp_html = `<progress></progress>`;
	$('#upload-progress').html(temp_html);
	feedBackColoring('#upload-feedback', 'blue');
	$('#upload-feedback').html('Uploading FIle...');

	fetch(apiEndpoint, {
		method: 'POST',
		headers: {
			'Content-Type': 'multipart/form-data',
			'SessionKey': 'E3DDA602-C414-41B7-9E4B-73A4EDD896A3',
			'ApplicationId': '33E591F9-F7C1-4EC3-8B5A-D48FEEDFA9FA'
		},
		body: formData
	})
	.then(response => response.json())
	.then(data => {
		console.log(data);
		alert('File uploaded successfully!');
		$('#upload-progress').html('');
		feedBackColoring('#upload-feedback', 'green');
		$('#upload-feedback').html('File uploaded successfully!');
	})
	.catch(error => {
		console.error(error);
		alert('Error uploading file');
		$('#upload-progress').html('');
		feedBackColoring('#upload-feedback', 'red');
		$('#upload-feedback').html('Error uploading file');
	});
}