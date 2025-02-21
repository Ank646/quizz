import React, { useState } from "react";
import axios from "axios";
import { Button, Typography, CircularProgress, Box } from "@mui/material";

export default function AIExplanation({ question, correctAnswer }) {
  const [explanation, setExplanation] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchExplanation = async () => {
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/explain", { question, correctAnswer });
      setExplanation(res.data.explanation);
    } catch (error) {
      console.error("Error fetching AI explanation:", error);
      setExplanation("Could not fetch an explanation. Try again later.");
    }
    setLoading(false);
  };

  return (
    <Box mt={2}>
      <Button variant="outlined" onClick={fetchExplanation} disabled={loading}>
        {loading ? <CircularProgress size={24} /> : "Get AI Explanation"}
      </Button>
      {explanation && (
        <Typography variant="body1" sx={{ mt: 2 }}>
          {explanation}
        </Typography>
      )}
    </Box>
  );
}
