import useSWR from "swr";
import { fetcher } from "../api/fetcher";
import { TruckApiResponse } from "../interfaces/truck";

export const useGetTrucks = () => {
  return useSWR<TruckApiResponse[]>("/api/caminhoes", fetcher);
};
