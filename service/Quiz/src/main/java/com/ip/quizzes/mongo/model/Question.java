package com.ip.quizzes.mongo.model;

import lombok.Data;

import java.util.List;

@Data
public class Question {
    private String title;
    private List<String> answers;
    private String correctAnswer;

    public Question(String title, List<String> answers, String correctAnswer) {
        this.title = title;
        this.answers = answers;
        this.correctAnswer = correctAnswer;
    }
}
