import { useEffect, useState } from "react";
import useUserLocation from "../hooks/use-user-location";
import { TruckWithDistance } from "../interfaces/truck";
import { useGetTrucks } from "../services/get-trucks";
import { useLoadingStore } from "../stores/loading";
import { useSnackbarStore } from "../stores/snackbar";
import { sortAndFilterTrucks } from "../utils/list-truck";

export const useListTruck = (appliedFilters: any) => {
  const { data: trucks, error, isLoading } = useGetTrucks();
  const { setLoading } = useLoadingStore();
  const { showSnackbar } = useSnackbarStore();
  const userLocation = useUserLocation();
  const [filteredTrucks, setFilteredTrucks] = useState<TruckWithDistance[]>([]);
  const [isDistanceDescending, setIsDistanceDescending] = useState(false);

  const hasData = !isLoading && (filteredTrucks?.length ?? 0) > 0;

  useEffect(() => {
    if (userLocation) {
      setFilteredTrucks(
        sortAndFilterTrucks(
          trucks ?? [],
          appliedFilters,
          isDistanceDescending,
          userLocation
        )
      );
    }
  }, [appliedFilters, trucks, isDistanceDescending, userLocation]);

  useEffect(() => setLoading(isLoading), [isLoading, setLoading]);

  useEffect(() => {
    if (error) {
      showSnackbar("Erro ao carregar os veículos.", "error");
    }
  }, [error, showSnackbar]);

  return {
    trucks: filteredTrucks,
    isLoading,
    isDistanceDescending,
    setIsDistanceDescending,
    hasData,
  };
};
