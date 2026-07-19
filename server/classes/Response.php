<?php

class Response
{
    public static function success($data)
    {
        echo json_encode([
            "status" => true,
            "data" => $data
        ]);
    }

    public static function error($message)
    {
        echo json_encode([
            "status" => false,
            "message" => $message
        ]);
    }
}