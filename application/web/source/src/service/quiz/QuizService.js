import axios from "axios";

const BASE_URL = "http://localhost:8080/api/v1/quizzes/";
const QUIZ_ENDPOINT = "quiz";
const API_URL = BASE_URL + QUIZ_ENDPOINT;

export async function getQuizById(quizId) {
  try {
    const response = await axios.get(`${API_URL}/${quizId}`);
    return response.data;
  } catch (error) {
    console.error(error);
    return error;
  }
}

export async function getQuizData() {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error(error);
    return error;
  }
}

function formatQuiz(quiz) {
  const formattedQuestionsArray = [];

  for (let i = 0; i < quiz.questions.length; i++) {
    formattedQuestionsArray.push({
      title: quiz.questions[i].questionTitle,
      answers: quiz.questions[i].answerChoices,
      correctAnswer: quiz.questions[i].correctAnswer,
    });
  }

  const quizObject = {
    title: quiz.title,
    questions: formattedQuestionsArray,
  };
  return quizObject;
}

export async function addQuiz(quiz) {
  try {
    return await axios.post(API_URL, formatQuiz(quiz));
  } catch (error) {
    console.error(error);
    return error;
  }
}

export async function deleteQuiz(quizId) {
  try {
    return await axios.delete(`${API_URL}/delete/${quizId}`);
  } catch (error) {
    console.error(error);
    return error;
  }
}

export async function editQuiz(quizId, newQuiz) {
  const formattedQuiz = formatQuiz(newQuiz);
  try {
    return await axios.put(`${API_URL}/${quizId}`, {
      title: formattedQuiz.title,
      questions: formattedQuiz.questions,
    });
  } catch (error) {
    console.error(error);
    return error;
  }
}
