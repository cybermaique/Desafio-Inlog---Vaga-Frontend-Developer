import { Box, Typography } from "@mui/material";
import NoResultsFound from "../../assets/images/no-results-found.svg";
import { colors } from "../../styles/colors";

const NoResults = () => (
  <Box
    display="flex"
    flexDirection="column"
    justifyContent="center"
    alignItems="center"
    padding={2.5}
    textAlign="center"
    gap={1.25}
  >
    <img src={NoResultsFound} alt="Nenhum resultado encontrado" width={200} />
    <Typography variant="h6" sx={{ color: colors.darkLiver }}>
      Nenhum caminhão encontrado
    </Typography>
    <Typography
      variant="subtitle2"
      sx={{ color: colors.darkLiver }}
      maxWidth={536}
    >
      Não encontramos caminhões disponíveis. Verifique os filtros ou tente
      novamente em alguns instantes.
    </Typography>
  </Box>
);

export default NoResults;
