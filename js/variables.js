/***** Global Use Variables */
const USER_DIALOG = document.querySelector('.dialog_user');
const LOGIN_DIALOG = document.querySelector('.dialog_login');
const ADD_ADMIN_DIALOG = document.querySelector('.dialog_add_admin');
const BULK_ADD_USER_DIALOG = document.querySelector('.dialog_bulk_add_user');
const PREVENT_LOGIN_CLOSE = true;
const DEFAULT_PASSWORD = 'P@ssw0rd';

function disableEscapeKeyDialogBehavior(event) {
	if(event.key === 'Escape' && PREVENT_LOGIN_CLOSE) {
		event.preventDefault();
	}
}
LOGIN_DIALOG.addEventListener('keydown', disableEscapeKeyDialogBehavior);
ADD_ADMIN_DIALOG.addEventListener('keydown', disableEscapeKeyDialogBehavior);
const CLICK_EVENT = new CustomEvent('click');

var g_TIMER;
var g_KEY_RESET_TIMER;
var g_CURRENT_LOGIN_USER_ID = 0;
var g_USER_SEARCH = [];
var g_NO_SEARCH_RESULTS = '';
var g_COMPANIES = [];
var g_NEW_LOCATION = '';
var g_ASSOCIATE_ITEMS = '';
const g_MAILBOX_LENGTH = 8;
const g_TIMEOUT_VAL = 500;
const g_RESET_TIMEOUT_VAL = 2000;
const g_APP = 'app';
const g_NAV = 'nav';
const g_DIALOG = 'dialog';
const g_VER = '2.2'; // Physical Audit export now includes system report without duplicate VINs

/***** Special Character Replacement Arrays Global Variables */
const g_SEARCH_ENTITIES = ["Ø", "°",
						"\"", "\'",
						"©", "®", "™",
						"à", "á", "À", "Á",
						"è", "é", "È", "É"];
const g_REPLACE_ENTITIES = ["&Oslash;", "&deg;",
						"&quot;", "&apos;",
						"&copy;", "&reg;", "&trade;",
						"&agrave;", "&aacute;", "&Agrave;", "&Aacute;",
						"&egrave;", "&eacute;", "&Egrave;", "&Eacute;"];