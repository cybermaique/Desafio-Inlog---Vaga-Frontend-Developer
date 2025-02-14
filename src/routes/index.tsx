import { HomeOutlined, LocalShipping } from "@mui/icons-material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import AddTruck from "../pages/add-truck/index";
import Home from "../pages/home";
import ListTruck from "../pages/list-truck";
import NotFound from "../pages/not-found";

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
    element: <ListTruck />,
  },
  {
    path: "/caminhoes/cadastrar",
    title: "Cadastrar Caminhão",
    icon: <AddRoundedIcon />,
    element: <AddTruck />,
  },
  {
    path: "*",
    title: "Página Não Encontrada",
    element: <NotFound />,
  },
];
