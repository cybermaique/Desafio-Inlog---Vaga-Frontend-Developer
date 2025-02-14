import {
  KeyboardArrowDown,
  KeyboardArrowUp,
  Logout,
  Menu as MenuIcon,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";

import LogoImage from "../../assets/icons/logo.svg";
import { colors } from "../../styles/colors";

interface ToolbarProps {
  onClickMenu: () => void;
}

const Toolbar = ({ onClickMenu }: ToolbarProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
  };

  return (
    <Box
      alignItems="center"
      borderBottom={`4px solid ${colors.royalAzure}`}
      display="flex"
      padding="16px 52px 16px 12px"
      justifyContent="space-between"
      style={{ backgroundColor: colors.black }}
    >
      <Box alignItems="center" display="flex">
        <IconButton onClick={onClickMenu} data-testid="ToolbarButton">
          <MenuIcon style={{ color: colors.white }} />
        </IconButton>

        <Link to="/">
          <Box alignItems="center" display="flex">
            <img
              src={LogoImage}
              alt="Inlog - Soluções de rastreamento de coleta de lixo, varrição e ônibus"
            />
          </Box>
        </Link>
      </Box>

      <Box display="flex">
        <Box
          alignItems="center"
          display="flex"
          gap={1.5}
          onClick={handleClick}
          sx={{ cursor: "pointer" }}
        >
          <Avatar sx={{ bgcolor: colors.white, color: colors.black }}>A</Avatar>
          <Typography
            sx={{ color: colors.white, cursor: "pointer" }}
            variant="body2"
          >
            ALEXANDRE
          </Typography>
          {open ? (
            <KeyboardArrowUp sx={{ color: colors.white, cursor: "pointer" }} />
          ) : (
            <KeyboardArrowDown
              sx={{ color: colors.white, cursor: "pointer" }}
            />
          )}
        </Box>

        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          slotProps={{
            paper: {
              elevation: 0,
              sx: {
                mt: 2.8,
                ml: 5,
                width: 170,
                borderRadius: 1,
              },
            },
          }}
        >
          <MenuItem onClick={handleLogout}>
            <Box width="100%" display="flex" justifyContent="space-between">
              <Typography>Sair</Typography>
              <Logout fontSize="small" />
            </Box>
          </MenuItem>
        </Menu>
      </Box>
    </Box>
  );
};

export default Toolbar;
