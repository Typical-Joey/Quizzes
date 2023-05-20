import React from "react";
import "./createquiz.css";
import { useDispatch, useSelector } from "react-redux";
import {
  setQuestionAnswer,
  setQuestionTitle,
  addQuestionAnswer,
  removeQuestionAnswer,
  setQuestionCorrectAnswer,
} from "../../redux/quizCreationSlice";
import { Button, Form } from "react-bootstrap";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export default function MultipleChoiceEditor({ index }) {
  const dispatch = useDispatch();

  const currentQuestionState = useSelector(
    (state) =>
      state.quizCreation.quiz.questions[
        state.quizCreation.quiz.questions.findIndex(
          (questions) => questions.index === index
        )
      ]
  );

  function updateAnswer(answerIndex, answer) {
    dispatch(setQuestionAnswer({ index, answerIndex, answer }));
  }

  function updateQuestionTitle(title) {
    dispatch(setQuestionTitle({ index, title }));
  }

  return (
    <>
      <h3>Question</h3>
      <Form.Control
        id="question-title"
        className="question-title"
        type="text"
        placeholder="Enter Question Here"
        value={currentQuestionState.questionTitle}
        onChange={(e) => updateQuestionTitle(e.target.value)}
      />
      <h3>Options</h3>
      {currentQuestionState.answerChoices.map((answer, key) => {
        return (
          <div key={key} className="multiple-choice-option-container">
            <Form.Control
              type="text"
              className="margin-right-1rem"
              placeholder={`Option ${key + 1}`}
              onChange={(e) => updateAnswer(key, e.target.value)}
              value={answer}
            />
            <Form.Check
              type="radio"
              className="margin-right-1rem"
              name={`correct-${index}`}
              onClick={() => {
                dispatch(setQuestionCorrectAnswer({ index, answer }));
              }}
              label="Correct"
              defaultChecked={
                currentQuestionState.correctAnswer !== ""
                  ? currentQuestionState.correctAnswer === answer
                  : false
              }
            />
            <IconButton
              children={<DeleteIcon className="remove-option-button" />}
              value={key}
              onClick={() =>
                dispatch(removeQuestionAnswer({ index, answerIndex: key }))
              }
            />
          </div>
        );
      })}
      <Button variant="dark" onClick={() => dispatch(addQuestionAnswer(index))}>
        Add Option
      </Button>
    </>
  );
}
