<?php
class Sbuilds{
 
    // database connection and table name
    private $conn;
    private $table_name = "sbuilds";
 
    // object properties
    public $id;
    public $nombre;
    public $placa;
    public $procesador;
    public $ram;
    public $grafica;
    public $disco;
    public $fuente;
    public $imagen;
 
    // constructor with $db as database connection
    public function __construct($db){
        $this->conn = $db;
    }

function read(){

    // select all query
    $query = "SELECT
                p.nombre, p.placa, p.procesador, p.ram, p.grafica, p.disco, p.fuente, p.imagen
            FROM
                " . $this->table_name . " p";

    // prepare query statement
    $stmt = $this->conn->prepare($query);

    // execute query
    $stmt->execute();

    return $stmt;
}
}
