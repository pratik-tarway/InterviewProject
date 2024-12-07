import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Container,
  Paper,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignUpPage = () => {
  const [userDto, setUserDto] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDto({ ...userDto, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:5191/api/user/signup",
        userDto
      );

      // Show success message
      alert("Sign up successful!");
      navigate("/signin");
    } catch (err) {
      setError("Error signing up. Please try again.");
    } finally {
      setStatus("idle");
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#ffffff",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Container
        maxWidth="sm"
        sx={{
          padding: "40px 20px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: "30px",
            borderRadius: "8px",
            backgroundColor: "#ffffff",
            boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
            width: "100%",
            maxWidth: "400px",
          }}
        >
          <Typography
            variant="h5"
            align="center"
            sx={{
              marginBottom: "20px",
              fontWeight: 500,
              color: "#333",
              fontFamily: "'Roboto', sans-serif",
            }}
          >
            Sign Up
          </Typography>

          <form onSubmit={handleSubmit}>
            <TextField
              label="Username"
              fullWidth
              name="username"
              value={userDto.username}
              onChange={handleChange}
              style={{ marginBottom: "16px" }}
              variant="outlined"
              required
              sx={{
                marginBottom: 2,
                "& .MuiOutlinedInput-root": {
                  borderRadius: "4px",
                },
                input: {
                  color: "#333",
                },
              }}
            />
            <TextField
              label="Email"
              fullWidth
              name="email"
              value={userDto.email}
              onChange={handleChange}
              style={{ marginBottom: "16px" }}
              variant="outlined"
              required
              sx={{
                marginBottom: 2,
                "& .MuiOutlinedInput-root": {
                  borderRadius: "4px",
                },
                input: {
                  color: "#333",
                },
              }}
            />
            <TextField
              label="Password"
              type="password"
              fullWidth
              name="password"
              value={userDto.password}
              onChange={handleChange}
              style={{ marginBottom: "16px" }}
              variant="outlined"
              required
              sx={{
                marginBottom: 2,
                "& .MuiOutlinedInput-root": {
                  borderRadius: "4px",
                },
                input: {
                  color: "#333",
                },
              }}
            />
            {error && (
              <Typography
                variant="body2"
                color="error"
                sx={{ marginBottom: "16px" }}
              >
                {error}
              </Typography>
            )}
            <Box mt={2} display="flex" justifyContent="center">
              <Button
                variant="contained"
                color="primary"
                type="submit"
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
                disabled={status === "loading"}
              >
                {status === "loading" ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Sign Up"
                )}
              </Button>
            </Box>
          </form>
        </Paper>
      </Container>
    </div>
  );
};

export default SignUpPage;
