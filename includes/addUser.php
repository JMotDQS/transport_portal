<?php
	include("config.php");

	$return_array = [];
	$badge_array = [];
	$comp_abb = '';
	$comp_id = 0;
	$temp_badge_num;
	$temp_badge_num_new;
	$new_badge_num = '';
	
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
		$sql_comp_abb = "SELECT pk_id, abb_name
						FROM transport_companies
						WHERE abb_name = '".$_POST['abbName']."'";
		$res = sqlsrv_query($conn, $sql_comp_abb);
		if ($res) {
			while ($row = sqlsrv_fetch_array($res, SQLSRV_FETCH_ASSOC)) {
				$comp_abb = $row['abb_name'];
				$comp_id = $row['pk_id'];
			}
		}

		$sql_badge = "SELECT TOP 1 badge_id
					FROM transport_users
					WHERE badge_id LIKE '".$comp_abb."%'
					ORDER BY badge_id DESC";
		$res = sqlsrv_query($conn, $sql_badge);
		if ($res) {
			while ($row = sqlsrv_fetch_array($res, SQLSRV_FETCH_ASSOC)) {
				array_push($badge_array, $row);
			}
		}

		if(count($badge_array) == 0) {
			$new_badge_num = $comp_abb.'30001';
		} else {
			$temp_badge_num = (int)substr($badge_array[0]['badge_id'], 3);
			$temp_badge_num_new = $temp_badge_num + 1;
			$new_badge_num = (string)$comp_abb.$temp_badge_num_new;
		}

		$sql = "INSERT INTO transport_users
					(created_date, badge_id, first_name, last_name, fk_company_pk_id)
				VALUES (GETDATE(), '".$new_badge_num."', '".$_POST['firstName']."', '".$_POST['lastName']."', ".$comp_id.")";
		$res = sqlsrv_query($conn, $sql);
	} else {
		die("Connect Error (".mysqli_connect_errno().") ".mysqli_connect_error());
	}

	$close_success = sqlsrv_close($conn);
	if($close_success) {
		echo json_encode($new_badge_num);
	}
?>