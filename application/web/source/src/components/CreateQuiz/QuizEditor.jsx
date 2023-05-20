import React, { useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import Question from "./Question";
import "./createquiz.css";
import { useDispatch, useSelector } from "react-redux";
import {
  addQuestion,
  updateTitle,
  setQuestionType,
  setQuiz,
} from "../../redux/quizCreationSlice";
import { getQuizIdParam } from "../Params/getParams";
import { addQuiz, editQuiz, getQuizById } from "../../service/quiz/QuizService";
import QuizCreationResponsePopup from "../Popups/QuizCreationResponsePopup";
import WarningPopup from "../Popups/WarningPopup";

export default function QuizEditor({ mode }) {
  const [showWarningPopup, setShowWarningPopup] = useState(false);
  const [statusCode, setStatusCode] = useState(null);
  const [showResponsePopup, setShowResponsePopup] = useState(false);
  const dispatch = useDispatch();
  const quizState = useSelector((state) => state.quizCreation.quiz);
  const quizId = getQuizIdParam();

  function handleQuestionElement() {
    dispatch(
      addQuestion({
        index:
          quizState.questions.length === 0
            ? 0
            : quizState.questions[quizState.questions.length - 1].index + 1,
        questionType: "",
        questionTitle: "",
        correctAnswer: "",
        answerChoices: [],
      })
    );
  }

  function onRadioButtonSelection(index, questionType) {
    dispatch(setQuestionType({ index, questionType }));
  }

  async function handleQuizSubmission() {
    let response;
    if (mode === "create") {
      response = await addQuiz(quizState);
    } else if (mode === "edit") {
      response = await editQuiz(quizId, quizState);
    }
    setStatusCode(
      response.status !== undefined ? response.status : response.response.status
    );
    setShowWarningPopup(false);
    setShowResponsePopup(true);
  }

  useEffect(() => {
    async function setupQuiz() {
      if (mode === "edit") {
        try {
          const quiz = await getQuizById(quizId);
          if (quiz !== null) {
            dispatch(setQuiz({ quiz }));
          }
        } catch (error) {
          throw error;
        }
      }
    }
    setupQuiz();
  }, [quizId, dispatch, mode]);

  return (
    <Container className="create-quiz-container">
      <QuizCreationResponsePopup
        show={showResponsePopup}
        statusCode={statusCode}
      />
      <WarningPopup
        show={showWarningPopup}
        onYes={handleQuizSubmission}
        onNo={() => setShowWarningPopup(false)}
        title="Are you sure you want to submit this quiz?"
      />
      <div>
        <div>
          <h1>Quiz Title</h1>
          <Form.Control
            type="text"
            placeholder="Enter Quiz Title"
            value={quizState.title}
            onChange={(e) => dispatch(updateTitle(e.target.value))}
          />
        </div>

        {quizState.questions.map((questionData) => {
          return (
            <div key={questionData.index}>
              <Question
                index={questionData.index}
                questionType={questionData.questionType}
                onRadioButtonSelection={onRadioButtonSelection}
              />
            </div>
          );
        })}
        <div className="quiz-creation-buttons">
          <Button variant="dark" onClick={handleQuestionElement}>
            Add a question
          </Button>
          <Button variant="dark" onClick={() => setShowWarningPopup(true)}>
            {mode === "create" ? "Submit Quiz" : "Finish Editing Quiz"}
          </Button>
        </div>
      </div>
    </Container>
  );
}
