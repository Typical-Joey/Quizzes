import React from "react";
import { Container } from "react-bootstrap";
import "./error.css";

export default function ErrorInvalidUrl() {
  return (
    <Container className="error-container">
      <h1>Error: Page Not Found</h1>
    </Container>
  );
}
