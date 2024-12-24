import "./App.css";
import Authors from "./component/Author";
import Game from './component/Game'
import Review from './component/Review';
import Header from "./component/Header";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Authors />} />
        <Route path="/game" element={<Game />} />
        <Route path="/review" element={<Review />} />
      </Routes>
    </div>
  );
}

export default App;
