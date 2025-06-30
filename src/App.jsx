import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./pages/Home/Home";
import AddGame from "./pages/AddGame/AddGame";
import GameDetails from "./pages/GameDetails/GameDetails";
import ImportGame from "./pages/ImportGame/ImportGame";
import NotFound from "./pages/NotFound/NotFound";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/add" element={<AddGame />} />
          <Route path="/game/:id" element={<GameDetails />} />
          <Route path="/import" element={<ImportGame />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
