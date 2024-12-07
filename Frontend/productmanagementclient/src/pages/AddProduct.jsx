import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Container,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar"; // Import Navbar component
import Footer from "./Footer"; // Import Footer component

const AddProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newProduct = {
      name,
      price: parseFloat(price),
      category,
    };

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        console.log("No token found");
        return;
      }

      const response = await fetch("http://localhost:5191/api/products", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });

      if (!response.ok) {
        throw new Error("Failed to add product");
      }

      // Redirect to the product list after adding the product
      navigate("/home");
    } catch (error) {
      console.error("Error adding product:", error);
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
            backgroundColor: "#ffffff", // Clean white background
            boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)", // Light shadow for subtle depth
            width: "100%",
            maxWidth: "600px", // Limit form width for a more controlled look
            marginRight: "auto", // Align form to the leftmost side
          }}
        >
          <Typography
            variant="h5"
            align="left"
            sx={{
              marginBottom: "20px",
              fontWeight: 500,
              color: "#333",
              fontFamily: "'Roboto', sans-serif", // Clean and modern font
            }}
          >
            Add New Product
          </Typography>

          <form onSubmit={handleSubmit}>
            <TextField
              label="Product Name"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ marginBottom: "16px" }}
              variant="outlined"
              required
              sx={{
                marginBottom: 2,
                "& .MuiOutlinedInput-root": {
                  borderRadius: "4px", // Subtle rounding
                },
                input: {
                  color: "#333", // Dark text for clarity
                },
              }}
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
              sx={{
                marginBottom: 2,
                "& .MuiOutlinedInput-root": {
                  borderRadius: "4px", // Subtle rounding
                },
                input: {
                  color: "#333", // Dark text
                },
              }}
            />

            <TextField
              label="Category"
              fullWidth
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              style={{ marginBottom: "16px" }}
              variant="outlined"
              required
              sx={{
                marginBottom: 2,
                "& .MuiOutlinedInput-root": {
                  borderRadius: "4px", // Subtle rounding
                },
                input: {
                  color: "#333", // Dark text
                },
              }}
            />

            <Box mt={2} display="flex" justifyContent="flex-start">
              <Button
                variant="contained"
                color="primary"
                type="submit"
                sx={{
                  padding: "12px 24px",
                  textTransform: "none",
                  borderRadius: "4px",
                  backgroundColor: "#00796b", // Elegant teal color
                  "&:hover": {
                    backgroundColor: "#004d40", // Darker teal for hover effect
                  },
                  color: "#fff", // White text color for contrast
                }}
              >
                Save Product
              </Button>
            </Box>
          </form>
        </Paper>
      </Container>
      {/* Footer at the bottom */}
      <Footer /> {/* Add Footer here */}
    </div>
  );
};

export default AddProduct;
