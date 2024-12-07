import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import ProductList from "./pages/ProductList";
import EditProduct from "./pages/EditProduct";
import AddProduct from "./pages/AddProduct";
import ProtectedRoute from "./pages/ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/home" element={<ProductList />} />
          <Route path="/edit" element={<EditProduct />} />
          <Route path="/addproduct" element={<AddProduct />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
