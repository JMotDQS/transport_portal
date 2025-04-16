<?php
	include("config.php");

	$asso_array = [];
	$asso_array = explode(",", $_POST['asso_string']);
	array_pop($asso_array);
	$prev_location = 'NULL';
	$asso_count = 0;

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
	//if(mysqli_connect_error()) {//Use for PHP versions prior to 5.3
	
	if ($conn) {// Use for PHP versions 5.3+
		$asso_count = count($asso_array);
		for($i = 0; $i < $asso_count; $i++) {

			$sql_track = "SELECT AssetId, PrevLocation, CurLocation
							FROM AssetTracking
							WHERE AssetId = '".$asso_array[$i]."'";
			$res_track = sqlsrv_query($conn, $sql_track);
			if (sqlsrv_has_rows($res_track)) {
				while ($row = sqlsrv_fetch_array($res_track, SQLSRV_FETCH_ASSOC)) {
					$prev_location = $row['CurLocation'];
				}

				$sql_track = "UPDATE AssetTracking
							SET Updated = GETDATE(), PrevLocation = '".$prev_location."', CurLocation = '".$_POST['new_location']."'
							WHERE AssetId = '".$asso_array[$i]."'";
				$res_track = sqlsrv_query($conn, $sql_track);
			} else {
				$prev_location = 'NULL';
				$sql_track = "INSERT INTO AssetTracking
								(Created, Updated, AssetId, PrevLocation, CurLocation)
							VALUES (GETDATE(), NULL, '".$asso_array[$i]."', '".$prev_location."', '".$_POST['new_location']."')";
				$res_track = sqlsrv_query($conn, $sql_track);
			}

			$sql_track_his = "INSERT INTO AssetTrackingHistorical
								(Created, AssetId, PrevLocation, CurLocation)
							VALUES (GETDATE(), '".$asso_array[$i]."', '".$prev_location."', '".$_POST['new_location']."')";
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