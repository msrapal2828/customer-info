<?php

require_once "../models/User.php";
require_once "../classes/Response.php";

session_start();

class AuthController
{
    public function login()
    {
        $user = new User();

        $username = $_POST['username'] ?? '';
        $password = $_POST['password'] ?? '';

        if (empty($username) || empty($password)) {
            Response::error("Username and password are required.");
            return;
        }

        $result = $user->login($username, $password);

        if ($result) {

            $_SESSION['user'] = $result;

            Response::success([
                "message" => "Login Successful",
                "user" => $result
            ]);

        } else {

            Response::error("Invalid Username or Password");

        }
    }

    public function logout()
    {
        session_destroy();

        Response::success("Logout Successful");
    }
}