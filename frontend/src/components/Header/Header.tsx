import { AppBar, Box, Button } from "@mui/material";
import { Link } from "react-router-dom";

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
      <Box display="flex" alignItems="center" p={2} sx={{ columnGap: "10px" }}>
        <img src="/logo.png" alt="Logo" height="50" />
        <Button component={Link} to="/" variant="outlined" size="small">
          Songs List
        </Button>
        <Button
          component={Link}
          to="/songs/new"
          variant="outlined"
          size="small"
        >
          Add Song
        </Button>
      </Box>
    </AppBar>
  );
};

export default Header;
