import React, { useEffect, useState } from "react";
import { getQuizData } from "../../service/quiz/QuizService";
import QuizCard from "./QuizCard";
import { Container, Row } from "react-bootstrap";
import "./homepage.css";

export default function Homepage({ isAdmin }) {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    async function getQuizzes() {
      setQuizzes(await getQuizData());
    }
    getQuizzes();
  }, []);

  return (
    <Container id="homepage" className="homepage-container">
      <Row>
        {quizzes.map((quiz) => {
          return (
            <QuizCard
              key={quiz.id}
              quizId={quiz.id}
              title={quiz.title}
              questions={quiz.questions}
              isAdmin={isAdmin}
            />
          );
        })}
      </Row>
    </Container>
  );
}
