<?php

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Content-Type: application/json");

require_once "../controllers/CustomerController.php";

$controller = new CustomerController();
$controller->dashboard();