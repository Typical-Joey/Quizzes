import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setQuestionTitle,
  setQuestionCorrectAnswer,
} from "../../redux/quizCreationSlice";
import { Button, Form } from "react-bootstrap";

export default function FillInTheBlankEditor({ index }) {
  const dispatch = useDispatch();
  const currentQuestionState = useSelector(
    (state) =>
      state.quizCreation.quiz.questions[
        state.quizCreation.quiz.questions.findIndex(
          (questions) => questions.index === index
        )
      ]
  );

  function handleQuestionTitle(title) {
    dispatch(setQuestionTitle({ index, title }));
  }

  function handleCorrectAnswer(answer) {
    dispatch(setQuestionCorrectAnswer({ index, answer }));
  }

  return (
    <>
      <h3>Question</h3>
      <Form.Control
        type="text"
        placeholder="Enter Question"
        value={currentQuestionState.questionTitle}
        onChange={(e) => handleQuestionTitle(e.target.value)}
      />

      <Button
        variant="dark"
        onClick={() =>
          handleQuestionTitle(currentQuestionState.questionTitle + "_")
        }
      >
        Add Blank
      </Button>

      <h3>Correct Answer</h3>
      <Form.Control
        type="text"
        name=""
        placeholder="Enter The Correct Answer"
        value={currentQuestionState.correctAnswer}
        onChange={(e) => handleCorrectAnswer(e.target.value)}
      />
    </>
  );
}
