import useSWR from "swr";
import { fetcher } from "../api/fetcher";
import { TruckNormalized } from "../interfaces/truck-normalized";

export const useGetTrucks = () => {
  return useSWR<TruckNormalized[]>("/api/caminhoes", fetcher);
};
