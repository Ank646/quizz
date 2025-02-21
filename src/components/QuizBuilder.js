import React, { useState } from "react";
import { Button, TextField, Box, Typography } from "@mui/material";

export default function QuizBuilder({ addQuiz }) {
  const [quizTitle, setQuizTitle] = useState("");
  const [questions, setQuestions] = useState([]);

  const addQuestion = () => {
    setQuestions([...questions, { question: "", options: ["", "", "", ""], correct: "" }]);
  };

  const handleSubmit = () => {
    addQuiz({ title: quizTitle, questions });
    setQuizTitle("");
    setQuestions([]);
  };

  return (
    <Box mt={4}>
      <Typography variant="h5">Create a Custom Quiz</Typography>
      <TextField
        label="Quiz Title"
        fullWidth
        sx={{ mt: 2 }}
        value={quizTitle}
        onChange={(e) => setQuizTitle(e.target.value)}
      />
      {questions.map((q, index) => (
        <Box key={index} mt={2}>
          <TextField
            label={`Question ${index + 1}`}
            fullWidth
            value={q.question}
            onChange={(e) => {
              const newQuestions = [...questions];
              newQuestions[index].question = e.target.value;
              setQuestions(newQuestions);
            }}
          />
        </Box>
      ))}
      <Button variant="outlined" sx={{ mt: 2 }} onClick={addQuestion}>
        Add Question
      </Button>
      <Button variant="contained" sx={{ mt: 2, ml: 2 }} onClick={handleSubmit}>
        Save Quiz
      </Button>
    </Box>
  );
}
