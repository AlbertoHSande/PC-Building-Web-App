<?php
class Graficas{
 
    // database connection and table name
    private $conn;
    private $table_name = "graficas";
 
    // object properties
    public $id;
    public $fabricante;
    public $modelo;
    public $memoria;
    public $consumo;
    public $asin;
    public $creado;
 
    // constructor with $db as database connection
    public function __construct($db){
        $this->conn = $db;
    }

function read(){

    // select all query
    $query = "SELECT
                p.fabricante, p.modelo, p.memoria, p.consumo, p.asin, p.creado
            FROM
                " . $this->table_name . " p";

    // prepare query statement
    $stmt = $this->conn->prepare($query);

    // execute query
    $stmt->execute();

    return $stmt;
}

function readOne($arg){

    // query to read single record
    $query = "SELECT
                p.fabricante, p.modelo, p.memoria, p.consumo, p.asin, p.creado
            FROM
                " . $this->table_name . " p
            WHERE
                p.id = '$arg'";

    // prepare query statement
    $stmt = $this->conn->prepare($query);

    // execute query
    $stmt->execute();

    return $stmt;
}
}
