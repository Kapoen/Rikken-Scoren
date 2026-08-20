import './App.css'
import {BrowserRouter, Route, Routes} from "react-router";
import HomePage from "./pages/HomePage.tsx";

function App() {
  return (
      <BrowserRouter basename="/rikken-scoren">
          <Routes>
              <Route path="/" element={<HomePage />} />
          </Routes>
      </BrowserRouter>
  );
}

export default App
