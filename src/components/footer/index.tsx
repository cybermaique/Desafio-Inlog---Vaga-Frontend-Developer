import { Facebook, Instagram, LinkedIn } from "@mui/icons-material";
import { Box, IconButton, Link, Typography } from "@mui/material";

const Footer = () => (
  <Box
    component="footer"
    sx={{
      backgroundColor: "#606060",
      color: "white",
      padding: "2rem",
      textAlign: "center",
      marginTop: "auto",
      width: "100%",
    }}
  >
    <Typography variant="body2">
      Grupo Inlog - TruckTracker Gestão de Caminhões
    </Typography>

    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        gap: "1rem",
        marginTop: "1rem",
      }}
    >
      <Link href="https://www.facebook.com/grupoinlog" target="_blank">
        <IconButton color="info">
          <Facebook />
        </IconButton>
      </Link>
      <Link href="https://www.instagram.com/grupoinlog/" target="_blank">
        <IconButton color="info">
          <Instagram />
        </IconButton>
      </Link>
      <Link href="https://www.linkedin.com/company/11279134/" target="_blank">
        <IconButton color="info">
          <LinkedIn />
        </IconButton>
      </Link>
    </Box>

    <Box sx={{ marginTop: "2rem" }}>
      <Typography variant="body2">
        Alameda Dr. Carlos de Carvalho, 373 – Centro
      </Typography>
      <Typography variant="body2">Curitiba – PR, 80410-180</Typography>
      <Box
        sx={{ display: "flex", justifyContent: "center", marginTop: "1rem" }}
      >
        <Typography variant="body2" sx={{ marginRight: "1rem" }}>
          Contato comercial: (41) 98753-9983
        </Typography>
        <Typography variant="body2">Demais assuntos: (41) 3281-8181</Typography>
      </Box>
    </Box>
  </Box>
);

export default Footer;
