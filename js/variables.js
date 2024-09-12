/***** Global Use Variables */
const myModal = document.querySelector('.g_dialog');

var g_TIMER;
var g_KEY_RESET_TIMER;
var g_USER_SEARCH = [];
const g_TIMEOUT_VAL = 500;
const g_RESET_TIMEOUT_VAL = 2000;
const g_APP = 'app';
const g_NAV = 'nav';
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