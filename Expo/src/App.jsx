import "./App.css";
import Roulette from "./Components/Roulette";
import Presentacion from "./Components/Presentacion";
import { Routes, Route } from 'react-router-dom';
import Navigation from "./Components/Navigation";

const App = () => {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<Presentacion />} />
        <Route path="/roulette" element={<Roulette />} />
      </Routes>
    </>
  );
};

export default App;
