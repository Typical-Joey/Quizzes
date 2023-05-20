import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentQuiz: {
    quiz: {
      Title: "",
      Questions: [],
    },
    correctAnswers: 0,
    currentQuestion: 0,
  },
};

export const activeQuizSlice = createSlice({
  name: "activeQuiz",
  initialState,
  reducers: {
    setActiveQuiz: (state, action) => {
      console.log("Payload: ", action.payload);
      state.currentQuiz.quiz = action.payload;
    },
    addCorrectAnswer: (state) => {
      state.currentQuiz.correctAnswers += 1;
    },
    nextQuestion: (state) => {
      if (
        state.currentQuiz.currentQuestion !==
        state.currentQuiz.quiz.Questions.length
      ) {
        state.currentQuiz.currentQuestion += 1;
      }
    },
    previousQuestion: (state) => {
      if (state.currentQuiz.currentQuestion > 0) {
        state.currentQuiz.currentQuestion -= 1;
      }
    },
  },
});

export const {
  setActiveQuiz,
  addCorrectAnswer,
  nextQuestion,
  previousQuestion,
} = activeQuizSlice.actions;

export default activeQuizSlice.reducer;
