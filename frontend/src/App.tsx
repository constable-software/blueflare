import { BrowserRouter, Routes, Route } from "react-router-dom";
import Search from "./pages/Search";
import Map from "./pages/Map";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Search />} />
        <Route path="/map" element={<Map />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
