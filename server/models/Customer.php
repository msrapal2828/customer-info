<?php

require_once "../config/Database.php";

class Customer
{
    private $conn;

    public function __construct()
    {
        $database = new Database();
        $this->conn = $database->connect();
    }

    public function getAllCustomers()
    {
        $sql = "SELECT * FROM customers ORDER BY id DESC";

        $stmt = $this->conn->prepare($sql);
        $stmt->execute();

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getCustomerById($id)
{
    $sql = "SELECT * FROM customers WHERE id = :id";

    $stmt = $this->conn->prepare($sql);

    $stmt->execute([
        ":id" => $id
    ]);

    return $stmt->fetch(PDO::FETCH_ASSOC);
}

    public function addCustomer($fullname, $contact, $address, $bouquet_type, $quantity, $event_date, $status)
{
    $sql = "INSERT INTO customers(fullname, contact, address, bouquet_type, quantity, event_date, status)
            VALUES(:fullname, :contact, :address, :bouquet_type, :quantity, :event_date, :status)";

    $stmt = $this->conn->prepare($sql);

    return $stmt->execute([
        ":fullname" => $fullname,
        ":contact" => $contact,
        ":address" => $address,
        ":bouquet_type" => $bouquet_type,
        ":quantity" => $quantity,
        ":event_date" => $event_date,
        ":status" => $status
    ]);
}

public function customerExists($fullname, $contact, $event_date)
{
    $sql = "SELECT COUNT(*) 
            FROM customers
            WHERE fullname = :fullname
            AND contact = :contact
            AND event_date = :event_date";

    $stmt = $this->conn->prepare($sql);

    $stmt->execute([
        ":fullname" => $fullname,
        ":contact" => $contact,
        ":event_date" => $event_date
    ]);

    return $stmt->fetchColumn() > 0;
}

public function updateCustomer($id, $fullname, $contact, $address, $bouquet_type, $quantity, $event_date, $status)
{
    $sql = "UPDATE customers
            SET fullname=:fullname,
                contact=:contact,
                address=:address,
                bouquet_type=:bouquet_type,
                quantity=:quantity,
                event_date=:event_date,
                status=:status
            WHERE id=:id";

    $stmt = $this->conn->prepare($sql);

    return $stmt->execute([
        ":id"=>$id,
        ":fullname"=>$fullname,
        ":contact"=>$contact,
        ":address"=>$address,
        ":bouquet_type"=>$bouquet_type,
        ":quantity"=>$quantity,
        ":event_date"=>$event_date,
        ":status"=>$status
    ]);
}

public function deleteCustomer($id)
{
    $sql = "DELETE FROM customers WHERE id=:id";

    $stmt = $this->conn->prepare($sql);

    return $stmt->execute([
        ":id"=>$id
    ]);
}

public function dashboard()
{
    // Dashboard Counts
    $sql = "SELECT
                COUNT(*) AS totalCustomers,
                SUM(status='Pending') AS pending,
                SUM(status='Completed') AS completed,
                SUM(status='Cancelled') AS cancelled
            FROM customers";

    $stmt = $this->conn->prepare($sql);
    $stmt->execute();

    $dashboard = $stmt->fetch(PDO::FETCH_ASSOC);

    // Recent Customers
    $sql2 = "SELECT
                fullname,
                bouquet_type,
                event_date,
                status
            FROM customers
            ORDER BY id DESC
            LIMIT 5";

    $stmt2 = $this->conn->prepare($sql2);
    $stmt2->execute();

    $dashboard["recentCustomers"] = $stmt2->fetchAll(PDO::FETCH_ASSOC);

    return $dashboard;
}

}