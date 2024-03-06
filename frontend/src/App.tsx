import { Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout/Layout";
import SongsListPage from "./pages/SongsList/SongsList.page.tsx";
import { QueryClientProvider } from "react-query";
import { queryClient } from "./libs/reactQuery/client.react-query.ts";
import AddSongPage from "./pages/AddSong/AddSong.page.tsx";
import NotFoundPage from "./pages/NotFound/NotFound.page.tsx";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<SongsListPage />} />
          <Route path="/songs" element={<SongsListPage />} />
          <Route path="/songs/new" element={<AddSongPage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
