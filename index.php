<!doctype html>

<html>
	<head>
		<meta charset="utf-8"/>	
		<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, shrink-to-fit=no">
		<meta http-equiv="X-UA-Compatible" content="IE=11" />

		<title>Transportation Portal</title>

	<!-- Custom CSS -->
		<link rel="stylesheet" href="css/custom.css">
		<link rel="stylesheet" href="css/navbar.css">
		<link rel="stylesheet" href="css/dialog.css">
		<link rel="stylesheet" href="css/dialogUser.css">
		<link rel="stylesheet" href="css/dialogLogin.css">
		<link rel="stylesheet" href="css/dialogUpdatePassword.css">
		<link rel="stylesheet" href="css/dialogBulkAddUser.css">

	</head>

	<body id="home">
		<header>
			<img id="logo-header" class="nav-logo" src="images/DQS_logo.svg">

			<nav id="nav"></nav>
		</header>
		
		<div id="app"></div>
		<div id="search-results" class="search-results"></div>

		<dialog id="dialog_user" class="g_dialog dialog_user"></dialog>
		<dialog id="dialog_login" class="g_dialog dialog_login"></dialog>
		<dialog id="dialog_add_admin" class="g_dialog dialog_add_admin"></dialog>
		<dialog id="dialog_bulk_add_user" class="g_dialog dialog_bulk_add_user"></dialog>

	<!-- JQuery CDN -->
		<script src="https://code.jquery.com/jquery-3.5.1.min.js" integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=" crossorigin="anonymous"></script>

	<!-- Latest compiled Font Awesome JavaScript -->
		<script defer src="https://use.fontawesome.com/releases/v5.0.13/js/all.js" integrity="sha384-xymdQtn1n3lH2wcu0qhcdaOpQwyoarkgLVxC/wZ5q7h9gHtxICrpcaSUfygqZGOe" crossorigin="anonymous"></script>

	<!-- Custom JavaScript -->
		<script src="js/variables.js"></script>
		<script src="js/index.js"></script>
		<script src="js/custom.js"></script>
		<script src="js/promises.js"></script>
		<script src="js/users.js"></script>
		<script src="js/itemAssociation.js"></script>
		<script src="js/reports.js"></script>
		<script src="js/dialogUser.js"></script>
		<script src="js/dialogLogin.js"></script>
		<script src="js/dialogAddAdmin.js"></script>
		<script src="js/dialogUpdatePassword.js"></script>
		<script src="js/dialogBulkAddUser.js"></script>
	</body>
</html>