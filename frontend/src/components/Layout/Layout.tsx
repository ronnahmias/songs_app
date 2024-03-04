import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Header from "../Header/Header";

const Layout: React.FC = () => {
  return (
    <>
      <Header />
      <Box
        sx={{
          py: 3,
        }}
      >
        <Outlet />
      </Box>
    </>
  );
};

export default Layout;
