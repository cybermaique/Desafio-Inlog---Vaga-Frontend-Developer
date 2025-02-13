import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "../pages/home";
import { TruckList } from "../pages/truck-list";

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/caminhoes" element={<TruckList />} />
      </Routes>
    </BrowserRouter>
  );
}
