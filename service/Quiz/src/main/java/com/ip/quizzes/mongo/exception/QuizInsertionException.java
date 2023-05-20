package com.ip.quizzes.mongo.exception;


public class QuizInsertionException extends RuntimeException {
    public QuizInsertionException(String error) {
        super(error);
    }
}
