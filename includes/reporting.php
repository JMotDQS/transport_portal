<?php

	require_once("config.php");

	$return_array = [];
	$tracking_array = [];
	$his_tracking_array = [];

	$trackingReport = 'asset_tracking.csv';
	$hisTrackingReport = 'asset_tracking_historical.csv';

	/*
	$tracking_sql = "SELECT at.pk_id,
						FORMAT(at.created_date, 'yyyy-mm-dd') AS created_date,
						FORMAT(at.created_date, 'hh:mm:ss') AS created_time,
						FORMAT(at.updated_date, 'yyyy-mm-dd') AS updated_date,
						FORMAT(at.updated_date, 'hh:mm:ss') AS updated_time,
						at.asset_id, tu.first_name, tu.last_name, tc.company_name,
						at.cur_location AS current_location, at.prev_location AS previous_location
					FROM asset_tracking AS at
						INNER JOIN transport_users AS tu ON tu.badge_id = at.asset_id
						INNER JOIN transport_companies AS tc ON tc.pk_id = tu.fk_company_pk_id";
	
	$his_tracking_sql = "SELECT ath.pk_id,
							FORMAT(ath.created_date, 'yyyy-mm-dd') AS created_date,
							FORMAT(ath.created_date, 'hh:mm:ss') AS created_time,
							ath.asset_id, tu.first_name, tu.last_name, tc.company_name,
							ath.cur_location AS current_location, ath.prev_location AS previous_location
						FROM asset_tracking_historical AS ath
							INNER JOIN transport_users AS tu ON tu.badge_id = ath.asset_id
							INNER JOIN transport_companies AS tc ON tc.pk_id = tu.fk_company_pk_id";
	*/

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
	/**********
		All queries for asset_tracking table data
	**********/
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
					at.asset_id, at.cur_location AS current_location, at.prev_location AS previous_location,
					tu.first_name, tu.last_name, tc.company_name
				FROM asset_tracking AS at
					INNER JOIN transport_users AS tu ON tu.badge_id = at.cur_location
					INNER JOIN transport_companies AS tc ON tc.pk_id = tu.fk_company_pk_id
				WHERE at.cur_location NOT LIKE 'MB%'
				ORDER BY at.cur_location";
		$res = sqlsrv_query($conn, $sql);
		if (sqlsrv_has_rows($res)) {
			//if there are records
			while ($row = sqlsrv_fetch_array($res, SQLSRV_FETCH_ASSOC)) {
				array_push($tracking_array, $row);
				if (!isset($headings)) {
					$headings = array_keys($row);
				}
			}
		}

		/**********
			Query to select all records in asset_tracking
			where current location is a mailbox
		**********/
		$sql = "SELECT at.pk_id,
					FORMAT(at.created_date, 'yyyy-mm-dd') AS created_date,
					FORMAT(at.created_date, 'hh:mm:ss') AS created_time,
					FORMAT(at.updated_date, 'yyyy-mm-dd') AS updated_date,
					FORMAT(at.updated_date, 'hh:mm:ss') AS updated_time,
					at.asset_id, at.cur_location AS current_location, at.prev_location AS previous_location
				FROM asset_tracking AS at
				WHERE at.cur_location LIKE 'MB%'
				ORDER BY at.cur_location";
		$res = sqlsrv_query($conn, $sql);
		if (sqlsrv_has_rows($res)) {
			// If there are records
			while ($row = sqlsrv_fetch_array($res, SQLSRV_FETCH_ASSOC)) {
				array_push($tracking_array, $row);
				if (!isset($headings)) {
					$headings = array_keys($row);
				}
			}
		}

	/**********
		All queries for asset_tracking_hitorical table data
	**********/
		/**********
			Query to select all records in asset_tracking_hitorical
			where current location is NOT a mailbox
			(meaning a person has the asset)
		**********/
		$sql = "SELECT ath.pk_id,
					FORMAT(ath.created_date, 'yyyy-mm-dd') AS created_date,
					FORMAT(ath.created_date, 'hh:mm:ss') AS created_time,
					ath.asset_id, ath.cur_location AS current_location, ath.prev_location AS previous_location/*,
					tu.first_name, tu.last_name, tc.company_name*/
				FROM asset_tracking_historical AS ath
					/*INNER JOIN transport_users AS tu ON tu.badge_id = ath.cur_location
					INNER JOIN transport_companies AS tc ON tc.pk_id = tu.fk_company_pk_id*/
				WHERE ath.cur_location NOT LIKE 'MB%'
				ORDER BY ath.cur_location";
		$res = sqlsrv_query($conn, $sql);
		if (sqlsrv_has_rows($res)) {
			// If there are records
			while ($row = sqlsrv_fetch_array($res, SQLSRV_FETCH_ASSOC)) {
				array_push($his_tracking_array, $row);
				if (!isset($his_headings)) {
					$his_headings = array_keys($row);
				}
			}
		}

		/**********
			Query to select all records in asset_tracking_hitorical
			where current location is a mailbox
		**********/
		$sql = "SELECT ath.pk_id,
					FORMAT(ath.created_date, 'yyyy-mm-dd') AS created_date,
					FORMAT(ath.created_date, 'hh:mm:ss') AS created_time,
					ath.asset_id, ath.cur_location AS current_location,
					ath.prev_location AS previous_location
				FROM asset_tracking_historical AS ath
				WHERE ath.cur_location LIKE 'MB%'
				ORDER BY ath.cur_location";
		$res = sqlsrv_query($conn, $sql);
		if (sqlsrv_has_rows($res)) {
			// If there are records
			while ($row = sqlsrv_fetch_array($res, SQLSRV_FETCH_ASSOC)) {
				array_push($his_tracking_array, $row);
				if (!isset($his_headings)) {
					$his_headings = array_keys($row);
				}
			}
		}
	}

	$close_success = sqlsrv_close($conn);
	if(count($tracking_array) == 0) {
		echo json_encode(false);
	} else {
		if ($close_success) {
			$fp = fopen('php://output', 'w');
			$fp = fopen('../../'.$trackingReport, 'w');

			if (isset($headings)) {
				fputcsv($fp, $headings, ',', '"');
			}

			foreach ($tracking_array as $pair) {
				if($pair['updated_date'] == '') {
					$pair['updated_date'] = 'NULL';
				}
				if($pair['updated_time'] == '') {
					$pair['updated_time'] = 'NULL';
				}
				fputcsv($fp, $pair);
			}
			fclose($fp);

			$fp = fopen('php://output', 'w');
			$fp = fopen('../../'.$hisTrackingReport, 'w');

			if (isset($his_headings)) {
				fputcsv($fp, $his_headings, ',', '"');
			}

			foreach ($his_tracking_array as $pair) {
				fputcsv($fp, $pair);
			}
			fclose($fp);

			echo json_encode(true);
		}
	}

?>