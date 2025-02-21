import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function Navbar({ user }) {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
           Interactive Quiz Platform
        </Typography>
        {user && (
          <>
            <Button color="inherit" component={Link} to="/">Home</Button>
            <Button color="inherit" component={Link} to="/multiplayer">Multiplayer</Button>
            <Button color="inherit" component={Link} to="/quiz-builder">Create Quiz</Button>
            <Button color="inherit" component={Link} to="/scoreboard">Leaderboard</Button>
            <Button color="inherit" component={Link} to="/history">History</Button>
          </>
        )}
        {user && <Button color="inherit">{user.displayName}</Button>}
      </Toolbar>
    </AppBar>
  );
}
