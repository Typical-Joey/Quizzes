import React from "react";
import { Button, Modal } from "react-bootstrap";
import "./popup.css";

export default function WarningPopup({ show, onYes, onNo, title }) {
  return (
    <Modal size="md" show={show} className="warning-popup-container" centered>
      <div className="warning-popup">
        <Modal.Title className="warning-title">
          {title || "Are you sure you want to delete this?"}
        </Modal.Title>
        <Modal.Body className="confirmation-buttons">
          <Button
            variant="outline-success"
            className="confirm-button"
            size="lg"
            onClick={onYes}
          >
            Yes
          </Button>
          <Button
            variant="outline-danger"
            className="deny-button"
            size="lg"
            onClick={onNo}
          >
            No
          </Button>
        </Modal.Body>
      </div>
    </Modal>
  );
}
