<?php

    require_once("config.php");

    $audit_array = [];
    $tracking_array = [];
    $audit_unique_array = [];
    $tracking_unique_array = [];
    $export_array = [];
    $tracking_clean_unique_array = [];
    $vin_slot_pair_array = [];

    $FileName = $lot.'_kms_audit.csv';
    $fp = fopen('php://output', 'w');
    $serverName = $host."\\sqlexpress";

    // Since UID and PWD are not specified in the $connectionInfo array,
    // The connection will be attempted using Windows Authentication.
    $connectionInfo = array("Database"=>$db);
    $conn = sqlsrv_connect($serverName, $connectionInfo);

    if ($conn) {
        // Audit Query
        $sql = "SELECT FORMAT(created_date, 'yyyy-MM-dd') AS cre_date,
                        FORMAT(created_date, 'hh:mm:ss') AS cre_time, vin, vin_slot, vin_checked_in, vin_registered, scanned
                FROM kms_audit
                WHERE audit_run = 0
                ORDER BY created_date DESC";
        $res = sqlsrv_query($conn, $sql);

        if (sqlsrv_has_rows($res)) {
            $fp = fopen('../../'.$lot.'_kms_audit.csv', 'w');
            while ($row = sqlsrv_fetch_array($res, SQLSRV_FETCH_ASSOC)) {
                array_push($audit_array, $row);
                if (!isset($headings)) {
                    $headings = array_keys($row);
                    fputcsv($fp, $headings, ',', '"');
                }
            }
        }

        // Tracking Query
        $sql = "SELECT FORMAT(kt.created_date, 'yyyy-MM-dd') AS cre_date,
                        FORMAT(kt.created_date, 'hh:mm:ss') AS cre_time, v.vin, kl.key_loc AS vin_slot, kt.key_is_in AS vin_checked_in
                FROM key_tracking AS kt
                    INNER JOIN vins AS v ON v.pk_id = kt.fk_vin_pk_id
                    INNER JOIN key_locations AS kl ON kl.pk_id = kt.fk_key_loc_pk_id
                WHERE fk_vin_pk_id IN(
                    SELECT pk_id
                    FROM vins
                    WHERE pk_id IN(
                        SELECT fk_vin_pk_id
                        FROM key_tracking
                    )
                ) ORDER BY kt.created_date DESC";
        $res = sqlsrv_query($conn, $sql);

        if (sqlsrv_has_rows($res)) {
            while ($row = sqlsrv_fetch_array($res, SQLSRV_FETCH_ASSOC)) {
                array_push($tracking_array, $row);
            }

            /**
                * array_unique({array}): Removes duplicate values from an array. The first item found is kept while subsequent matching items are discarded. Returns an array of the unique values.
                *      array_column({array}, {column_key}): Returns values from a single column from the input array.
                * 
                * array_intersect_key({array1}, {array2}): Compares the keys of 2 arrays and returns the matches.
                * 
                * array_values({array}): Returns array containing all values of the supplied array. The returned array will have sequntial numeric keys starting at index 0. This is done due to indexes being empty after the previous reductions and sorting. Provides a clean array with unique slot values.
                * 
            **/
            $tracking_unique_array = array_unique(array_column($tracking_array, 'vin'));
            $tracking_clean_unique_array = array_intersect_key($tracking_array, $tracking_unique_array);

            $tracking_clean_unique_array = array_values($tracking_clean_unique_array);
            
            foreach ($tracking_clean_unique_array as $vin) {
                $vin['vin_registered'] = 1;
                $vin['scanned'] = 0;
                //if ((int)$vin['vin_checked_in'] === 1) {
                    array_push($vin_slot_pair_array, $vin);
                //}
            }
        }

        // Flagging AUdit Records as run
        $sql = "UPDATE kms_audit
                SET audit_run = 1
                WHERE audit_run = 0";
        $res = sqlsrv_query($conn, $sql);
    }

    $close_success = sqlsrv_close($conn);
	if ($close_success) {

        foreach ($vin_slot_pair_array as $ele) {
            array_push($audit_array, $ele);
        }

        /**
            * array_unique({array}): Removes duplicate values from an array. The first item found is kept while subsequent matching items are discarded. Returns an array of the unique values.
            *      array_column({array}, {column_key}): Returns values from a single column from the input array.
            * 
            * array_intersect_key({array1}, {array2}): Compares the keys of 2 arrays and returns the matches.
            * 
            * array_values({array}): Returns array containing all values of the supplied array. The returned array will have sequntial numeric keys starting at index 0. This is done due to indexes being empty after the previous reductions and sorting. Provides a clean array with unique slot values.
            * 
        **/
        $audit_unique_array = array_unique(array_column($audit_array, 'vin'));
        $export_array = array_intersect_key($audit_array, $audit_unique_array);
    
        $export_array = array_values($export_array);

        foreach ($export_array as $pair) {
            if($pair['vin_slot'] == NULL) {
                $pair['vin_slot'] = 0;
            }
            if($pair['vin_checked_in'] == NULL) {
                $pair['vin_checked_in'] = 0;
            }

            fputcsv($fp, $pair);
        }
        fclose($fp);
	}

    echo json_encode(true);
?>