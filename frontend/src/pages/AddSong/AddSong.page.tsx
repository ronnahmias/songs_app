import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import { useCreateSongV1 } from "../../libs/reactQuery/songs/songs.react-query";
import { ISongDto } from "../../interfaces/songs/song.create.dto.interface";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AddSongPage: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const {
    mutate: createSong,
    isLoading,
    error,
    isError,
    isSuccess,
  } = useCreateSongV1();
  const formik = useFormik<ISongDto>({
    initialValues: {
      name: "",
      band: "",
      year: 1900,
    },
    validationSchema: yup.object({
      name: yup.string().required("Song name is required"),
      band: yup.string().required("Band name is required"),
      year: yup
        .number()
        .required("Year is required")
        .min(1900, "Year must be greater than 1900")
        .max(
          new Date().getFullYear(),
          `Year must be less than ${new Date().getFullYear()}`
        ),
    }),

    onSubmit: async (values) => {
      try {
        console.log("submit values", values);
        await createSong(values);
      } catch (e) {
        console.log("error", e);

        const error = e as Error;
        setErrorMessage(
          typeof error?.message === "string"
            ? error.message
            : "An error occurred while adding the song"
        );
      }
    },
  });

  useEffect(() => {
    if (isError) {
      console.log("error", error);
      setErrorMessage("An error occurred while adding the song");
    }
  }, [isError, error]);

  useEffect(() => {
    if (isSuccess) {
      formik.resetForm();
      setErrorMessage(null);
      navigate("/songs", { state: { message: "Song added successfully" } });
    }
  }, [isSuccess, formik, navigate]);

  const handleFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    formik.setFieldValue(event.target.name, event.target.value);
  };
  return (
    <Container maxWidth="lg" sx={{ textAlign: "center", mt: 4 }}>
      <Typography
        variant="h2"
        fontWeight="bold"
        color="secondary.main"
        lineHeight="1"
        fontSize="2em"
      >
        Add New Song
      </Typography>
      <Box
        component="form"
        onSubmit={formik.handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: isMobile ? "100%" : "60%",
          margin: "auto",
        }}
      >
        <TextField
          placeholder="Shape of You"
          variant="outlined"
          fullWidth
          type="text"
          label="Song Name"
          name="name"
          sx={{
            mt: 4,
            "& fieldset": {
              borderRadius: "17px",
            },
          }}
          value={formik.values.name}
          onChange={handleFieldChange}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
        />
        <TextField
          placeholder="Ed Sheeran"
          variant="outlined"
          fullWidth
          type="text"
          label="Band Name"
          name="band"
          sx={{
            mt: 4,
            "& fieldset": {
              borderRadius: "17px",
            },
          }}
          value={formik.values.band}
          onChange={handleFieldChange}
          error={formik.touched.band && Boolean(formik.errors.band)}
          helperText={formik.touched.band && formik.errors.band}
        />
        <TextField
          placeholder="2017"
          variant="outlined"
          type="number"
          fullWidth
          label="Year of Release"
          name="year"
          sx={{
            mt: 4,
            "& fieldset": {
              borderRadius: "17px",
            },
          }}
          value={formik.values.year}
          onChange={handleFieldChange}
          error={formik.touched.year && Boolean(formik.errors.year)}
          helperText={formik.touched.year && formik.errors.year}
        />
        <Button
          variant="contained"
          color="primary"
          sx={{ width: "50%", my: 5 }}
          size="large"
          type="submit"
        >
          {isLoading ? (
            <CircularProgress size={22} sx={{ color: "#ffffff" }} />
          ) : (
            "Add Song"
          )}
        </Button>
        {errorMessage && (
          <Box marginBottom={"16px"}>
            <Alert severity="error">{errorMessage}</Alert>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default AddSongPage;
