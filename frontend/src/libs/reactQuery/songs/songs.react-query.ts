import { AxiosError } from "axios";
import { apiServer } from "../../axios/axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { ISongList } from "../../../interfaces/songs/song.interface";
import { ISongsFilters } from "../../../interfaces/songs/song.filters.interface";
import { ISongDto } from "../../../interfaces/songs/song.create.dto.interface";

const SONGS_CACHE_KEY_NAMESPACE = "songs";

// GET /v1/songs
export async function getSongsV1(filters: ISongsFilters): Promise<ISongList> {
  try {
    const { data } = await apiServer.get<ISongList>(`/v1/songs`, {
      params: { ...filters },
    });
    return data;
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    throw new Error(err.response?.data?.message || String(err));
  }
}
export function useGetSongsV1(filters: ISongsFilters) {
  return useQuery<ISongList, Error>(
    [SONGS_CACHE_KEY_NAMESPACE, filters],
    () => getSongsV1(filters),
    {
      cacheTime: 5 * 60 * 1000,
      refetchOnMount: true,
      keepPreviousData: true,
    }
  );
}

// POST: /v1/songs/upload

export async function uploadSongsCsvV1(file: File): Promise<void> {
  const formData = new FormData();
  formData.append("csv", file);
  return await apiServer.post(`/v1/songs/upload`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}
export function useUploadSongsCsvV1() {
  const queryClient = useQueryClient();
  return useMutation<unknown, Error, File>(
    (file: File) => uploadSongsCsvV1(file),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([SONGS_CACHE_KEY_NAMESPACE]);
      },
    }
  );
}

// DELTE: /v1/songs/{id}

export async function deleteSongV1(id: number): Promise<void> {
  return await apiServer.delete(`/v1/songs/${id}`);
}

export function useDeleteSongV1() {
  const queryClient = useQueryClient();
  return useMutation<unknown, Error, number>((id: number) => deleteSongV1(id), {
    onSuccess: () => {
      queryClient.invalidateQueries([SONGS_CACHE_KEY_NAMESPACE]);
    },
  });
}

// POST: /v1/songs/

export async function createSongV1(dto: ISongDto): Promise<void> {
  return await apiServer.post(`/v1/songs`, dto);
}

export function useCreateSongV1() {
  const queryClient = useQueryClient();
  return useMutation<unknown, Error, ISongDto>(
    (dto: ISongDto) => createSongV1(dto),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([SONGS_CACHE_KEY_NAMESPACE]);
      },
    }
  );
}
