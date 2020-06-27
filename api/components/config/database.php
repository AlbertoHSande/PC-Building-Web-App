<?php
class Database{
	
	// Put this file outside remote access
 
    public $conn;
	private $host = "localhost";
    private $db_name = "";
    private $username = "";
    private $password = "";
 
    // get the database connection
    public function getConnection(){
 
        $this->conn = null;
 
        try{
            $this->conn = new PDO("mysql:host=" . $this->host . ";dbname=" . $this->db_name, $this->username, $this->password);
            $this->conn->exec("set names utf8");
        }catch(PDOException $exception){
            echo "Connection error: " . $exception->getMessage();
        }
        unset ($db_name, $username, $password);  
        return $this->conn;
    }
}
?>
