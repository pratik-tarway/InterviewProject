import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Box,
  Typography,
  Container,
  Paper,
} from "@mui/material";
import Navbar from "./Navbar"; // Import Navbar component
import Footer from "./Footer"; // Import Footer component

const EditProduct = () => {
  const { state } = useLocation(); // Destructure state from useLocation
  const product = state?.product; // Extract the product object from state

  // Check if product is available
  if (!product) {
    return <div>Loading...</div>; // Show loading message if product is not available
  }

  const [name, setName] = useState(product?.name || ""); // Default empty string if product is undefined
  const [price, setPrice] = useState(product?.price || ""); // Default empty string if product is undefined
  const [category, setCategory] = useState(product?.category || ""); // Default empty string if product is undefined
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();

  const handleSave = async () => {
    try {
      setSaving(true);
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("No token found");
        return;
      }

      const response = await fetch(
        `http://localhost:5191/api/products/${product.id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: product.id,
            name,
            price: parseFloat(price),
            category,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update product");
      }

      console.log("Product updated successfully");
      navigate("/home"); // Redirect after saving
    } catch (error) {
      console.error("Error updating product:", error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#ffffff",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Navbar /> {/* Add Navbar here */}
      <Container
        maxWidth="md"
        sx={{
          padding: "40px 20px",
          display: "flex",
          justifyContent: "flex-start",
          flex: 1,
        }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: "30px",
            borderRadius: "8px",
            backgroundColor: "#ffffff", // White background for the form
            boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)", // Light shadow for subtle depth
            width: "100%",
            maxWidth: "600px",
          }}
        >
          <Typography
            variant="h5"
            align="left"
            sx={{ marginBottom: "20px", fontWeight: 500 }}
          >
            Edit Product
          </Typography>

          <form onSubmit={(e) => e.preventDefault()}>
            <TextField
              label="Product Name"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ marginBottom: "16px" }}
              variant="outlined"
              required
            />
            <TextField
              label="Price"
              type="number"
              fullWidth
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              style={{ marginBottom: "16px" }}
              variant="outlined"
              required
            />
            <TextField
              label="Category"
              fullWidth
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              style={{ marginBottom: "16px" }}
              variant="outlined"
              required
            />

            <Box mt={2} display="flex" justifyContent="flex-start">
              <Button
                variant="contained"
                color="primary"
                onClick={handleSave}
                disabled={saving}
                sx={{
                  padding: "12px 24px",
                  textTransform: "none",
                  borderRadius: "4px",
                  backgroundColor: "#00796b",
                  "&:hover": {
                    backgroundColor: "#004d40",
                  },
                  color: "#fff",
                }}
              >
                {saving ? "Saving..." : "Save"}
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                style={{ marginLeft: "16px" }}
                onClick={() => navigate("/")}
              >
                Cancel
              </Button>
            </Box>
          </form>
        </Paper>
      </Container>
      <Footer /> {/* Add Footer here */}
    </div>
  );
};

export default EditProduct;
