<?php

	require_once("config.php");

	$return_array = [];
	$serverName = $host."\\sqlexpress";

	// Since UID and PWD are not specified in the $connectionInfo array,
	// The connection will be attempted using Windows Authentication.
	$connectionInfo = array("Database"=>$db);
	$conn = sqlsrv_connect($serverName, $connectionInfo);

	if ($conn) {
		$sql = "UPDATE transport_users
				SET password = '".$_POST['newPW']."', change_password = 0
				OUTPUT INSERTED.change_password
				WHERE pk_id = ".(int) $_POST['userId'];
		$res = sqlsrv_query($conn, $sql);
		
		if ($res) {
			while ($row = sqlsrv_fetch_array($res, SQLSRV_FETCH_ASSOC)) {
				array_push($return_array, $row);
			}
		}
	}

	$close_success = sqlsrv_close($conn);
	if ($close_success) {
		echo json_encode($return_array);
	}

?>