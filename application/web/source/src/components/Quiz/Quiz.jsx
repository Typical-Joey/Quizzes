import { Container, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import MultipleChoiceQuestion from "./MultipleChoiceQuestion";
import FillIntheBlankQuestion from "./FillIntheBlankQuestion";
import { getQuizById } from "../../service/quiz/QuizService";
import "./quiz.css";
import QuizCompletion from "./QuizCompletion";

export default function Quiz() {
  const { quizId } = useParams();
  const [isOver, setIsOver] = useState(false);
  const [answersArray, setAnswersArray] = useState([]);
  const [currentQuiz, setCurrentQuiz] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [numCorrectAnswers, setNumCorrectAnswers] = useState(0);

  function nextQuestion() {
    if (currentQuestion !== currentQuiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setIsOver(true);
      calculateTotalCorrectAnswers();
    }
  }

  function calculateTotalCorrectAnswers() {
    for (let i = 0; i < currentQuiz.questions.length; i++) {
      if (
        isCorrectAnswer(currentQuiz.questions[i].correctAnswer, answersArray[i])
      ) {
        setNumCorrectAnswers((prevNumber) => prevNumber + 1);
      }
    }
  }

  function previousQuestion() {
    if (currentQuestion !== 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  }

  function handleSelectedAnswer(chosenAnswer) {
    const newArray = [...answersArray];
    newArray[currentQuestion] = chosenAnswer;
    setAnswersArray(newArray);
  }

  function formatAnswer(answer) {
    return answer === undefined ? "" : answer.trim().toLowerCase();
  }

  function isCorrectAnswer(correctAnswer, selectedAnswer) {
    return formatAnswer(correctAnswer) === formatAnswer(selectedAnswer);
  }

  useEffect(() => {
    async function getQuiz() {
      const quiz = await getQuizById(quizId);
      setCurrentQuiz(quiz);
    }
    getQuiz();
  }, [quizId]);

  return (
    <Container className="quiz-container">
      <div>
        {currentQuiz !== null && !isOver && (
          <div>
            <h1 className="quiz-title">
              {currentQuiz.title} ( {currentQuestion + 1} /{" "}
              {currentQuiz.questions.length} )
            </h1>

            {currentQuiz.questions[currentQuestion].answers.length !== 0 ? (
              <MultipleChoiceQuestion
                question={currentQuiz.questions[currentQuestion]}
                onSelectAnswer={handleSelectedAnswer}
                currentSelectedAnswer={answersArray[currentQuestion]}
              />
            ) : (
              <FillIntheBlankQuestion
                question={currentQuiz.questions[currentQuestion]}
                onSelectAnswer={handleSelectedAnswer}
                currentSelectedAnswer={answersArray[currentQuestion]}
              />
            )}
            <div className="question-button-container">
              <Button variant="dark" onClick={previousQuestion}>
                Previous Question
              </Button>
              <Button variant="dark" onClick={nextQuestion}>
                Next Question
              </Button>
            </div>
          </div>
        )}
        {isOver && (
          <QuizCompletion
            numCorrectAnswers={numCorrectAnswers}
            totalQuestions={currentQuiz.questions.length}
          />
        )}
      </div>
    </Container>
  );
}
