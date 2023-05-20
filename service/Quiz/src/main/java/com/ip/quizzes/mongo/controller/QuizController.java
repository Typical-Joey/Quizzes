package com.ip.quizzes.mongo.controller;

import com.ip.quizzes.mongo.model.Quiz;
import com.ip.quizzes.mongo.model.ServiceResponse;
import com.ip.quizzes.mongo.service.QuizServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/v1/quizzes")
public class QuizController {

    @Autowired
    private QuizServiceImpl quizServiceImpl;

    @GetMapping("/quiz")
    public List<Quiz> getAllQuizzes() {
        return quizServiceImpl.getAllQuizzes();
    }

    @GetMapping("/quiz/{quizId}")
    public Optional<Quiz> getQuiz(@PathVariable String quizId) {
        return quizServiceImpl.getQuiz(quizId);
    }

    @PostMapping("/quiz")
    public ResponseEntity<ServiceResponse> addQuiz(@RequestBody Quiz quiz) {
        return quizServiceImpl.addQuiz(quiz);
    }

    @DeleteMapping("/quiz/delete/{quizId}")
    public ResponseEntity<ServiceResponse> deleteQuiz(@PathVariable String quizId) {
        return quizServiceImpl.deleteQuizById(quizId);
    }

    @PutMapping("/quiz/{quizId}")
    public ResponseEntity<ServiceResponse> updateQuiz(@PathVariable String quizId, @RequestBody Quiz updatedQuiz) {
        return quizServiceImpl.updateQuiz(quizId, updatedQuiz);
    }
}
