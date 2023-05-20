import { configureStore } from "@reduxjs/toolkit";
import quizCreationReducer from "./quizCreationSlice.js";
import activeQuizReducer from "./activeQuizSlice.js";
// import reduxLogger from "redux-logger";

// const logger = reduxLogger.createLogger();

export const store = configureStore({
  reducer: {
    quizCreation: quizCreationReducer,
    activeQuiz: activeQuizReducer,
  },
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
