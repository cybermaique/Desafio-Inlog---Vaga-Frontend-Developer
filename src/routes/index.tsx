import { HomeOutlined, LocalShipping } from "@mui/icons-material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import AddTruck from "../pages/add-truck";
import Home from "../pages/home";
import TruckList from "../pages/truck-list";

export const routes = [
  {
    path: "/",
    title: "Página inicial",
    icon: <HomeOutlined />,
    element: <Home />,
  },
  {
    path: "/caminhoes/listar",
    title: "Listagem de Caminhões",
    icon: <LocalShipping />,
    element: <TruckList />,
  },
  {
    path: "/caminhoes/adicionar",
    title: "Adicionar Caminhão",
    icon: <AddRoundedIcon />,
    element: <AddTruck />,
  },
];
