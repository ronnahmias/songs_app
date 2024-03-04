import {
  Container,
  Box,
  Typography,
  Grid,
  CircularProgress,
} from "@mui/material";
import DataTable from "../../components/DataTable/DataTable";
import { songsListHeaders } from "./SongList.headers";
import { useGetSongsV1 } from "../../libs/reactQuery/songs/songs.react-query";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { ISongList } from "../../interfaces/songs/song.interface";
import { SearchTextField } from "../../components/SearchTextField/SearchTextField";
import FileUploadButton from "../../components/FileUpload/FileUpload";

const SongsListPage: React.FC = () => {
  const [page, setPage] = useState<number>(0);
  const { isLoading, data: songsList } = useGetSongsV1();
  const [data, setData] = useState<ISongList | undefined>(songsList);

  useEffect(() => {
    setData(songsList);
  }, [songsList]);

  const onSongsSearchChange = useCallback((query: string) => {
    // setFilter((filter) => ({
    //   ...filter,
    //   search: query,
    // }));
  }, []);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    // Handle file selection
    const file = event.target.files?.[0];
    console.log("Selected file:", file);
  };

  return (
    <Container maxWidth="lg">
      <Box
        sx={{ borderBottom: 1, borderColor: "divider", mb: 2, pb: 2 }}
        display="flex"
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
      </Box>

      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} md={4}>
          <SearchTextField
            onSearchQueryChange={onSongsSearchChange}
            placeholder="Search for a song"
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <FileUploadButton
            title="Upload Songs"
            handleFileChange={handleFileChange}
          />
        </Grid>
      </Grid>
      {isLoading ? (
        <CircularProgress
          color="primary"
          sx={{ position: "absolute", top: "50%", left: "50%" }}
        />
      ) : (
        <DataTable
          headers={songsListHeaders}
          data={data?.songs ? data.songs : []}
          totalRows={data?.total ? data.total : 0}
          onChange={() => {}}
          page={page}
        />
      )}
    </Container>
  );
};

export default SongsListPage;
