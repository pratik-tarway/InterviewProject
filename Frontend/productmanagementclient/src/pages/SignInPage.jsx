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
import { Link, useNavigate } from "react-router-dom";

const SignInPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setError("");

    try {
      const response = await fetch("http://localhost:5191/api/user/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ Username: username, Password: password }),
      });

      if (!response.ok) {
        throw new Error("Invalid credentials");
      }

      const data = await response.json();
      localStorage.setItem("token", data.token);
      navigate("/home");
    } catch (err) {
      setError(err.message);
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
            Sign In
          </Typography>

          <form onSubmit={handleSubmit}>
            <TextField
              label="Username"
              fullWidth
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
                  "Sign In"
                )}
              </Button>
            </Box>
          </form>

          <Typography
            variant="body2"
            align="center"
            sx={{ marginTop: "16px", color: "#666" }}
          >
            Don't have an account?{" "}
            <Link
              to="/signup"
              style={{
                textDecoration: "none",
                color: "#00796b",
                fontWeight: "bold",
              }}
            >
              Sign Up
            </Link>
          </Typography>
        </Paper>
      </Container>
    </div>
  );
};

export default SignInPage;
