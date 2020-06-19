<?php
class Stats{
 
    // database connection and table name
    private $conn;
    private $table_name = "stats";
 
    // object properties
    public $number;
 
    // constructor with $db as database connection
    public function __construct($db){
        $this->conn = $db;
    }

function read(){

    // select all query
    $query = "SELECT
                p.number
            FROM
                " . $this->table_name . " p";

    // prepare query statement
    $stmt = $this->conn->prepare($query);

    // execute query
    $stmt->execute();

    return $stmt;
}

}
