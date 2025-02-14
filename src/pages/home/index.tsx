import { Box, Paper, Typography } from "@mui/material";
import HomeImage from "../../assets/images/home.svg";
import PageHeader from "../../components/page-header";

const Home = () => {
  return (
    <Box display="flex" flexDirection="column" gap={2} padding="20px 24px">
      <PageHeader
        title="Boas-vindas, Alexandre Borges!"
        subtitle="Aqui, você pode visualizar e cadastrar caminhões, além de acompanhar suas localizações no mapa."
      />
      <Paper
        elevation={2}
        sx={{
          display: "flex",
          pl: 2,
          pt: 2,
          alignItems: "center",
          borderRadius: 5,
          flexWrap: "wrap",
        }}
      >
        <img
          src={HomeImage}
          alt="Home Image"
          style={{
            maxWidth: "100%",
            height: "auto",
            flexShrink: 0,
            marginRight: "16px",
          }}
        />
        <Box display="flex" flexDirection="column" gap={2} sx={{ flex: 1 }}>
          <Typography variant="h5" align="center" fontWeight={600}>
            Sistema de Cadastro e Localização de Caminhões
          </Typography>
          <Typography variant="body1" align="center">
            Caso seja seu primeiro acesso, recomendamos que inicie cadastrando
            um novo caminhão.
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default Home;
