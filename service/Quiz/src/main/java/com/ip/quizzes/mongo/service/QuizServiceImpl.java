package com.ip.quizzes.mongo.service;

import com.ip.quizzes.mongo.exception.QuizInsertionException;
import com.ip.quizzes.mongo.model.Quiz;
import com.ip.quizzes.mongo.model.ServiceResponse;
import com.ip.quizzes.mongo.repository.QuizRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class QuizServiceImpl implements QuizService {

    @Autowired
    private QuizRepository repository;

    @Override
    public List<Quiz> getAllQuizzes() {
        return repository.findAll();
    }

    @Override
    public Optional<Quiz> getQuiz(String quizId) {
        return repository.findById(quizId);
    }

    @Override
    public ResponseEntity<ServiceResponse> addQuiz(Quiz quiz) {
        try {
            repository.insert(quiz);
        } catch (Exception e) {
            throw new QuizInsertionException(e.getMessage());
        }
        return new ResponseEntity<>(new ServiceResponse("Quiz Added Successfully"), HttpStatus.CREATED);
    }

    @Override
    public ResponseEntity<ServiceResponse> deleteQuizById(String quizId) {
        if (!repository.existsById(quizId)) {
            return new ResponseEntity<>(new ServiceResponse(String.format("Could not find quiz id %s", quizId)), HttpStatus.NOT_FOUND);
        }
        repository.deleteById(quizId);
        return new ResponseEntity<>(new ServiceResponse("Quiz Deleted Successfully"), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<ServiceResponse> updateQuiz(String quizId, Quiz updatedQuiz) {
        Optional<Quiz> currentQuiz = repository.findById(quizId);
        if (currentQuiz.isEmpty()) {
            return new ResponseEntity<>(new ServiceResponse(String.format("Could not find quiz id %s", quizId)), HttpStatus.NOT_FOUND);
        }
        currentQuiz.ifPresent(quiz -> {
            quiz.setQuestions(updatedQuiz.getQuestions());
            quiz.setTitle(updatedQuiz.getTitle());
            repository.save(quiz);
        });
        return new ResponseEntity<>(new ServiceResponse("Quiz Updated Successfully"), HttpStatus.OK);
    }
}
