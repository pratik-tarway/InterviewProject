import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  CircularProgress,
  TextField,
  Box,
  MenuItem,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { decodeJwt } from "jose";
import Dashboard from "./Dashboard"; // Import Dashboard component
import AddIcon from "@mui/icons-material/Add"; // Add icon for Add Product button
import SearchIcon from "@mui/icons-material/Search"; // Search icon for the search button
import Navbar from "./Navbar"; // Import the Navbar component
import Footer from "./Footer"; // Import the Footer component

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [searchLoading, setSearchLoading] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteProductId, setDeleteProductId] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is an admin using jose for decoding JWT
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = decodeJwt(token); // Decoding the JWT token
        setIsAdmin(decodedToken.sub === "admin"); // Assuming 'sub' indicates the role
      } catch (error) {
        console.error("Failed to decode token", error);
      }
    }
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setSearchLoading(true);

      const token = localStorage.getItem("token");

      if (!token) {
        console.log("No token found");
        return;
      }

      const queryParams = new URLSearchParams();

      if (searchTerm.trim()) queryParams.append("name", searchTerm);
      if (category.trim()) queryParams.append("category", category);
      if (minPrice.trim()) queryParams.append("minPrice", minPrice);
      if (maxPrice.trim()) queryParams.append("maxPrice", maxPrice);

      const endpoint = `http://localhost:5191/api/products/search?${queryParams.toString()}`;

      const response = await fetch(endpoint, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }

      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
      setSearchLoading(false);
    }
  };

  const deleteProduct = async (productId) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("No token found");
        return;
      }

      const response = await fetch(
        `http://localhost:5191/api/products/${productId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete the product");
      }

      // Remove the deleted product from the state
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== productId)
      );

      // Close the dialog
      closeDeleteDialog();
      console.log("Product deleted successfully");
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleSearch = () => {
    fetchProducts();
  };

  const openDeleteDialog = (id) => {
    setDeleteDialogOpen(true);
    setDeleteProductId(id);
  };

  const closeDeleteDialog = () => {
    setDeleteDialogOpen(false);
    setDeleteProductId(null);
  };

  const handleAddProduct = () => {
    navigate("/addproduct");
  };

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </div>
    );
  }

  return (
    <div>
      <Navbar /> {/* Add Navbar here */}
      <div style={{ padding: "20px" }}>
        {isAdmin && <Dashboard />} {/* Only show dashboard if admin */}
        <Typography variant="h4" gutterBottom>
          Product List
        </Typography>
        {isAdmin && (
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddProduct}
            style={{
              marginBottom: "16px",
              padding: "10px 20px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <AddIcon style={{ marginRight: "8px" }} />+ Add Product
          </Button>
        )}
        <Box mb={3}>
          <TextField
            fullWidth
            label="Search Products by Name"
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              marginBottom: "16px",
              backgroundColor: "#f5f5f5",
              borderRadius: "5px",
            }}
            InputProps={{
              startAdornment: (
                <SearchIcon style={{ color: "#1976d2", marginRight: "8px" }} />
              ),
            }}
          />
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <TextField
                select
                label="Category"
                fullWidth
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                style={{
                  backgroundColor: "#f5f5f5",
                  borderRadius: "5px",
                }}
              >
                <MenuItem value="">All Categories</MenuItem>
                <MenuItem value="Electronics">Electronics</MenuItem>
                <MenuItem value="Computers">Computers</MenuItem>
                {/* Add more categories */}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Min Price"
                type="number"
                fullWidth
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                style={{
                  backgroundColor: "#f5f5f5",
                  borderRadius: "5px",
                }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Max Price"
                type="number"
                fullWidth
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                style={{
                  backgroundColor: "#f5f5f5",
                  borderRadius: "5px",
                }}
              />
            </Grid>
          </Grid>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleSearch}
            style={{
              marginTop: "16px",
              padding: "10px 20px",
              display: "flex",
              alignItems: "center",
            }}
            disabled={searchLoading}
          >
            <SearchIcon style={{ marginRight: "8px" }} />
            Search
          </Button>
        </Box>
        <Grid container spacing={3}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{product.name}</Typography>
                  <Typography variant="body2">
                    Price: ${product.price}
                  </Typography>
                  <Typography variant="body2">
                    Category: {product.category}
                  </Typography>
                  {isAdmin && (
                    <Box mt={2} display="flex" justifyContent="space-between">
                      <Button
                        variant="outlined"
                        color="primary"
                        onClick={() =>
                          navigate(`/edit/`, {
                            state: { product },
                          })
                        }
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() => openDeleteDialog(product.id)}
                      >
                        Delete
                      </Button>
                    </Box>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Dialog
          open={deleteDialogOpen}
          onClose={closeDeleteDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Delete Product?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to delete this product?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={closeDeleteDialog} color="primary">
              Cancel
            </Button>
            <Button
              onClick={() => deleteProduct(deleteProductId)}
              color="secondary"
              autoFocus
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      <Footer /> {/* Add Footer here */}
    </div>
  );
};

export default ProductList;
