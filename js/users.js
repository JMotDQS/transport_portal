function clearUserSearch() {
    $('#nav-search-field').val('');
    $('.search-results').html('');
	$('#app').html('');
}

function userSearch(e) {
	e.preventDefault;
	var temp_html = '';

	/*** If search is done with blank search field ***/
	if($('#nav-search-field').val() == '') {
		temp_html = `Please enter a name to search for.`;
		$('.search-results').html(temp_html);
		$('#app').removeClass('app-feedback');
		$('#app').html('');
	} else {
		temp_html = `<progress></progress>`;
		$('.search-results').html(temp_html);
		$('#app').addClass('app-feedback');
		$('#app').html('Searching...');

		userSearchPromise('userSearch', dataCleanUp($('#nav-search-field').val())).then(function(resolve) {
			temp_html = '';
			
			/*** If search result is empty ***/
			if(g_USER_SEARCH.length == 0) {
				g_NO_SEARCH_RESULTS = '';
				g_NO_SEARCH_RESULTS = 'No results found for <b><i>'+ $('#nav-search-field').val() + '</i></b>';
				$('.search-results').html('');
				$('#app').removeClass('app-feedback');
				$('#app').html('');
				loadDialog('addUser', g_DIALOG, 'dialog_user');

				return false;
			} else {
				temp_html = '';
				var user_inactive;
				for(i = 0; i < g_USER_SEARCH.length; i++) {
					user_active = true;
					if(parseInt(g_USER_SEARCH[i]['is_active']) == 0) {
						user_active = false;
					}

					temp_html += `<div class="card" data-id='${g_USER_SEARCH[i]['pk_id']}'>`;
						temp_html += `<div class="card-grid card-titles">`;
								temp_html += `<div>Last, First Name</div>`;
								temp_html += `<div>Badge</div>`;
								temp_html += `<div>Email</div>`;
								temp_html += `<div class="active-label" id="active-label_isAdmin_${g_USER_SEARCH[i]['pk_id']}">Not Admin</div>`;
								temp_html += `<div class="active-label" id="active-label_isActive_${g_USER_SEARCH[i]['pk_id']}">Not Active</div>`;
								temp_html += `<div>Print QR</div>`;
						temp_html += `</div>`;

						temp_html += `<div class="card-grid card-data`;
						if(!user_active) {
							temp_html += ` user-inactive`;
						}
						temp_html += `">`;
							temp_html += `<div>${g_USER_SEARCH[i]['last_name']}, ${g_USER_SEARCH[i]['first_name']}</div>`;

							if(g_USER_SEARCH[i]['badge_id'] == '' || g_USER_SEARCH[i]['badge_id'] == null) {
								g_USER_SEARCH[i]['badge_id'] = null;
								temp_html += `<div class="dialog-create" id="new-badge-id_${g_USER_SEARCH[i]['pk_id']}" onclick="generateNewBadge(this)">`;
									temp_html += `<i class="fas fa-plus-square"></i>`;
								temp_html += `</div>`;
							} else {
								temp_html += `<div>${g_USER_SEARCH[i]['badge_id']}</div>`;
							}

							temp_html += `<div>${g_USER_SEARCH[i]['email_address']}</div>`;

							temp_html += `<div>`;
								temp_html += `<label class="switch">`;
									temp_html += `<input type="checkbox" id="isAdmin_${g_USER_SEARCH[i]['pk_id']}" name="isAdmin_${g_USER_SEARCH[i]['pk_id']}" onClick="sliderClicked(this.id, 'Admin')">`;
									temp_html += `<span id="isAdmin_span_${g_USER_SEARCH[i]['pk_id']}" class="slider round"></span>`;
								temp_html += `</label>`;
							temp_html += `</div>`;

							temp_html += `<div>`;
								temp_html += `<label class="switch">`;
									temp_html += `<input type="checkbox" id="isActive_${g_USER_SEARCH[i]['pk_id']}" name="isActive_${g_USER_SEARCH[i]['pk_id']}" onClick="sliderClicked(this.id, 'Active')">`;
									temp_html += `<span id="isActive_span_${g_USER_SEARCH[i]['pk_id']}" class="slider round"></span>`;
								temp_html += `</label>`;
							temp_html += `</div>`;

							if(!user_active) {
								temp_html += `<div>User Inactive</div>`;
							} else {
								temp_html += `<div class="dialog-print" id="user-print_${g_USER_SEARCH[i]['pk_id']}" data-index="${i}" onclick="printUser(this)">`;
									temp_html += `<i class="fas fa-print"></i>`;
								temp_html += `</div>`;
							}

						temp_html += `</div>`;
					temp_html += `</div>`;
				}

				$('#app').addClass('app-feedback');
				$('#app').html(g_USER_SEARCH.length + ' results found.');
			}
			$('.search-results').html(temp_html);

			for(i = 0; i <  g_USER_SEARCH.length; i++) {
				if(parseInt(g_USER_SEARCH[i]['is_admin']) === 1) {
					$('#isAdmin_' + g_USER_SEARCH[i]['pk_id']).prop( "checked", true );
				} else {
					$('#isAdmin_' + g_USER_SEARCH[i]['pk_id']).prop( "checked", false );
				}
				if(parseInt(g_USER_SEARCH[i]['pk_id']) === g_CURRENT_LOGIN_USER_ID) {
					toggleDisabled('#isAdmin_' + g_USER_SEARCH[i]['pk_id'], true);
					document.getElementById('isAdmin_span_' + g_USER_SEARCH[i]['pk_id']).classList.add('no-pointer');
				} else {
					document.getElementById('isAdmin_span_' + g_USER_SEARCH[i]['pk_id']).classList.remove('no-pointer');
				}

				if(parseInt(g_USER_SEARCH[i]['is_active']) === 1) {
					$('#isActive_' + g_USER_SEARCH[i]['pk_id']).prop( "checked", true );
				} else {
					$('#isActive_' + g_USER_SEARCH[i]['pk_id']).prop( "checked", false );
				}
				if(parseInt(g_USER_SEARCH[i]['pk_id']) === g_CURRENT_LOGIN_USER_ID) {
					toggleDisabled('#isActive_' + g_USER_SEARCH[i]['pk_id'], true);
					document.getElementById('isActive_span_' + g_USER_SEARCH[i]['pk_id']).classList.add('no-pointer');
				} else {
					document.getElementById('isActive_span_' + g_USER_SEARCH[i]['pk_id']).classList.remove('no-pointer');
				}
	
				sliderSet('isAdmin_' + g_USER_SEARCH[i]['pk_id'], 'Admin');
				sliderSet('isActive_' + g_USER_SEARCH[i]['pk_id'], 'Active');
			}

		}).catch(function(reject) {
			console.log("Fail");
		}).finally(function() {
			console.log("Moving On.");
		})
	}

	return false;
}

function printUser(param_obj) {
    console.log("param_obj:", param_obj);
    console.log("param_obj.id:", param_obj.id);
    var temp_array = param_obj.id.split('_');
    var selected_user_id = parseInt(temp_array[(temp_array.length - 1)]);
    console.log("selected_user_id:", selected_user_id);

    var print_firstName = g_USER_SEARCH[parseInt($('#' + param_obj.id).data('index'))]['first_name'];
    var print_lastName = g_USER_SEARCH[parseInt($('#' + param_obj.id).data('index'))]['last_name'];
    var print_badgeId = g_USER_SEARCH[parseInt($('#' + param_obj.id).data('index'))]['badge_id'];
    console.log("first_name:", print_firstName);
    console.log("last_name:", print_lastName);
    console.log("badgeId:", print_badgeId);
}