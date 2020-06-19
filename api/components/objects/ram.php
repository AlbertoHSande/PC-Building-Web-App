<?php
class Ram{
 
    // database connection and table name
    private $conn;
    private $table_name = "ram";
 
    // object properties
    public $id;
    public $fabricante;
    public $frecuencia;
    public $memoria;
    public $tipo;
    public $asin;
    public $creado;
 
    // constructor with $db as database connection
    public function __construct($db){
        $this->conn = $db;
    }

function read(){

    // select all query
    $query = "SELECT
                p.fabricante, p.frecuencia, p.memoria, p.tipo, p.asin, p.creado
            FROM
                " . $this->table_name . " p";

    // prepare query statement
    $stmt = $this->conn->prepare($query);

    // execute query
    $stmt->execute();

    return $stmt;
}

function readMemory($arg){

    // select all query
    $query = "SELECT
                p.fabricante, p.frecuencia, p.memoria, p.tipo, p.asin, p.creado
            FROM
                " . $this->table_name . " p
                WHERE p.memoria = '$arg'";

    // prepare query statement
    $stmt = $this->conn->prepare($query);

    // execute query
    $stmt->execute();

    return $stmt;
}

function readOne($arg){

    // select all query
    $query = "SELECT
                p.fabricante, p.frecuencia, p.memoria, p.tipo, p.asin, p.creado
            FROM
                " . $this->table_name . " p
                WHERE p.id = '$arg'";

    // prepare query statement
    $stmt = $this->conn->prepare($query);

    // execute query
    $stmt->execute();

    return $stmt;
}
}
