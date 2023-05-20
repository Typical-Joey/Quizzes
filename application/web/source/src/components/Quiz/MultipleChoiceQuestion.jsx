import React from "react";
import { Form } from "react-bootstrap";

export default function MultipleChoiceQuestion({
  question,
  onSelectAnswer,
  currentSelectedAnswer,
}) {
  function handleAnswerSelection(answer) {
    onSelectAnswer(answer);
  }

  return (
    <Form>
      <h3>{question.title}</h3>
      {question.answers.map((answer, index) => {
        return (
          <div key={index}>
            <Form.Check
              id={`question-${index}`}
              value={answer}
              type="radio"
              name="answer"
              checked={currentSelectedAnswer === answer}
              onChange={(e) => handleAnswerSelection(e.target.value)}
              label={answer}
            />
          </div>
        );
      })}
    </Form>
  );
}
