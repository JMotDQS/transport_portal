<?php
	include("config.php");

	$return_array = [];
	$serverName = $host."\\sqlexpress";

	$connectionInfo = array("Database"=>$db);
	$conn = sqlsrv_connect($serverName, $connectionInfo);
	//if(mysqli_connect_error()) {//Use for PHP versions prior to 5.3
	if ($conn) {// Use for PHP versions 5.3+
		$sql = "UPDATE transport_users ";
		if($_POST['field'] == 'Admin') {
			$sql .= "SET is_admin = ".$_POST['newValue'];
		} elseif($_POST['field'] == 'Active') {
			$sql .= "SET is_active = ".$_POST['newValue'];
		}
		$sql .= " WHERE pk_id = ".$_POST['indexId'];
		$res = sqlsrv_query($conn, $sql);
	} else {
		die("Connect Error (".mysqli_connect_errno().") ".mysqli_connect_error());
	}

	$close_success = sqlsrv_close($conn);
	if($close_success) {
		echo json_encode(true);
	}
?>