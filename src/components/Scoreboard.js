import { useEffect, useState } from "react";
import { Box, Typography, Card, CardContent, List, ListItem, ListItemText, Avatar } from "@mui/material";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";

export default function Scoreboard() {
  const [attempts, setAttempts] = useState([]);

  useEffect(() => {
    const savedAttempts = JSON.parse(localStorage.getItem("attempts")) || [];
    const sortedAttempts = savedAttempts.sort((a, b) => b.score - a.score);
    setAttempts(sortedAttempts);
  }, []);

  const getMedalIcon = (index) => {
    if (index === 0) return "🏆"; // Gold
    if (index === 1) return "🥈"; // Silver
    if (index === 2) return "🥉"; // Bronze
    return "🎖️"; // Others
  };

  return (
    <Box sx={{ width: "80%", maxWidth: "600px", margin: "auto", mt: 4 }}>
      <Typography variant="h4" sx={{ textAlign: "center", mb: 3 }}>
        Leaderboard 🏅
      </Typography>

      {attempts.length === 0 ? (
        <Card sx={{ p: 3, textAlign: "center", boxShadow: 3 }}>
          <CardContent>
            <Typography variant="h6">No scores yet.</Typography>
            <Typography variant="body2" color="textSecondary">
              Play a quiz and be the first on the leaderboard!
            </Typography>
          </CardContent>
        </Card>
      ) : (
        <List sx={{ width: "100%", bgcolor: "background.paper", boxShadow: 3, borderRadius: 2 }}>
          {attempts.map((attempt, index) => (
            <ListItem key={index} sx={{ borderBottom: "1px solid #ddd" }}>
              <Avatar sx={{ bgcolor: index === 0 ? "gold" : index === 1 ? "silver" : index === 2 ? "#cd7f32" : "#1976D2" }}>
                {getMedalIcon(index)}
              </Avatar>
              <ListItemText
                primary={`Score: ${attempt.score}`}
                secondary={`Date: ${new Date(attempt.date).toLocaleString()}`}
                sx={{ ml: 2 }}
              />
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
}
