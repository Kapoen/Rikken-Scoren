import './App.css'
import {BrowserRouter, Route, Routes} from "react-router";
import HomePage from "./pages/HomePage.tsx";
import NewGamePage from "./pages/NewGamePage.tsx";
import GameHistoryPage from "./pages/GameHistoryPage.tsx";
import PlayGamePage from "./pages/PlayGamePage.tsx";

function App() {
  return (
      <BrowserRouter basename="/Rikken-Scoren">
          <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/playGame" element={<PlayGamePage />} />
              <Route path="/newGame" element={<NewGamePage />} />
              <Route path="/gameHistory" element={<GameHistoryPage />} />
          </Routes>
      </BrowserRouter>
  );
}

export default App
