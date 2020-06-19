<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
 
// database connection will be here
include_once '../config/database.php';
include_once '../objects/ram.php';

// check if cache exists
$cache_json='ram.json';
if(!is_file(cache_json)){

// instantiate database and product object
$database = new Database();
$db = $database->getConnection();
 
// initialize object
$ram = new ram($db);
 
// read products will be here
// query products
$stmt = $ram->read();
$num = $stmt->rowCount();
 
// check if more than 0 record found
if($num>0){
 
    // response array
    $ram_arr=array();
    $ram_arr["ram"]=array();
 
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        // extract row
        // this will make $row['name'] to
        // just $name only
        extract($row);
 
        $ram_item=array(
            "fabricante" => $fabricante,
            "frecuencia" => $frecuencia,
            "memoria" => $memoria,
            "tipo" => $tipo,
            "asin" => $asin,
            "creado" => $creado
        );
 
        array_push($ram_arr["ram"], $ram_item);
    }
 
    // set response code - 200 OK
    http_response_code(200);

    file_put_contents($cache_json,json_encode($ram_arr));
 
    // show products data in json format
    echo json_encode($ram_arr);
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
}else{
    $json = file_get_contents($cache_json);
    echo $json;
}
?>
