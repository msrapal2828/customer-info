import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Customers from "./pages/Customers";
import AddCustomer from "./pages/AddCustomer";
import EditCustomer from "./pages/EditCustomer";
import ViewCustomer from "./pages/ViewCustomer";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Login />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/customers" element={<Customers />} />

        <Route path="/add-customer" element={<AddCustomer />} />

        <Route path="/edit-customer/:id" element={<EditCustomer />} />

        <Route path="/view-customer/:id" element={<ViewCustomer />} />

      </Routes>

    </BrowserRouter>

  );

}

export default App;
