<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
 
// database connection will be here
include_once '../config/database.php';
include_once '../objects/placasbase.php';
 
// check if cache exists
$cache_json='juegos.json';
if(!is_file(cache_json)){

// instantiate database and product object
$database = new Database();
$db = $database->getConnection();
 
// initialize object
$placasbase = new placasbase($db);
 
// read products will be here
// query products
$stmt = $placasbase->read();
$num = $stmt->rowCount();
 
// check if more than 0 record found
if($num>0){
 
    // response array
    $placasbase_arr=array();
    $placasbase_arr["placas"]=array();
 
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        // extract row
        // this will make $row['name'] to
        // just $name only
        extract($row);
 
        $placasbase_item=array(
            "modelo" => $modelo,
            "plataforma" => $plataforma,
            "socket" => $socket,
            "fabricante" => $fabricante,
            "asin" => $asin,
            "creado" => $creado
        );
 
        array_push($placasbase_arr["placas"], $placasbase_item);
    }
 
    // set response code - 200 OK
    http_response_code(200);

    file_put_contents($cache_json,json_encode($placasbase_arr));
 
    // show products data in json format
    echo json_encode($placasbase_arr);
}
 
// no products found will be here
else{
 
    // set response code - 404 Not found
    http_response_code(404);
 
    // tell the user no products found
    echo json_encode(
        array("message" => "No motherboards found.")
    );
}
}
else{
    $json = file_get_contents($cache_json);
    echo $json;
}
?>
