import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import BookRecommender from "./components/BookRecommender";

export default function App (){
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BookRecommender />} />
      </Routes>
    </Router>
  );
};

