<?php

	require_once("config.php");

	$return_array = [];
	$serverName = $host."\\sqlexpress";

	// Since UID and PWD are not specified in the $connectionInfo array,
	// The connection will be attempted using Windows Authentication.
	$connectionInfo = array("Database"=>$db);
	$conn = sqlsrv_connect($serverName, $connectionInfo);

	if ($conn) {
		$sql = "SELECT at.pk_id, at.created_date, at.updated_date, at.asset_id,
					tu.first_name, tu.last_name, tc.company_name,
					at.cur_location AS current_location, at.prev_location AS previous_location
				FROM asset_tracking AS at
					INNER JOIN transport_users AS tu ON tu.badge_id = at.asset_id
					INNER JOIN transport_companies AS tc ON tc.pk_id = tu.fk_company_pk_id
				WHERE at.cur_location LIKE 'MB%'
				ORDER BY at.cur_location";
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