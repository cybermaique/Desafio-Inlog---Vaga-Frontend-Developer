import { Box, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import { routes } from "../../routes";
import { colors } from "../../styles/colors";

interface SidebarProps {
  open: boolean;
}

const Sidebar = ({ open }: SidebarProps) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      py={2.5}
      style={{
        backgroundColor: colors.white,
        borderRight: `1px solid ${colors.chineseWhite}`,
      }}
      data-testid="Sidebar"
    >
      {routes
        .filter(({ path }) => path !== "*")
        .map(({ icon, path, title }) => (
          <NavLink
            to={path}
            key={title}
            style={({ isActive }) => ({
              backgroundColor: isActive ? colors.brightGray : colors.white,
              borderLeft: `4px solid ${
                isActive ? colors.royalAzure : colors.white
              }`,
              color: colors.black,
              textDecoration: "none",
            })}
          >
            <Box
              alignItems="center"
              display="flex"
              gap={1}
              height="56px"
              padding={2}
            >
              {icon}
              {open && <Typography variant="body2">{title}</Typography>}
            </Box>
          </NavLink>
        ))}
    </Box>
  );
};

export default Sidebar;
