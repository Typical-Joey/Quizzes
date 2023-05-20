import React, { useState } from "react";
import { Form } from "react-bootstrap";
import MultipleChoiceEditor from "./MultipleChoiceEditor";
import FillInTheBlankEditor from "./FillInTheBlankEditor";
import { useDispatch } from "react-redux";
import { removeQuestion } from "../../redux/quizCreationSlice";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import WarningPopup from "../Popups/WarningPopup";

export default function Question({
  index,
  questionType,
  onRadioButtonSelection,
}) {
  const [showWarningPopup, setShowWarningPopup] = useState(false);
  const MULTIPLE_CHOICE = "multiple-choice";
  const FILL_IN_THE_BLANK = "fill-in-blank";

  const dispatch = useDispatch();

  function handleRadioButton(index, target) {
    onRadioButtonSelection(index, target);
  }

  return (
    <div className="question-container" index={index}>
      <WarningPopup
        show={showWarningPopup}
        onYes={() => dispatch(removeQuestion(index))}
        onNo={() => setShowWarningPopup(false)}
      />
      <IconButton
        className="remove-question-button"
        onClick={() => setShowWarningPopup(true)}
        children={<CloseIcon className="remove-question-button-icon" />}
      />
      <h2>What Type Of Question Is This?</h2>
      <div id="question-options" className="question-options">
        <div className="quiz-choice">
          <Form.Check
            id={`multiple-choice-type-${index}`}
            value={MULTIPLE_CHOICE}
            type="radio"
            name={`question-type-multiple-choice-${index}`}
            onChange={(e) => handleRadioButton(index, e.target.value)}
            checked={questionType === MULTIPLE_CHOICE}
            label="Multiple Choice"
          />
        </div>

        <div className="quiz-choice">
          <Form.Check
            id={`fill-in-blank-type-${index}`}
            value={FILL_IN_THE_BLANK}
            type="radio"
            name={`question-type-fill-blank-${index}`}
            onChange={(e) => handleRadioButton(index, e.target.value)}
            checked={questionType === FILL_IN_THE_BLANK}
            label="Fill In The Blank"
          />
        </div>
      </div>
      <div className="question-type-container">
        {questionType === MULTIPLE_CHOICE && (
          <div>
            <MultipleChoiceEditor index={index} />
          </div>
        )}
        {questionType === FILL_IN_THE_BLANK && (
          <div>
            <FillInTheBlankEditor index={index} />
          </div>
        )}
      </div>
    </div>
  );
}
