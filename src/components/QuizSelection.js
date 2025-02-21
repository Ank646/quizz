import React from "react";
import { Button, Typography, Box } from "@mui/material";

export default function QuizSelection({ quizzes, startQuiz }) {
  return (
    <Box textAlign="center" mt={4}>
      <Typography variant="h5">Select a Quiz</Typography>
      {quizzes.map((quiz, index) => (
        <Button key={index} variant="contained" sx={{ mt: 2, mx: 1 }} onClick={() => startQuiz(quiz)}>
          {quiz.title}
        </Button>
      ))}
    </Box>
  );
}
