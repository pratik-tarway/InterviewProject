import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  Divider,
} from "@mui/material";
import { decodeJwt } from "jose"; // Decode JWT using jose
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts"; // Import charts

const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [totalProducts, setTotalProducts] = useState(120); // Placeholder value for total products

  useEffect(() => {
    // Check if the user is an admin using the JWT token
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = decodeJwt(token); // Decode JWT token using jose
        setIsAdmin(decodedToken.sub === "admin"); // Assuming 'role' is part of the JWT payload
      } catch (error) {
        console.error("Failed to decode token", error);
      }
    }
  }, []);

  // Static data for the dashboard
  const categories = [
    { name: "Electronics", count: 40 },
    { name: "Computers", count: 30 },
    { name: "Home Appliances", count: 20 },
    { name: "Clothing", count: 15 },
    { name: "Sports", count: 15 },
  ]; // Static categories with product count
  const topItems = [
    { name: "Apple iPhone 13", price: 999.99 },
    { name: "MacBook Pro 16-inch", price: 2399.99 },
    { name: "Sony Headphones", price: 299.99 },
  ]; // Static top products (e.g., top-selling or most expensive)

  if (!isAdmin) {
    return null; // Return nothing if the user is not an admin
  }

  // Pie chart data for categories
  const categoryData = categories.map((category) => ({
    name: category.name,
    value: category.count,
  }));

  // Bar chart data for top items
  const topItemsData = topItems.map((item) => ({
    name: item.name,
    price: item.price,
  }));

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>

      <Grid container spacing={3}>
        {/* KPI Card for Total Products */}
        <Grid item xs={12} sm={4} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Total Products
              </Typography>
              <Divider style={{ marginBottom: "16px" }} />
              <Typography variant="h4" color="primary" gutterBottom>
                {totalProducts} Products
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Categories Distribution Section */}
        <Grid item xs={12} sm={4} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Categories Distribution
              </Typography>
              <Divider style={{ marginBottom: "16px" }} />
              <Box height={300}>
                <PieChart width={300} height={300}>
                  <Pie
                    data={categoryData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={getColor(index)} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Top Products Section */}
        <Grid item xs={12} sm={4} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Top Products
              </Typography>
              <Divider style={{ marginBottom: "16px" }} />
              <Box height={300}>
                <BarChart width={600} height={300} data={topItemsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="price" fill="#8884d8" />
                </BarChart>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

// Function to generate colors for Pie chart cells
const getColor = (index) => {
  const colors = ["#FFBB28", "#FF8042", "#0088FE", "#00C49F", "#FF8042"];
  return colors[index % colors.length];
};

export default Dashboard;
