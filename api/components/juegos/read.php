<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
 
// database connection will be here
include_once '../config/database.php';
include_once '../objects/juegos.php';

// check if cache exists
$cache_json='juegos.json';
if(!is_file(cache_json)){

// instantiate database and product object
$database = new Database();
$db = $database->getConnection();
 
// initialize object
$juegos = new juegos($db);
 
// read products will be here
// query products
$stmt = $juegos->read();
$num = $stmt->rowCount();
 
// check if more than 0 record found
if($num>0){
 
    // response array
    $juegos_arr=array();
    $juegos_arr["juegos"]=array();
 
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        // extract row
        // this will make $row['name'] to
        // just $name only
        extract($row);
 
        $juegos_item=array(
            "nombre" => $nombre,
            "so" => $so,
            "imagen" => $imagen,
            "intel" => $intel,
            "amd" => $amd,
            "ram" => $ram,
            "nvidia" => $nvidia,
            "radeon" => $radeon,
            "minintel" => $minintel,
            "minamd" => $minamd,
            "minram" => $minram,
            "minnvidia" => $minnvidia,
            "minradeon" => $minradeon,
            "maxintel" => $maxintel,
            "maxamd" => $maxamd,
            "maxram" => $maxram,
            "maxnvidia" => $maxnvidia,
            "maxradeon" => $maxradeon,
            "minurl" => $minurl,
            "url" => $url,
            "maxurl" => $maxurl,
            "disco" => $disco,
            "creado" => $creado
        );
 
        array_push($juegos_arr["juegos"], $juegos_item);
    }
 
    // set response code - 200 OK
    http_response_code(200);
 
    file_put_contents($cache_json,json_encode($juegos_arr));

    // show products data in json format
    echo json_encode($juegos_arr);
}
 
// no products found will be here
else{
 
    // set response code - 404 Not found
    http_response_code(404);
 
    // tell the user no products found
    echo json_encode(
        array("message" => "No games found.")
    );
}
}
else{
    $json = file_get_contents($cache_json);
    echo $json;
}
?>
