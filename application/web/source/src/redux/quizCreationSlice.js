import { createSlice } from "@reduxjs/toolkit";

const MULTIPLE_CHOICE = "multiple-choice";
const FILL_IN_THE_BLANK = "fill-in-blank";

const initialState = {
  quiz: {
    title: "",
    questions: [
      {
        index: 0,
        questionType: "",
        questionTitle: "",
        correctAnswer: "",
        answerChoices: [],
      },
    ],
  },
};

function formattedQuizQuestions(quizQuestions) {
  const formattedQuestions = [];
  quizQuestions.forEach((question, index) => {
    formattedQuestions.push({
      index,
      questionType:
        question.answers.length === 0 ? FILL_IN_THE_BLANK : MULTIPLE_CHOICE,
      questionTitle: question.title,
      correctAnswer: question.correctAnswer,
      answerChoices: question.answers,
    });
  });
  return formattedQuestions;
}

export const quizCreationSlice = createSlice({
  name: "quizCreation",
  initialState,
  reducers: {
    setQuiz: (state, action) => {
      state.quiz.title = action.payload.quiz.title;
      state.quiz.questions = formattedQuizQuestions(
        action.payload.quiz.questions
      );
    },
    updateTitle: (state, action) => {
      state.quiz.title = action.payload;
    },
    addQuestion: (state, action) => {
      state.quiz.questions.push(action.payload);
    },
    removeQuestion: (state, action) => {
      const index = state.quiz.questions.findIndex(
        (question) => question.index === action.payload
      );
      state.quiz.questions.splice(index, 1);
    },
    setQuestionType: (state, action) => {
      const index = state.quiz.questions.findIndex(
        (question) => question.index === action.payload.index
      );
      state.quiz.questions[index].questionType = action.payload.questionType;
    },
    setQuestionTitle: (state, action) => {
      state.quiz.questions[action.payload.index].questionTitle =
        action.payload.title;
    },
    setQuestionAnswer: (state, action) => {
      state.quiz.questions[action.payload.index].answerChoices[
        action.payload.answerIndex
      ] = action.payload.answer;
    },
    addQuestionAnswer: (state, action) => {
      state.quiz.questions[action.payload].answerChoices.push("");
    },
    removeQuestionAnswer: (state, action) => {
      state.quiz.questions[action.payload.index].answerChoices.splice(
        action.payload.answerIndex,
        1
      );
    },
    setQuestionCorrectAnswer: (state, action) => {
      state.quiz.questions[action.payload.index].correctAnswer =
        action.payload.answer;
    },
  },
});

export const {
  updateTitle,
  addQuestion,
  removeQuestion,
  setQuestionType,
  setQuestionTitle,
  setQuestionAnswer,
  addQuestionAnswer,
  removeQuestionAnswer,
  setQuestionCorrectAnswer,
  setQuiz,
} = quizCreationSlice.actions;

export default quizCreationSlice.reducer;
