<!doctype html>

<html>
	<head>
		<meta charset="utf-8"/>	
		<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, shrink-to-fit=no">
		<meta http-equiv="X-UA-Compatible" content="IE=11" />

		<title>KMS</title>

	<!-- Custom CSS -->
		<link rel="stylesheet" href="css/custom.css">
		<link rel="stylesheet" href="css/navbar.css">
		<link rel="stylesheet" href="css/modal.css">
		<!-- <link rel="stylesheet" href="css/loading-animation.css">
		<link rel="stylesheet" href="css/pagination.css"> -->

	</head>

	<body id="home">
		<header>
			<img id="logo-header" class="nav-logo" src="images/DQS_logo.svg" data-page='kms'>

			<nav id="nav"></nav>
		</header>
		
		<div id="app"></div>
		<div class="search-results"></div>

		<dialog id="g_dialog" class="g_dialog">
			<header class="modal-header">
				<div id="title">
					<h3>Add User</h3>
					<!-- <p>all fields required</p> -->
				</div>
				<div class="modal-save invisible" onclick="addUser()">
					<i class="far fa-save"></i>
				</div>
				<div class="modal-close" onclick="closeModal()">
					<i class="far fa-window-close"></i>
				</div>
			</header>
			<div class="modal-grid">
				<p class="fullwidth">all fields required</p>
				<div class="modal-form-element">
					<!--<label for="first_name">First Name:</label>-->
					<input type="text" id="first_name" name="first_name" placeholder="First Name">
				</div>
				<div class="modal-form-element">
					<!--<label for="last_name">Last Name:</label>-->
					<input type="text" id="last_name" name="last_name" placeholder="Last Name">
				</div>
				<div class="modal-form-element">
					<!--<label for="role" style="display:block;">Role:</label>-->
					<select name="company" id="company"></select>
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
		<script src="js/modal.js"></script>
		<!-- <script src="js/vinCheckIn.js"></script>
		<script src="js/keyCheckIn.js"></script>
		<script src="js/keyCheckOut.js"></script>
		<script src="js/search.js"></script>
		<script src="js/kmsAudit.js"></script>
		<script src="js/dashboard.js"></script> -->
	</body>
</html>