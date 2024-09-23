<?php

	require_once("config.php");

	$return_array = [];
	$tracking_array = [];
	$his_tracking_array = [];

	$trackingReport = 'asset_tracking.csv';
	$hisTrackingReport = 'historical_asset_tracking.csv';
    $fp = fopen('php://output', 'w');
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
			$fp = fopen('../../'.$trackingReport, 'w');
			while ($row = sqlsrv_fetch_array($res, SQLSRV_FETCH_ASSOC)) {
				array_push($tracking_array, $row);
				if (!isset($headings)) {
					$headings = array_keys($row);
					fputcsv($fp, $headings, ',', '"');
				}
			}

			foreach ($tracking_array as $pair) {
				fputcsv($fp, $pair);
			}
			fclose($fp);
		}


		/*if (sqlsrv_has_rows($res)) {
			while ($row = sqlsrv_fetch_array($res, SQLSRV_FETCH_ASSOC)) {
				array_push($return_array, $row);
			}
		}*/
	}

	/*$close_success = sqlsrv_close($conn);
	if ($close_success) {
		echo json_encode($return_array);
	}*/

?>