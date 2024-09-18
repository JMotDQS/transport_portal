<?php
	include("config.php");

	$asso_array = [];
	$asso_array = explode(",", $_POST['asso_string']);
	$prev_location = NULL;
	$asso_count = 0;
	$serverName = $host."\\sqlexpress";

	$connectionInfo = array("Database"=>$db);
	$conn = sqlsrv_connect($serverName, $connectionInfo);
	//if(mysqli_connect_error()) {//Use for PHP versions prior to 5.3
	if ($conn) {// Use for PHP versions 5.3+
		$asso_count = count($asso_array);
		for($i = 0; $i < $asso_count; $i++) {

			$sql_track = "SELECT asset_id, prev_location, cur_location
						FROM asset_tracking
						WHERE asset_id = '".$asso_array[$i]."'";
			$res_track = sqlsrv_query($conn, $sql_track);
			if (sqlsrv_has_rows($res)) {
				while ($row = sqlsrv_fetch_array($res_track, SQLSRV_FETCH_ASSOC)) {
					$prev_location = $row['cur_location'];
				}

				$sql_track = "UPDATE asset_tracking
							SET updated_date = GETDATE(), prev_location = '".$prev_location."', cur_location = '".$_POST['new_location']."'
							WHERE asset_id = '".$asso_array[$i]."'";
				$res_track = sqlsrv_query($conn, $sql_track);
			} else {
				$prev_location = NULL;
				$sql_track = "INSERT INTO asset_tracking
								(created_date, update_date, asset_id, prev_location, cur_location)
							VALUES (GETDATE(), NULL, '".$asso_array[$i]."', '".$prev_location."', '".$_POST['new_location']."'";
				$res_track = sqlsrv_query($conn, $sql_track);
			}

			$sql_track_his = "INSERT INTO asset_tracking_historical
								(created_date, asset_id, prev_location, cur_location)
							VALUES (GETDATE(), '".$asso_array[$i]."', '".$prev_location."', '".$_POST['new_location']."'";
			$res_track_his = sqlsrv_query($conn, $sql_track_his);

		}
	} else {
		die("Connect Error (".mysqli_connect_errno().") ".mysqli_connect_error());
	}

	$close_success = sqlsrv_close($conn);
	if($close_success) {
		echo json_encode(true);
	}
?>