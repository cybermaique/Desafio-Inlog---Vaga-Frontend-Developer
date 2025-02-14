import { Box, Typography } from "@mui/material";

interface PageHeaderProps {
  title: string;
  subtitle: string;
}

const PageHeader = ({ title, subtitle }: PageHeaderProps) => (
  <Box display="flex" flexDirection="column" gap={1.75} mt={2}>
    <Typography variant={"h5"} fontWeight="bold">
      {title}
    </Typography>
    <Typography variant={"subtitle1"}>{subtitle}</Typography>
  </Box>
);

export default PageHeader;
