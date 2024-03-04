import { AppBar } from "@mui/material";

const Header: React.FC = () => {
  return (
    <AppBar
      position="fixed"
      elevation={6}
      sx={{
        backgroundColor: "#fff",
        top: 0,
        left: 0,
        zIndex: 999,
      }}
    >
      app
    </AppBar>
  );
};

export default Header;
