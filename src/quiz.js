import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useIndexedDB } from "react-indexed-db-hook";

const quizData = [
  {
    question: "What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris", "Rome"],
    correct: 2,
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Venus"],
    correct: 1,
  },
];

const QuizApp = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [history, setHistory] = useState([]);
  const [timer, setTimer] = useState(30);
  const { add, getAll } = useIndexedDB("quizHistory");

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [currentQuestion]);

  useEffect(() => {
    getAll().then((data) => setHistory(data));
  }, []);

  const handleAnswer = (index) => {
    setSelectedOption(index);
    if (index === quizData[currentQuestion].correct) {
      setScore(score + 1);
    }
    setTimeout(() => {
      setSelectedOption(null);
      setTimer(30);
      if (currentQuestion < quizData.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        add({ date: new Date(), score }).then(() => {
          getAll().then(setHistory);
        });
      }
    }, 1000);
  };

  return (
    <div className="flex flex-col items-center p-6">
      <h1 className="text-2xl font-bold">Interactive Quiz Platform</h1>
      {currentQuestion < quizData.length ? (
        <Card className="w-96 p-4 mt-4">
          <CardContent>
            <h2 className="text-lg font-semibold">{quizData[currentQuestion].question}</h2>
            <Progress value={(timer / 30) * 100} className="mt-2" />
            <ul className="mt-4">
              {quizData[currentQuestion].options.map((option, index) => (
                <li
                  key={index}
                  className={`p-2 cursor-pointer border rounded-md mt-2 ${
                    selectedOption !== null &&
                    (index === quizData[currentQuestion].correct
                      ? "bg-green-300"
                      : selectedOption === index
                      ? "bg-red-300"
                      : "")
                  }`}
                  onClick={() => handleAnswer(index)}
                >
                  {option}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      ) : (
        <div className="mt-6 text-center">
          <h2 className="text-xl font-bold">Quiz Completed!</h2>
          <p>Your Score: {score} / {quizData.length}</p>
          <Button className="mt-4" onClick={() => setCurrentQuestion(0)}>
            Retry Quiz
          </Button>
          <h3 className="mt-6 text-lg">Attempt History:</h3>
          <ul>
            {history.map((item, index) => (
              <li key={index}>{new Date(item.date).toLocaleString()} - Score: {item.score}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
