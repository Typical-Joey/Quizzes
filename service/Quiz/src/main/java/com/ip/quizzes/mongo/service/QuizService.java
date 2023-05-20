package com.ip.quizzes.mongo.service;

import com.ip.quizzes.mongo.model.Quiz;
import com.ip.quizzes.mongo.model.ServiceResponse;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Optional;

public interface QuizService {

    List<Quiz> getAllQuizzes();

    Optional<Quiz> getQuiz(String quizId);

    ResponseEntity<ServiceResponse> addQuiz(Quiz quiz);

    ResponseEntity<ServiceResponse> deleteQuizById(String quizId);

    ResponseEntity<ServiceResponse> updateQuiz(String quizId, Quiz updatedQuiz);
}
