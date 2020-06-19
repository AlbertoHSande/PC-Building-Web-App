<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
 
// database connection will be here
include_once '../config/database.php';
include_once '../objects/fuentes.php';
 
// instantiate database and product object
$database = new Database();
$db = $database->getConnection();
 
// initialize object
$fuentes = new fuentes($db);
 
// read products will be here
// query products
$argument1 = $_GET['potencia'];
$stmt = $fuentes->readPotencia($argument1);
$num = $stmt->rowCount();
 
// check if more than 0 record found
if($num>0){
 
    // response array
    $fuentes_arr=array();
    $fuentes_arr["fuentes"]=array();
 
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        // extract row
        // this will make $row['name'] to
        // just $name only
        extract($row);
 
        $fuentes_item=array(
            "fabricante" => $fabricante,
            "potencia" => $potencia,
            "asin" => $asin,
            "creado" => $creado
        );
 
        array_push($fuentes_arr["fuentes"], $fuentes_item);
    }
 
    // set response code - 200 OK
    http_response_code(200);
 
    // show products data in json format
    echo json_encode($fuentes_arr);
}
 
// no products found will be here
else{
 
    // set response code - 404 Not found
    http_response_code(404);
 
    // tell the user no products found
    echo json_encode(
        array("message" => "No processors found.")
    );
}
?>
