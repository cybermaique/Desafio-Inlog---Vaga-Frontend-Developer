import { Box } from "@mui/material";
import { useState } from "react";

import Sidebar from "./sidebar";
import Toolbar from "./toolbar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <Box
      style={{
        display: "grid",
        gridTemplateRows: "max-content 1fr",
        height: "100vh",
      }}
    >
      <Toolbar onClickMenu={() => setSidebarOpen(!sidebarOpen)} />
      <Box display="grid" gridTemplateColumns="max-content 1fr">
        <Sidebar open={sidebarOpen} />
        <Box>{children}</Box>
      </Box>
    </Box>
  );
};

export default Layout;
