import useSWR from "swr";
import { fetcher } from "../api/fetcher";
import { Truck } from "../interfaces/truck";

export const useGetTrucks = () => {
  return useSWR<Truck[]>("/api/caminhoes", fetcher);
};
