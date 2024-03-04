import { Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout/Layout";
import SongsListPage from "./pages/SongsList/SongsList.page.tsx";
import { QueryClientProvider } from "react-query";
import { queryClient } from "./libs/reactQuery/client.react-query.ts";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<SongsListPage />} />
        </Route>

        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
