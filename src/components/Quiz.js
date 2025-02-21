import { useState, useEffect } from "react";
import { Button, Card, CardContent, Typography, LinearProgress, Box, CircularProgress } from "@mui/material";
import { CheckCircle, Cancel } from "@mui/icons-material";
import Timer from "./Timer";
import questions from "../data/questions.json";
import axios from "axios";

export default function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState([]);
  const [explanation, setExplanation] = useState("");
  const [loadingExplanation, setLoadingExplanation] = useState(false);

  useEffect(() => {
    const savedAttempts = JSON.parse(localStorage.getItem("attempts")) || [];
    setAttempts(savedAttempts);
  }, []);

  const fetchExplanation = async () => {
    setLoadingExplanation(true);
    try {
      const response = await axios.post("http://localhost:5000/explain", {
        question: questions[currentQuestion].question,
        correctAnswer: questions[currentQuestion].correct,
      });
      setExplanation(response.data.explanation);
    } catch (error) {
      console.error("Error fetching AI explanation:", error);
      setExplanation("Couldn't fetch explanation.");
    }
    setLoadingExplanation(false);
  };

  const handleAnswer = (answer) => {
    setSelectedAnswer(answer);

    if (answer === questions[currentQuestion].correct) {
      setScore((prevScore) => prevScore + 1);
    }

    fetchExplanation();
    setTimeout(() => {
      setCurrentQuestion((prev) => prev + 1);
      setSelectedAnswer(null);
      setExplanation("");
    }, 3000);
  };

  const saveAttempt = () => {
    const newAttempts = [...attempts, { date: new Date().toLocaleString(), score }];
    setAttempts(newAttempts);
    localStorage.setItem("attempts", JSON.stringify(newAttempts));
  };

  return (
    <Box sx={{ width: "80%", maxWidth: "600px", margin: "auto", mt: 4, textAlign: "center" }}>
      <Typography variant="h4" gutterBottom>
        Quiz Game
      </Typography>

    
      <LinearProgress
        variant="determinate"
        value={(currentQuestion / questions.length) * 100}
        sx={{ height: 10, borderRadius: 5, mb: 3 }}
      />

      {currentQuestion < questions.length ? (
        <Card sx={{ boxShadow: 3, borderRadius: 3, p: 3 }}>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              {questions[currentQuestion].question}
            </Typography>

            <Timer timeLimit={30} />

            <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
              {questions[currentQuestion].options.map((option, index) => (
                <Button
                  key={index}
                  variant="contained"
                  color={selectedAnswer ? (option === questions[currentQuestion].correct ? "success" : "error") : "primary"}
                  onClick={() => handleAnswer(option)}
                  sx={{ textTransform: "none", fontSize: "16px", fontWeight: "bold" }}
                  disabled={selectedAnswer !== null}
                  startIcon={
                    selectedAnswer ? (
                      option === questions[currentQuestion].correct ? <CheckCircle /> : <Cancel />
                    ) : null
                  }
                >
                  {option}
                </Button>
              ))}
            </Box>

            {selectedAnswer && (
              <Box mt={2} p={2} sx={{ bgcolor: "#f5f5f5", borderRadius: 2 }}>
                <Typography variant="subtitle1" fontWeight="bold">
                   AI Explanation:
                </Typography>
                {loadingExplanation ? (
                  <CircularProgress size={24} />
                ) : (
                  <Typography variant="body1">{explanation}</Typography>
                )}
              </Box>
            )}
          </CardContent>
        </Card>
      ) : (
        <Card sx={{ boxShadow: 3, borderRadius: 3, p: 3, textAlign: "center" }}>
          <CardContent>
            <Typography variant="h4" gutterBottom>
              Quiz Completed! 🎉
            </Typography>
            <Typography variant="h5" sx={{ mb: 3 }}>
              Your Score: {score} / {questions.length}
            </Typography>
            <Button variant="contained" color="primary" onClick={saveAttempt} sx={{ fontSize: "16px" }}>
              Save Attempt
            </Button>
          </CardContent>
        </Card>
      )}
    </Box>
  );
}
