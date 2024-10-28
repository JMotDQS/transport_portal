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
		<link rel="stylesheet" href="css/modal.css">

	</head>

	<body id="home">
		<header>
			<img id="logo-header" class="nav-logo" src="images/DQS_logo.svg" data-page='kms'>

			<nav id="nav"></nav>
		</header>
		
		<div id="app"></div>
		<div class="search-results"></div>

		<!-- <dialog id="modal" class="g_dialog"></dialog> -->
		<dialog  id="dialog" class="g_dialog">
		<header class="dialog-header">
			<div id="title">
				<h3>Add User</h3>
				<p>all fields required</p>
			</div>
			<div class="dialog-save invisible" onclick="addUser()">
				<i class="far fa-save"></i>
			</div>
			<div class="dialog-close" onclick="closeModal()">
				<i class="far fa-window-close"></i>
			</div>
		</header>
		<div class="dialog-grid">
			<div class="dialog-form-element">
				<!--<label for="first_name">First Name:</label>-->
				<input type="text" id="first_name" name="first_name" placeholder="First Name">
			</div>
			<div class="dialog-form-element">
				<!--<label for="last_name">Last Name:</label>-->
				<input type="text" id="last_name" name="last_name" placeholder="Last Name">
			</div>
			<div class="dialog-form-element">
				<!--<label for="role" style="display:block;">Role:</label>-->
				<select name="role" id="role">
					<option selected="true" disabled="disabled" value="">Please Choose Role</option>	
					<option value="Security Guard">Security Guard</option>
					<option value="Security Supervisor">Security Supervisor</option>
					<option value="Admin" disabled="disabled">Admin</option>
					<option value="Driveaway">Driveaway</option>
				</select>
			</div>
		</div>
	</dialog>

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
		<script src="js/modal.js"></script>
	</body>
</html>