import React from "react";

export default function QuizCreationResponsePopup({ show, statusCode }) {
  const isSuccessful = statusCode === 200 || statusCode === 201 ? true : false;
  return (
    <div
      className={`${show ? "" : "hide"} response-popup ${
        isSuccessful ? "success" : "failure"
      }-response slideInLeft`}
    >
      {statusCode === 201 && <h5>Quiz Added Successfully</h5>}
      {statusCode === 200 && <h5>Quiz Updated Successfully</h5>}
      {statusCode === 409 && <h5>Quiz Name Already Taken</h5>}
      {statusCode !== 409 && statusCode >= 400 && (
        <h5>Something went wrong, please try again</h5>
      )}
    </div>
  );
}
