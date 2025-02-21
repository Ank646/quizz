import { useEffect, useState } from "react";
import { CircularProgress, Box, Typography } from "@mui/material";

export default function Timer({ timeLimit, onTimeUp }) {
  const [time, setTime] = useState(timeLimit);

  useEffect(() => {
    if (time === 0) {
      if (onTimeUp) onTimeUp(); // Trigger callback when time runs out
      return;
    }

    const interval = setInterval(() => {
      setTime((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [time, onTimeUp]);

  // Dynamic color based on remaining time
  const getColor = () => {
    if (time > timeLimit * 0.6) return "#4caf50"; // Green
    if (time > timeLimit * 0.3) return "#ff9800"; // Orange
    return "#f44336"; // Red
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" my={2}>
      <CircularProgress
        variant="determinate"
        value={(time / timeLimit) * 100}
        size={80}
        thickness={5}
        sx={{ color: getColor() }}
      />
      <Typography variant="h6" sx={{ mt: 1, fontWeight: "bold" }}>
        {time}s
      </Typography>
    </Box>
  );
}
 