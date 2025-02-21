import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container, CssBaseline } from "@mui/material";
import Navbar from "./components/Navbar";
import Auth from "./components/Auth";
import QuizSelection from "./components/QuizSelection";
import Quiz from "./components/Quiz";
import Multiplayer from "./components/Multiplayer";
import QuizBuilder from "./components/QuizBuilder";
import Scoreboard from "./components/Scoreboard";
import QuizHistory from "./components/QuizHistory";

export default function App() {
  const [user, setUser] = useState(null);
  const [selectedQuiz, setSelectedQuiz] = useState(null);

  const quizzes = [
    { title: "General Knowledge", file: "questions.json" },
    { title: "Science", file: "science_questions.json" },
  ];

  return (
    <Router>
      <CssBaseline />
      <Navbar user={user} />
      <Container sx={{ mt: 4 }}>
        {!user ? (
          <Auth setUser={setUser} />
        ) : (
          <Routes>
             <Route path="/" element={selectedQuiz ? <Quiz quizFile={selectedQuiz.file} /> : <QuizSelection quizzes={quizzes} startQuiz={setSelectedQuiz} />} />
            <Route path="/multiplayer" element={<Multiplayer />} />
            <Route path="/quiz-builder" element={<QuizBuilder />} />
            <Route path="/scoreboard" element={<Scoreboard />} />
            <Route path="/history" element={<QuizHistory />} />
          </Routes>
        )}
      </Container>
    </Router>
  );
}
