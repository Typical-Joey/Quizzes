import React, { useState } from "react";
import { Card, Col } from "react-bootstrap";
import "./homepage.css";
import { useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import WarningPopup from "../Popups/WarningPopup";
import { deleteQuiz } from "../../service/quiz/QuizService";

export default function QuizCard({ quizId, title, questions, isAdmin }) {
  const [showWarningPopup, setShowWarningPopup] = useState(false);
  const navigate = useNavigate();

  function openQuiz() {
    navigate(`/quiz/${quizId}`);
  }

  function handleEditQuiz() {
    navigate(`/quiz-editor/edit?quiz_id=${quizId}`);
  }

  function handleDeleteQuiz() {
    deleteQuiz(quizId);
    setShowWarningPopup(false);
    window.location.reload();
  }

  return (
    <Col className="quiz-card-container" name="quiz" lg={4} md={4}>
      <WarningPopup
        show={showWarningPopup}
        onYes={() => handleDeleteQuiz(quizId)}
        onNo={() => setShowWarningPopup(false)}
      />
      <Card className="quiz-card" style={{ width: "18rem" }}>
        <div onClick={openQuiz}>
          <Card.Img variant="top" src="./images/placeholder.png" />
          <Card.Body>
            <Card.Title>{title}</Card.Title>
            <Card.Text>
              Number of Questions:{" "}
              {questions === undefined || questions === null
                ? 0
                : questions.length}
            </Card.Text>
          </Card.Body>
        </div>
        <div className={`quiz-card-button-icons ${isAdmin ? "" : "hide"}`}>
          <IconButton
            children={<EditIcon className="edit-quiz-icon" />}
            onClick={handleEditQuiz}
          />
          <IconButton
            children={<DeleteIcon className="delete-quiz-icon" />}
            onClick={() => setShowWarningPopup(true)}
          />
        </div>
      </Card>
    </Col>
  );
}
