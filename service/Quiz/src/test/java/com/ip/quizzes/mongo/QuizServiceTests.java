package com.ip.quizzes.mongo;

import com.ip.quizzes.mongo.model.Question;
import com.ip.quizzes.mongo.model.Quiz;
import com.ip.quizzes.mongo.model.ServiceResponse;
import com.ip.quizzes.mongo.repository.QuizRepository;
import com.ip.quizzes.mongo.service.QuizServiceImpl;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;

@SpringBootTest(classes = {QuizServiceTests.class})
public class QuizServiceTests {
    @Mock
    QuizRepository repository;
    @InjectMocks
    QuizServiceImpl service;

    private static Quiz getQuiz() {
        List<String> question1AnswerChoices = new ArrayList<>();
        question1AnswerChoices.add("Hello");
        question1AnswerChoices.add("World");
        Question question1 = new Question("Test Question 1", question1AnswerChoices, "Hello");
        List<Question> questionsList = new ArrayList<>();
        questionsList.add(question1);
        return new Quiz("Test Quiz", questionsList);
    }

    private static List<Quiz> getQuizList() {
        List<Quiz> quizList = new ArrayList<>();
        quizList.add(getQuiz());
        return quizList;
    }

    @Test
    public void getQuizTest() {
        when(repository.findAll()).thenReturn(getQuizList());
        String expected = "Test Quiz";
        List<Quiz> allQuizzes = service.getAllQuizzes();
        String actual = allQuizzes.get(0).getTitle();
        Assertions.assertEquals(expected, actual);
    }

    @Test
    public void getQuizById() {
        String quizId = "123";
        when(repository.findById(anyString())).thenReturn(Optional.of(getQuiz()));
        Optional<Quiz> expected = Optional.of(getQuiz());
        Optional<Quiz> actual = service.getQuiz(quizId);
        Assertions.assertEquals(expected, actual);
    }

    @Test
    public void testAddQuiz() {
        when(repository.insert(any(Quiz.class))).thenReturn(getQuiz());
        ResponseEntity<ServiceResponse> actual = service.addQuiz(getQuiz());
        ResponseEntity<ServiceResponse> expected = new ResponseEntity<>(new ServiceResponse("Quiz Added Successfully"), HttpStatus.CREATED);
        Assertions.assertEquals(expected.getStatusCodeValue(), actual.getStatusCodeValue());
    }

    @Test
    public void testSuccessfulQuizUpdate() {
        when(repository.findById(anyString())).thenReturn(Optional.of(getQuiz()));
        int expected = new ResponseEntity<>(new ServiceResponse(""), HttpStatus.OK).getStatusCodeValue();
        int actual = service.updateQuiz(anyString(), getQuiz()).getStatusCodeValue();
        Assertions.assertEquals(expected, actual);
    }

    @Test
    public void testQuizNotFoundWhenUpdating() {
        when(repository.findById(anyString())).thenReturn(Optional.empty());
        int expected = 404;
        int actual = service.updateQuiz(anyString(), getQuiz()).getStatusCodeValue();
        Assertions.assertEquals(expected, actual);
    }

    @Test
    public void testQuizDeleteById() {
        when(repository.existsById(anyString())).thenReturn(true);
        int expected = 200;
        int actual = service.deleteQuizById(anyString()).getStatusCodeValue();
        Assertions.assertEquals(expected, actual);
    }

    @Test
    public void testQuizNotFoundWhenDeleting(){
        when(repository.existsById(anyString())).thenReturn(false);
        int expected = 404;
        int actual = service.deleteQuizById(anyString()).getStatusCodeValue();
        Assertions.assertEquals(expected, actual);
    }
}
