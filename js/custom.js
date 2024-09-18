function keyPressEvent(e) {
	e.preventDefault;
	clearTimer(g_TIMER); // prevent errant multiple timeouts from being generated

	switch(e.data.page) {
		case 'itemAssociation':
			break;
	}
}
function keyUpEvent(e) {
	e.preventDefault;
	clearTimer(g_TIMER); // prevent errant multiple timeouts from being generated

	switch(e.data.page) {
		case 'itemAssociation':
			switch(e.data.inputEl) {
				case 'modal_location_id':
					g_TIMER = window.setTimeout(() => {
						toggleDisabled('#' + e.currentTarget.id, true);
						validateLocation(e.data.inputEl, e.data.page);
					}, (g_TIMEOUT_VAL * parseInt(e.data.timerMultiplier)));
					break;

				case 'modal_asso_items':
					g_TIMER = window.setTimeout(() => {
						g_ASSOCIATE_ITEMS = $('#' + e.data.inputEl).val();
						g_ASSOCIATE_ITEMS += ',';
						$('#' + e.data.inputEl).val(g_ASSOCIATE_ITEMS);
						$('#modal_asso_button').removeClass('invisible');
						toggleDisabled('modal_asso_button', false);
					}, (g_TIMEOUT_VAL * parseInt(e.data.timerMultiplier)));
					break;
			}
			break;
	}
}