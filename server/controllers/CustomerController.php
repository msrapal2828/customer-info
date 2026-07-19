<?php

require_once "../models/Customer.php";
require_once "../classes/Response.php";

class CustomerController
{
    public function dashboard()
    {
        $customer = new Customer();

        $data = $customer->dashboard();

        Response::success($data);
    }

    public function getCustomers()
    {
        $customer = new Customer();

        $result = $customer->getAllCustomers();

        Response::success($result);
    }

    public function addCustomer()
    {
        // Contact Number Validation
        if (!preg_match('/^09\d{9}$/', trim($_POST['contact']))) {
            Response::error("Contact number must be 11 digits and start with 09.");
            return;
        }

        // Quantity Validation
        if (!is_numeric($_POST['quantity']) || $_POST['quantity'] <= 0) {
            Response::error("Quantity must be greater than 0.");
            return;
        }

        // Event Date Validation
        if ($_POST['event_date'] < date("Y-m-d")) {
            Response::error("Event date cannot be in the past.");
            return;
        }

        // Create Customer Object
        $customer = new Customer();

        // Duplicate Customer Validation
        if (
            $customer->customerExists(
                trim($_POST['fullname']),
                trim($_POST['contact']),
                $_POST['event_date']
            )
        ) {
            Response::error("This customer already exists.");
            return;
        }

        // Add Customer
        $result = $customer->addCustomer(
            trim($_POST['fullname']),
            trim($_POST['contact']),
            trim($_POST['address']),
            trim($_POST['bouquet_type']),
            $_POST['quantity'],
            $_POST['event_date'],
            $_POST['status']
        );

        if ($result) {
            Response::success("Customer added successfully.");
        } else {
            Response::error("Failed to add customer.");
        }
    }

    public function getCustomer()
    {
        $customer = new Customer();

        $result = $customer->getCustomerById($_GET['id']);

        Response::success($result);
    }

    public function updateCustomer()
    {
        $customer = new Customer();

        $result = $customer->updateCustomer(
            $_POST['id'],
            trim($_POST['fullname']),
            trim($_POST['contact']),
            trim($_POST['address']),
            trim($_POST['bouquet_type']),
            $_POST['quantity'],
            $_POST['event_date'],
            $_POST['status']
        );

        if ($result) {
            Response::success("Customer updated successfully.");
        } else {
            Response::error("Update failed.");
        }
    }

    public function deleteCustomer()
    {
        $customer = new Customer();

        $result = $customer->deleteCustomer($_POST['id']);

        if ($result) {
            Response::success("Customer deleted successfully.");
        } else {
            Response::error("Delete failed.");
        }
    }
}