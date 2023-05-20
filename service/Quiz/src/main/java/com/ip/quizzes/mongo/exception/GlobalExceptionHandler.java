package com.ip.quizzes.mongo.exception;

import com.ip.quizzes.mongo.model.ServiceResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(value = {QuizInsertionException.class})
    public ResponseEntity<ServiceResponse> handleQuizInsertionException(QuizInsertionException error) {
        return new ResponseEntity<>(new ServiceResponse(error.getMessage()), HttpStatus.valueOf(409));
    }
}
