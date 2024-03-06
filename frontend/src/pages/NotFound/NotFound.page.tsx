import { Container, Typography, Box } from "@mui/material";

const NotFoundPage: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Typography
          variant="h2"
          fontWeight="bold"
          color="primary"
          lineHeight="1"
          fontSize="2em"
        >
          404 - Not Found
        </Typography>
      </Box>
    </Container>
  );
};

export default NotFoundPage;
