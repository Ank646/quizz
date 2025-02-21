import { useEffect, useState } from "react";
import { Box, Typography, Card, CardContent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

export default function QuizHistory() {
  const [attempts, setAttempts] = useState([]);

  useEffect(() => {
    const savedAttempts = JSON.parse(localStorage.getItem("attempts")) || [];
    setAttempts(savedAttempts);
  }, []);

  return (
    <Box sx={{ width: "80%", maxWidth: "600px", margin: "auto", mt: 4 }}>
      <Typography variant="h4" sx={{ textAlign: "center", mb: 3 }}>
        Attempt History 
      </Typography>

      {attempts.length === 0 ? (
        <Card sx={{ p: 3, textAlign: "center", boxShadow: 3 }}>
          <CardContent>
            <Typography variant="h6">No attempts yet.</Typography>
            <Typography variant="body2" color="textSecondary">
              Start a quiz to track your progress!
            </Typography>
          </CardContent>
        </Card>
      ) : (
        <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#1976D2", color: "white" }}>
                <TableCell sx={{ fontWeight: "bold", color: "white" }}>Attempt #</TableCell>
                <TableCell sx={{ fontWeight: "bold", color: "white" }}>Score</TableCell>
                <TableCell sx={{ fontWeight: "bold", color: "white" }}>Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {attempts.map((attempt, index) => (
                <TableRow key={index} hover>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{attempt.score} / 10</TableCell>
                  <TableCell>{new Date(attempt.date).toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
}
