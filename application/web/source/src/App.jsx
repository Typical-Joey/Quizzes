import { BrowserRouter, Routes, Route } from "react-router-dom";
import ErrorInvalidUrl from "./components/Error/ErrorInvalidUrl";
import QuizEditor from "./components/CreateQuiz/QuizEditor";
import NavbarComponent from "./components/Navbar/Navbar";
import Homepage from "./components/HomePage/Homepage";
import Quiz from "./components/Quiz/Quiz";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <>
      <NavbarComponent />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/admin" element={<Homepage isAdmin={true} />} />
          <Route
            path="/quiz-editor/create"
            element={<QuizEditor mode="create" />}
          />
          <Route
            path="/quiz-editor/edit/:quiz_id?"
            element={<QuizEditor mode="edit" />}
          />
          <Route path="quiz/:quizId" element={<Quiz />} />
          <Route path="*" element={<ErrorInvalidUrl />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
