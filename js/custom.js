function keyPressEvent(e) {
	e.preventDefault;
	clearTimer(g_TIMER); // prevent errant multiple timeouts from being generated

	switch(e.data.page) {
		case 'kmsAudit':
			feedBackColoring('#vin-scan-feedback', 'blue');
			$('#vin-audit-feedback').html('Adding VIN to audit, please wait...');
			break;
		
		case 'keyCheckIn':
			switch(e.data.inputEl) {
				case 'vinNum':
					feedBackColoring('#vin-scan-feedback', 'blue');
					$('#vin-scan-feedback').html('Loading VIN scan, please wait...');
					break;

				case 'bayNum':
					break;

				case 'binNum':
					feedBackColoring('#bin-scan-feedback', 'blue');
					$('#bin-scan-feedback').html('Loading bin scan, please wait...');
					break;

				case 'badgeNum':
					feedBackColoring('#badge-scan-feedback', 'blue');
					$('#badge-scan-feedback').html('Loading badge number, please wait...');
					break;
			}
			break;
	}
}
function keyUpEvent(e) {
	e.preventDefault;
	clearTimer(g_TIMER); // prevent errant multiple timeouts from being generated

	switch(e.data.page) {
		case 'vinCheckIn':
			g_TIMER = window.setTimeout(() => {
				toggleDisabled('#' + e.currentTarget.id, true);
				feedBackColoring('#' + e.data.feedbackEl, 'blue');
				$('#' + e.data.feedbackEl).html('Scan data parsed!');

				var result = cleanVIN($('#' + e.currentTarget.id).val());
				if(!result) {
					feedBackColoring('#vin-scan-feedback', 'red');
					$('#vin-scan-feedback').html($('#' + e.currentTarget.id).val() + `&nbsp;is not a valid VIN. Please try again.`);

					//clearVINScan(e.currentTarget.id);
				} else {
					//createVINRecord(result);
				}
			}, (g_TIMEOUT_VAL * parseInt(e.data.timerMultiplier)));
			break;
		
		case 'keyCheckIn':
			switch(e.data.inputEl) {
				case 'vinNum':
					toggleDisabled('.button-container #clear-button', false);
					g_TIMER = window.setTimeout(() => {
						toggleDisabled('#vinNum', true);
						collectVINScan();
					}, (g_TIMEOUT_VAL * parseInt(e.data.timerMultiplier)));
					break;

				case 'bayNum':
					g_TIMER = window.setTimeout(() => {
						toggleDisabled('#bayNum', true);
						bayLoc = $('#bayNum').val().toUpperCase();
						setBinMode();
					}, (g_TIMEOUT_VAL * parseInt(e.data.timerMultiplier)));	
					break;

				case 'binNum':
					g_TIMER = window.setTimeout(() => {
						toggleDisabled('#binNum', true);
						collectBinScan();
					}, (g_TIMEOUT_VAL * parseInt(e.data.timerMultiplier)));
					break;

				case 'badgeNum':
					g_TIMER = window.setTimeout(() => {
						toggleDisabled('#badgeNum', true);
						feedBackColoring('#badge-scan-feedback', 'blue');
						collectBadgeScan();
					}, (g_TIMEOUT_VAL * parseInt(e.data.timerMultiplier)));
					break;
			}
			break;

	}
}