import { Box, Typography } from "@mui/material";
import NotFoundImage from "../../assets/images/not-found.svg";

const NotFound = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      gap={10}
      justifyContent="center"
      alignItems="center"
      height="100%"
    >
      <img src={NotFoundImage} alt="Not Found Image" />
      <Typography variant="h5">
        Opa, URL não encontrada! Volte para a página inicial ou tente novamente.
      </Typography>
    </Box>
  );
};

export default NotFound;
