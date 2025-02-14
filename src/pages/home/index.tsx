import { Box } from "@mui/material";
import HomeImage from "../../assets/images/home.svg";
import PageHeader from "../../components/page-header";

const Home = () => {
  return (
    <Box display="flex" flexDirection="column" gap={2} padding="20px 24px">
      <PageHeader
        title="Boas-vindas, Alexandre Borges!"
        subtitle="Aqui, você pode visualizar e cadastrar caminhões, além de acompanhar suas localizações no mapa."
      />
      <Box display="flex" justifyContent="center">
        <img src={HomeImage} alt="Home Image" />
      </Box>
    </Box>
  );
};

export default Home;
