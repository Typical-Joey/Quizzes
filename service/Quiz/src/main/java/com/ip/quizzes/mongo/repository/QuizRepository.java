package com.ip.quizzes.mongo.repository;

import com.ip.quizzes.mongo.model.Quiz;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface QuizRepository extends MongoRepository<Quiz, String> {
}
