import {
  Container,
  Box,
  Typography,
  Grid,
  CircularProgress,
  Snackbar,
  AlertProps,
  Alert,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import DataTable from "../../components/DataTable/DataTable";
import { songsListHeaders } from "./SongList.headers";
import {
  useDeleteSongV1,
  useGetSongsV1,
  useUploadSongsCsvV1,
} from "../../libs/reactQuery/songs/songs.react-query";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { ISongList } from "../../interfaces/songs/song.interface";
import { SearchTextField } from "../../components/SearchTextField/SearchTextField";
import FileUploadButton from "../../components/FileUpload/FileUpload";
import { ISongsFilters } from "../../interfaces/songs/song.filters.interface";
import RangeSlider from "../../components/RangeSilder/RangeSilder";
import AutoComplete from "../../components/AutoComplete/AutoComplete";
import { useGetBandsV1 } from "../../libs/reactQuery/bands/bands.react-query";
import { useLocation } from "react-router-dom";

interface ISnackBarSettings {
  open: boolean;
  message: string;
  severity: AlertProps["severity"];
}

const SongsListPage: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [page, setPage] = useState<number>(0);
  const [filter, setFilter] = useState<ISongsFilters>({
    skip: 0,
    take: 7,
    minYear: 1900,
    maxYear: new Date().getFullYear(),
  });
  const { isLoading, data: songsList } = useGetSongsV1(filter);
  const { isLoading: isLoadingBandsList, data: bandsList } = useGetBandsV1();
  const [data, setData] = useState<ISongList | undefined>(songsList);
  const [snackbar, setSnackbarSettings] = useState<ISnackBarSettings>({
    open: false,
    message: "",
    severity: "success",
  });

  const location = useLocation();
  useEffect(() => {
    if (location.state?.message) {
      setSnackbarSettings({
        open: true,
        message: location.state.message,
        severity: "success",
      });
      // Clear the state
      location.state = {};
    }
  }, [location, location.state]);

  useEffect(() => {
    setData(songsList);
  }, [songsList]);

  const onDeleteSong = (id: number) => {
    deleteSong(id);
  };

  const {
    mutate: deleteSong,
    isSuccess: deleteSongSuccess,
    isError: isErrorDeleteSong,
  } = useDeleteSongV1();

  const onSongsSearchChange = useCallback((query: string) => {
    setFilter((filter) => ({
      ...filter,
      search: query,
    }));
  }, []);

  const onChangeBandsSelection = (selectedIds: number[]) => {
    setFilter((filter) => ({
      ...filter,
      bands: selectedIds,
    }));
  };

  const onChangePagination = (newPage: number) => {
    setFilter({ ...filter, skip: newPage });
    setPage(newPage);
  };

  const onChangeSlider = (_event: Event, newValue: number[]) => {
    setFilter((filter) => ({
      ...filter,
      minYear: newValue[0],
      maxYear: newValue[1],
    }));
  };

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && !uploadFileLoading) {
      try {
        fileUpload(file);
      } catch (error) {
        console.error("Error uploading file:", error);
      } finally {
        // Clear the file input field for the next upload
        event.target.value = "";
      }
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarSettings({ ...snackbar, open: false });
  };

  const {
    mutate: fileUpload,
    isSuccess: uploadFileSuccess,
    isLoading: uploadFileLoading,
    isError: isErrorUploadFile,
  } = useUploadSongsCsvV1();

  useEffect(() => {
    if (uploadFileSuccess || deleteSongSuccess) {
      let message = "";
      if (uploadFileSuccess) {
        message = "File uploaded successfully!";
      } else if (deleteSongSuccess) {
        message = "Song deleted successfully!";
      }

      setSnackbarSettings({
        open: true,
        message: message,
        severity: "success",
      });
    }
  }, [uploadFileSuccess, deleteSongSuccess]);

  useEffect(() => {
    if (isErrorUploadFile || isErrorDeleteSong) {
      let message = "";
      if (isErrorUploadFile) {
        message = "Error uploading file!";
      } else if (isErrorDeleteSong) {
        message = "Error deleting song!";
      }

      setSnackbarSettings({
        open: true,
        message: message,
        severity: "error",
      });
    }
  }, [isErrorUploadFile, isErrorDeleteSong]);

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          mb: 2,
          pb: 2,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Typography
          variant="h2"
          fontWeight="bold"
          color="secondary.main"
          lineHeight="1"
          fontSize="2em"
        >
          Songs List
        </Typography>
        <FileUploadButton
          title={isMobile ? "Upload" : "Upload CSV"}
          handleFileChange={handleFileChange}
          isUploading={uploadFileLoading}
        />
      </Box>

      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} md={4}>
          <SearchTextField
            onSearchQueryChange={onSongsSearchChange}
            placeholder="Search for a song by name or band"
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <RangeSlider
            onChange={onChangeSlider}
            min={1900}
            max={new Date().getFullYear()}
          />
        </Grid>
        {!isLoadingBandsList ? (
          <Grid item xs={12} md={4}>
            <AutoComplete
              label="Filter By Band"
              placeholder="Queen.. "
              options={bandsList ? bandsList : []}
              onSelectionChange={onChangeBandsSelection}
            />
          </Grid>
        ) : null}
      </Grid>
      {isLoading ? (
        <CircularProgress
          color="primary"
          sx={{ position: "absolute", top: "50%", left: "50%" }}
        />
      ) : (
        <DataTable
          onClickDelete={onDeleteSong}
          headers={songsListHeaders}
          data={data?.songs ? data.songs : []}
          totalRows={data?.total ? data.total : 0}
          onChange={onChangePagination}
          page={page}
          rowsPerPage={filter.take}
        />
      )}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={1500}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default SongsListPage;
