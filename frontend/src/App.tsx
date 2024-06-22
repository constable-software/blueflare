import { BrowserRouter, Routes, Route } from "react-router-dom";
import Search from "./pages/Search";
import Map from "./pages/DefinatelyNotThis";
import MobileMap from "./pages/MobileMap";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Search />} />
        <Route path="/map" element={<Map />} />
        <Route path="/mobilemap" element={<MobileMap />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
