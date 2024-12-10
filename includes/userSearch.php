<?php

	require_once("config.php");

	$return_array = [];

	$serverName = "";
	$connectionInfo = array();
	if ($connType == "SQLServer")
	{
		$serverName = $host;
		$connectionInfo = array("UID"=>$user, "PWD"=>$pass, "Database"=>$db);
	}
	else
	{
		$serverName = $host."\\sqlexpress";
		$connectionInfo = array("Database"=>$db);
	}

	$conn = sqlsrv_connect($serverName, $connectionInfo);

	if ($conn) {
		$sql = "SELECT *
				FROM transport_users
				WHERE first_name LIKE '%".$_POST['searchString']."%'
					OR last_name LIKE '%".$_POST['searchString']."%'
					OR badge LIKE '%".$_POST['searchString']."%'";
		echo json_encode($sql);
		die();
		
		$res = sqlsrv_query($conn, $sql);
		if (sqlsrv_has_rows($res)) {
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