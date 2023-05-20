import React from "react";
import { Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function QuizCompletion({ numCorrectAnswers, totalQuestions }) {
  const navigate = useNavigate();
  return (
    <Container className="quiz-completion-container">
      <h1>Congratulations on completing your quiz!</h1>
      <h2>
        Total Correct: {numCorrectAnswers} / {totalQuestions}
      </h2>
      <Button variant="dark" onClick={() => navigate("/")}>
        Return Home
      </Button>
    </Container>
  );
}
