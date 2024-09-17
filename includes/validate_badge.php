<?php
	include("config.php");

	$return_array = [];
    $serverName = $host."\\sqlexpress";

    $connectionInfo = array("Database"=>$db);
	$conn = sqlsrv_connect($serverName, $connectionInfo);
	//if(mysqli_connect_error()) {//Use for PHP versions prior to 5.3
	if ($conn) {// Use for PHP versions 5.3+
		$sql = "SELECT tu.pk_id, tu.badge_id, tu.first_name, tu.last_name, tc.company_name, tc.abb_name
						FROM transport_users AS tu
							INNER JOIN transport_companies AS tc ON tc.pk_id = tu.fk_company_pk_id
						WHERE tu.badge_id = '".$_POST['badge_id']."'";
		$res = sqlsrv_query($conn, $sql);
		if (sqlsrv_has_rows($res)) {
			while ($row = sqlsrv_fetch_array($res, SQLSRV_FETCH_ASSOC)) {
				array_push($return_array, $row);
			}
		}
	} else {
		die("Connect Error (".mysqli_connect_errno().") ".mysqli_connect_error());
	}

	$close_success = sqlsrv_close($conn);
	if($close_success) {
		echo json_encode($return_array);
	}
?>