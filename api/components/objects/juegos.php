<?php
class Juegos{
 
    // database connection and table name
    private $conn;
    private $table_name = "juegos";
 
    // object properties
    public $id;
    public $nombre;
    public $so;
    public $imagen;
    public $intel;
    public $amd;
    public $ram;
    public $nvidia;
    public $radeon;
    public $minintel;
    public $minamd;
    public $minram;
    public $minnvidia;
    public $minradeon;
    public $maxintel;
    public $maxamd;
    public $maxram;
    public $maxnvidia;
    public $maxradeon;
    public $minurl;
    public $url;
    public $maxurl;
    public $disco;
    public $creado;
 
    // constructor with $db as database connection
    public function __construct($db){
        $this->conn = $db;
    }

function read(){

    // select all query
    $query = "SELECT
                p.nombre, p.so, p.imagen, p.intel, p.amd, p.ram, p.nvidia, p.radeon, p.minintel, p.minamd, p.minram, p.minnvidia, p.minradeon, p.maxintel, p.maxamd, p.maxram, p.maxnvidia, p.maxradeon, p.minurl, p.url, p.maxurl, p.disco, p.creado
            FROM
                " . $this->table_name . " p
                ORDER BY p.creado DESC";

    // prepare query statement
    $stmt = $this->conn->prepare($query);

    // execute query
    $stmt->execute();

    return $stmt;
}

function readso($arg){

    // query to read single record
    $query = "SELECT
                p.nombre, p.so, p.imagen, p.intel, p.amd, p.ram, p.nvidia, p.radeon, p.disco, p.creado
            FROM
                " . $this->table_name . " p
            WHERE
                p.so = '$arg'";

    // prepare query statement
    $stmt = $this->conn->prepare($query);

    // execute query
    $stmt->execute();

    return $stmt;
}
}
