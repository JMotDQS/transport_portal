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
	/**********
		All queries for asset_tracking table data
	**********/
		/**********
			Query to select all records in asset_tracking
			where current location is a mailbox
		**********/
		$sql = "SELECT at.pk_id,
					FORMAT(at.created_date, 'yyyy-mm-dd') AS created_date,
					FORMAT(at.created_date, 'hh:mm:ss') AS created_time,
					FORMAT(at.updated_date, 'yyyy-mm-dd') AS updated_date,
					FORMAT(at.updated_date, 'hh:mm:ss') AS updated_time,
					at.asset_id, tu.first_name, tu.last_name, tc.company_name,
					at.cur_location AS current_location, at.prev_location AS previous_location
				FROM asset_tracking AS at
					INNER JOIN transport_users AS tu ON tu.badge_id = at.asset_id
					INNER JOIN transport_companies AS tc ON tc.pk_id = tu.fk_company_pk_id
				WHERE at.cur_location LIKE 'MB%'
				ORDER BY at.cur_location";
		$res = sqlsrv_query($conn, $sql);
		if (sqlsrv_has_rows($res)) {
			// If there are records, open a new file
			$fp = fopen('../../'.$trackingReport, 'w');
			while ($row = sqlsrv_fetch_array($res, SQLSRV_FETCH_ASSOC)) {
				array_push($tracking_array, $row);
				if (!isset($headings)) {
					$headings = array_keys($row);
					fputcsv($fp, $headings, ',', '"');
				}
			}
		}

		/**********
			Query to select all records in asset_tracking
			where current location is NOT a mailbox
			(meaning a person has the asset)
		**********/
		$sql = "SELECT at.pk_id,
					FORMAT(at.created_date, 'yyyy-mm-dd') AS created_date,
					FORMAT(at.created_date, 'hh:mm:ss') AS created_time,
					FORMAT(at.updated_date, 'yyyy-mm-dd') AS updated_date,
					FORMAT(at.updated_date, 'hh:mm:ss') AS updated_time,
					at.asset_id, tu.first_name, tu.last_name, tc.company_name,
					at.cur_location AS current_location, at.prev_location AS previous_location
				FROM asset_tracking AS at
					INNER JOIN transport_users AS tu ON tu.badge_id = at.asset_id
					INNER JOIN transport_companies AS tc ON tc.pk_id = tu.fk_company_pk_id
				WHERE at.cur_location NOT LIKE 'MB%'
				ORDER BY at.cur_location";
		$res = sqlsrv_query($conn, $sql);
		if (sqlsrv_has_rows($res)) {
			/**********
				if there are records, check if a file has already been opened
				if not, open one
			**********/
			if(!fstat($fp)) {
				$fp = fopen('../../'.$trackingReport, 'w');
			}
			while ($row = sqlsrv_fetch_array($res, SQLSRV_FETCH_ASSOC)) {
				array_push($tracking_array, $row);
				if (!isset($headings)) {
					$headings = array_keys($row);
					fputcsv($fp, $headings, ',', '"');
				}
			}
		}

		/**********
			Add all records found to file
		**********/
		foreach ($tracking_array as $pair) {
			fputcsv($fp, $pair);
		}
		fclose($fp);


	/**********
		All queries for asset_tracking_hitorical table data
	**********/
		/**********
			Query to select all records in asset_tracking_hitorical
			where current location is a mailbox
		**********/
		$sql = "SELECT at.pk_id,
					FORMAT(at.created_date, 'yyyy-mm-dd') AS created_date,
					FORMAT(at.created_date, 'hh:mm:ss') AS created_time,
					FORMAT(at.updated_date, 'yyyy-mm-dd') AS updated_date,
					FORMAT(at.updated_date, 'hh:mm:ss') AS updated_time,
					at.asset_id, tu.first_name, tu.last_name, tc.company_name,
					at.cur_location AS current_location, at.prev_location AS previous_location
				FROM asset_tracking_hitorical AS at
					INNER JOIN transport_users AS tu ON tu.badge_id = at.asset_id
					INNER JOIN transport_companies AS tc ON tc.pk_id = tu.fk_company_pk_id
				WHERE at.cur_location LIKE 'MB%'
				ORDER BY at.cur_location";
		$res = sqlsrv_query($conn, $sql);
		if (sqlsrv_has_rows($res)) {
			// If there are records, open a new file
			$fp = fopen('../../'.$hisTrackingReport, 'w');
			while ($row = sqlsrv_fetch_array($res, SQLSRV_FETCH_ASSOC)) {
				array_push($his_tracking_array, $row);
				if (!isset($headings)) {
					$headings = array_keys($row);
					fputcsv($fp, $headings, ',', '"');
				}
			}
		}

		/**********
			Query to select all records in asset_tracking_hitorical
			where current location is NOT a mailbox
			(meaning a person has the asset)
		**********/
		$sql = "SELECT at.pk_id,
					FORMAT(at.created_date, 'yyyy-mm-dd') AS created_date,
					FORMAT(at.created_date, 'hh:mm:ss') AS created_time,
					FORMAT(at.updated_date, 'yyyy-mm-dd') AS updated_date,
					FORMAT(at.updated_date, 'hh:mm:ss') AS updated_time,
					at.asset_id, tu.first_name, tu.last_name, tc.company_name,
					at.cur_location AS current_location, at.prev_location AS previous_location
				FROM asset_tracking_hitorical AS at
					INNER JOIN transport_users AS tu ON tu.badge_id = at.asset_id
					INNER JOIN transport_companies AS tc ON tc.pk_id = tu.fk_company_pk_id
				WHERE at.cur_location NOT LIKE 'MB%'
				ORDER BY at.cur_location";
		$res = sqlsrv_query($conn, $sql);
		if (sqlsrv_has_rows($res)) {
			/**********
				if there are records, check if a file has already been opened
				if not, open one
			**********/
			if(!fstat($fp)) {
				$fp = fopen('../../'.$hisTrackingReport, 'w');
			}
			while ($row = sqlsrv_fetch_array($res, SQLSRV_FETCH_ASSOC)) {
				array_push($his_tracking_array, $row);
				if (!isset($headings)) {
					$headings = array_keys($row);
					fputcsv($fp, $headings, ',', '"');
				}
			}
		}

		/**********
			Add all records found to file
		**********/
		foreach ($his_tracking_array as $pair) {
			fputcsv($fp, $pair);
		}
		fclose($fp);
	}

	$close_success = sqlsrv_close($conn);
	if ($close_success) {
		echo json_encode(true);
	}

?>