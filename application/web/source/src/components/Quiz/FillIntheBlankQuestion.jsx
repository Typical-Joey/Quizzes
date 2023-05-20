import React from "react";
import { Form } from "react-bootstrap";

export default function FillIntheBlankQuestion({
  question,
  onSelectAnswer,
  currentSelectedAnswer,
}) {
  function handleAnswerSelection(answer) {
    onSelectAnswer(answer);
  }

  function formatElement(text) {
    const textArray = text.split("");
    const formatedArray = [];
    for (let i = 0; i < textArray.length; i++) {
      textArray[i] === "_"
        ? formatedArray.push(
            <input
              key={i}
              type="text"
              value={
                currentSelectedAnswer === undefined ? "" : currentSelectedAnswer
              }
              onChange={(e) => handleAnswerSelection(e.target.value)}
            />
          )
        : formatedArray.push(textArray[i]);
    }
    return formatedArray;
  }

  return (
    <Form>
      <h3>{formatElement(question.title)}</h3>
      {!question.title.includes("_") && (
        <Form.Control
          key={1}
          type="text"
          value={
            currentSelectedAnswer === undefined ? "" : currentSelectedAnswer
          }
          onChange={(e) => handleAnswerSelection(e.target.value)}
        />
      )}
    </Form>
  );
}
