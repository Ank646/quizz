import React, { useEffect, useState } from "react";
import { auth, provider } from "../firebase"; 
import { signInWithPopup, signOut } from "firebase/auth";
import { Button, Typography, Box, CircularProgress, Alert } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";

export default function Auth({ setUser }) {
  const [user, setUserState] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); 
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(
      (user) => {
        setUserState(user);
        if (setUser) setUser(user);
      },
      (error) => {
        console.error("Auth State Error:", error);
        setError("Failed to fetch authentication state.");
      }
    );

    return () => unsubscribe(); 
  }, [setUser]);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, provider);
      setUserState(result.user);
      if (setUser) setUser(result.user);
      setError(null);
    } catch (error) {
      console.error("Login Error:", error.message);
      setError("Failed to log in. Please try again.");
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      setUserState(null);
      if (setUser) setUser(null);
      setError(null);
    } catch (error) {
      console.error("Logout Error:", error.message);
      setError("Failed to log out. Please try again.");
    }
    setLoading(false);
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" mt={4}>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      {user ? (
        <>
          <Typography variant="h6">Welcome, {user.displayName}!</Typography>
          <Button variant="contained" color="error" onClick={handleLogout} sx={{ mt: 2 }} disabled={loading}>
            {loading ? <CircularProgress size={24} sx={{ color: "#fff" }} /> : "Logout"}
          </Button>
        </>
      ) : (
        <Button variant="contained" startIcon={<GoogleIcon />} onClick={handleLogin} sx={{ mt: 2 }} disabled={loading}>
          {loading ? <CircularProgress size={24} sx={{ color: "#fff" }} /> : "Login with Google"}
        </Button>
      )}
    </Box>
  );
}
