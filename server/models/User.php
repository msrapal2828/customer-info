<?php

require_once "../config/Database.php";

class User
{
    private $conn;

    public function __construct()
    {
        $database = new Database();
        $this->conn = $database->connect();
    }

    public function login($username, $password)
    {
        $sql = "SELECT * FROM users
                WHERE username=:username
                AND password=:password";

        $stmt = $this->conn->prepare($sql);

        $stmt->execute([
            ":username"=>$username,
            ":password"=>$password
        ]);

        return $stmt->fetch(PDO::FETCH_ASSOC);
    }
}