import { Route, Routes } from "react-router-dom";
import { routes } from "../routes";

const AppRoutes = () => (
  <Routes>
    {routes.map(({ path, element }) => (
      <Route key={path} path={path} element={element} />
    ))}
  </Routes>
);

export default AppRoutes;
