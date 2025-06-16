import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import AddGame from "./pages/AddGame/AddGame";
import GameDetails from "./pages/GameDetails/GameDetails";
import Navbar from "./components/Navbar/Navbar";
import ImportGame from "./pages/ImportGame/ImportGame";
import NotFound from "./pages/NotFound/NotFound";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/add" element={<AddGame />} />
        <Route path="/game/:id" element={<GameDetails />} />
        <Route path="/import" element={<ImportGame />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;