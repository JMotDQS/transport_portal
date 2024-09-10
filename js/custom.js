function keyPressEvent(e) {
	e.preventDefault;
	clearTimer(g_TIMER); // prevent errant multiple timeouts from being generated

	switch(e.data.page) {
		case 'kmsAudit':
			feedBackColoring('#vin-scan-feedback', 'blue');
			$('#vin-audit-feedback').html('Adding VIN to audit, please wait...');
			break;

		case 'vinCheckIn':
			feedBackColoring('#vin-scan-feedback', 'blue');
			$('#vin-scan-feedback').html('Loading VIN scan, please wait...');
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

		case 'keyCheckOut':
			switch(e.data.inputEl) {
				case 'badgeNumCheckout':
					break;

				case 'binNumCheckout':
					break;

				case 'vinNumCheckout':
					break;
			}
			break;

		case 'receiving':
			feedBackColoring('#ml-scan-feedback', 'blue');
			$('#ml-scan-feedback').html('Loading Master Label, please wait...');
			break;
	}
}
function keyUpEvent(e) {
	e.preventDefault;
	clearTimer(g_TIMER); // prevent errant multiple timeouts from being generated

	switch(e.data.page) {
		case 'kmsAudit':
			g_TIMER = window.setTimeout(() => {
				toggleDisabled('#' + e.currentTarget.id, true);
		
				var result = cleanVIN($('#' + e.currentTarget.id).val());
				if(!result) {
					feedBackColoring('#vin-audit-feedback', 'red');
					$('#vin-audit-feedback').html($('#' + e.currentTarget.id).val() + `&nbsp;is not a valid VIN. Please try again.`);
					clearVINScan(e.currentTarget.id);
				} else {
					clearVINScan(e.currentTarget.id);
					startKMSAudit(result);
				}
			}, (g_TIMEOUT_VAL * parseInt(e.data.timerMultiplier)));
			break;

		case 'vinCheckIn':
			g_TIMER = window.setTimeout(() => {
				toggleDisabled('#' + e.currentTarget.id, true);
				feedBackColoring('#' + e.data.feedbackEl, 'blue');
				$('#' + e.data.feedbackEl).html('Scan data parsed!');

				var result = cleanVIN($('#' + e.currentTarget.id).val());
				if(!result) {
					feedBackColoring('#vin-scan-feedback', 'red');
					$('#vin-scan-feedback').html($('#' + e.currentTarget.id).val() + `&nbsp;is not a valid VIN. Please try again.`);

					clearVINScan(e.currentTarget.id);
				} else {
					createVINRecord(result);
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

		case 'keyCheckOut':
			switch(e.data.inputEl) {
				case 'badgeNumCheckout':
					g_TIMER = window.setTimeout(() => {
						toggleDisabled('#badgeNumCheckout', true);
						collectCheckoutBadgeScan();
					}, (g_TIMEOUT_VAL * parseInt(e.data.timerMultiplier)));
					break;

				case 'binNumCheckout':
					g_TIMER = window.setTimeout(() => {
						toggleDisabled('#binNumCheckout', true)
						collectCheckoutBinScan();
					}, (g_TIMEOUT_VAL * parseInt(e.data.timerMultiplier)));
					break;

				case 'vinNumCheckout':
					g_TIMER = window.setTimeout(() => {
						toggleDisabled('#vinNumCheckout', true)
						collectCheckoutVinScan();
					}, (g_TIMEOUT_VAL * parseInt(e.data.timerMultiplier)));
					break;
			}
			break;

		case 'receiving':
			g_TIMER = window.setTimeout(() => {
				$('#masterScan').prop('disabled', true);
		
				feedBackColoring('#display-master-code', 'green');
				feedBackColoring('#ml-scan-feedback', 'green');
				$('#ml-scan-feedback').html('Ready to submit Master Label');
				
				parseMasterLabelScan();
			}, (g_TIMEOUT_VAL * parseInt(e.data.timerMultiplier)));
			break;

	}
}

function trimVINExportResults() {
//function trimVINCheckOutResults() {
	return new Promise(function(resolve, reject) {
		for(i = 0; i < vinSortArray['res'].length; i++) {
			myTempArray.push(vinSortArray['res'][i]);
		}

		var tempObj = vinSortArray['res'].shift();
        trimResults.push(tempObj);
        while(vinSortArray['res'].length > 0) {

            if(trimResults.find(item => item.fk_vin_pk_id === vinSortArray['res'][0].fk_vin_pk_id)) {
                vinSortArray['res'].shift();
            } else {
                tempObj = vinSortArray['res'].shift();
                trimResults.push(tempObj);
            }
        }

		for(q = 0; q< trimResults.length; q++) {
			if(parseInt(trimResults[q].key_is_in) == 0) {
				trimResults.shift();
			}
		}

		resolve(true);
	});
}

function findAllOpenSlots() {
    findAllOpenSlotsPromise('available_slots').then(function(resolve) {
        consoleReporting("Success.");
		availSlotsArray = [];
        availSlotsArray = resolve;

		const tempNumCases = Object.keys(availSlotsArray).length;
		grpSortedUniqeAvalSlots = [];
		for (i = 1; i <= tempNumCases; i++) {
			var temp_case = '';
			if (i < 10) {
				temp_case = '00' + i.toString();
			} else if ( i < 100 && i > 9) {
				temp_case = '0' + i.toString();
			} else {
				temp_case = i.toString();
			}

			if (availSlotsArray[temp_case] != undefined) {
				grpSortedUniqeAvalSlots.push(availSlotsArray[temp_case]);
			}
		}
		
		var temp_length = grpSortedUniqeAvalSlots.length;
		var temp_html = ``;
		$('#avail-slots').html(temp_html);
		for (i = 0; i < temp_length; i++) {
			if (grpSortedUniqeAvalSlots[i].length > 0) {
				temp_html += `<div class="flex-item-gap">`;
					temp_html += `${grpSortedUniqeAvalSlots[i][0].case}`;
					temp_html += `<p class="case-slot-count `;
					if (grpSortedUniqeAvalSlots[i].length > 4) {
						temp_html += `over-4-slots">`;
					} else {
						temp_html += `under-5-slots">`;
					}
					temp_html += `(${grpSortedUniqeAvalSlots[i].length})</p>`;
				temp_html += `</div>`;
			}
		}

		$('#avail-slots').html(temp_html);

    }).catch(function(reject) {
        consoleReporting("Fail");
    }).finally(function() {
        consoleReporting("Moving On.");
	})
}
function slotSorting(a, b) {
	return parseInt(a.pk_id) - parseInt(b.pk_id);
}

function vinInventory() {
	window.open('includes/current_vin_slot_pairs.php', '_blank');
}