import { AxiosError } from "axios";
import { apiServer } from "../../axios/axios";
import { useQuery } from "react-query";
import { ISongList } from "../../../interfaces/songs/song.interface";

const SONGS_CACHE_KEY_NAMESPACE = "songs";

// GET /v1/songs
export async function getSongsV1(): Promise<ISongList> {
  try {
    const { data } = await apiServer.get<ISongList>(`/v1/songs`);
    return data;
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    throw new Error(err.response?.data?.message || String(err));
  }
}
export function useGetSongsV1() {
  return useQuery<ISongList, Error>(
    [SONGS_CACHE_KEY_NAMESPACE],
    () => getSongsV1(),
    {
      cacheTime: 5 * 60 * 1000,
      refetchOnMount: true,
      keepPreviousData: true,
    }
  );
}
