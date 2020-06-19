<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');
 
// include database and object files
include_once '../config/database.php';
include_once '../objects/placasbase.php';
 
// get database connection
$database = new Database();
$db = $database->getConnection();
 
// prepare product object
$placasbase = new Placasbase($db);
 
// set ID property of record to read
$argument1 = $_GET['id'];
$stmt = $placasbase->readOne($argument1);
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
?>
