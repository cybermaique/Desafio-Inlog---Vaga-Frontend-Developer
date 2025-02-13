import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Loader } from "./components/loader.tsx";
import { Home } from "./pages/home";
import { TruckList } from "./pages/truck-list";

function App() {
  return (
    <BrowserRouter>
      <Loader />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/caminhoes" element={<TruckList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
