function keyPressEvent(e) {
	console.log("keyPressEvent() called");
	e.preventDefault;
	clearTimer(g_TIMER); // prevent errant multiple timeouts from being generated

	switch(e.data.page) {
		case 'itemAssociation':
			console.log("Key Pressed");
			break;
	}
}
function keyUpEvent(e) {
	console.log("keyUpEvent() called");
	e.preventDefault;
	clearTimer(g_TIMER); // prevent errant multiple timeouts from being generated

	switch(e.data.page) {
		case 'itemAssociation':
			switch(e.data.inputEl) {
				case 'modal_location_id':
					g_TIMER = window.setTimeout(() => {
						toggleDisabled('#' + e.currentTarget.id, true);
						validateLocation(e.data.inputEl);
					}, (g_TIMEOUT_VAL * parseInt(e.data.timerMultiplier)));
					break;

				case 'modal_asso_items':
					g_TIMER = window.setTimeout(() => {
						$('#' + e.data.inputEl).val( $('#' + e.data.inputEl).val() + ',' );
					}, (g_TIMEOUT_VAL * parseInt(e.data.timerMultiplier)));
					break;
			}
			break;
	}
}