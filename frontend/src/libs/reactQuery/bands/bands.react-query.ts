import { AxiosError } from "axios";
import { IBand } from "../../../interfaces/bands/band.interface";
import { apiServer } from "../../axios/axios";
import { useQuery } from "react-query";

const BANDS_CACHE_KEY_NAMESPACE = "bands";

// GET /v1/bands
export async function getBandsV1(): Promise<IBand[]> {
  try {
    const { data } = await apiServer.get<IBand[]>(`/v1/bands`, {});
    return data;
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    throw new Error(err.response?.data?.message || String(err));
  }
}
export function useGetBandsV1() {
  return useQuery<IBand[], Error>(
    [BANDS_CACHE_KEY_NAMESPACE],
    () => getBandsV1(),
    {
      cacheTime: 5 * 60 * 1000,
      refetchOnMount: true,
      keepPreviousData: true,
    }
  );
}
