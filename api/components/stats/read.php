<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
 
// database connection will be here
include_once '../config/database.php';
include_once '../objects/stats.php';

// check if cache exists
$cache_json='stats.json';
if(!is_file(cache_json)){

// instantiate database and product object
$database = new Database();
$db = $database->getConnection();
 
// initialize object
$stats = new stats($db);
 
// read products will be here
// query products
$stmt = $stats->read();
$num = $stmt->rowCount();
 
// check if more than 0 record found
if($num>0){
 
    // response array
    $stats_arr=array();
    $stats_arr["stats"]=array();
 
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        // extract row
        // this will make $row['name'] to
        // just $name only
        extract($row);
 
        $stats_item=array(
            "number" => $number
        );
 
        array_push($stats_arr["stats"], $stats_item);
    }
 
    // set response code - 200 OK
    http_response_code(200);

    file_put_contents($cache_json,json_encode($stats_arr));
 
    // show products data in json format
    echo json_encode($stats_arr);
}
 
// no products found will be here
else{
 
    // set response code - 404 Not found
    http_response_code(404);
 
    // tell the user no products found
    echo json_encode(
        array("message" => "No stats found.")
    );
}
} else{
    $json = file_get_contents($cache_json);
    echo $json;
}
?>
