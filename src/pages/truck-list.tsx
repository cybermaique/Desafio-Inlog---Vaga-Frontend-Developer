import { Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Map } from "../components/map";
import { TruckListSkeleton } from "../components/skeleton";
import { TruckTable } from "../components/truck-table";
import { useGetTrucks } from "../services/get-trucks";
import { useLoadingStore } from "../stores/loading";

interface UserLocation {
  latitude: number;
  longitude: number;
}

export const TruckList = () => {
  const { setLoading } = useLoadingStore();
  const { data: trucks, error, isLoading } = useGetTrucks();
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);

  const sortedTrucks = userLocation
    ? [...(trucks ?? [])].sort((a, b) => {
        const getDistance = (
          lat1: number,
          lon1: number,
          lat2: number,
          lon2: number
        ) => {
          const toRad = (value: number) => (value * Math.PI) / 180;
          const R = 6371;
          const dLat = toRad(lat2 - lat1);
          const dLon = toRad(lon2 - lon1);
          const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(toRad(lat1)) *
              Math.cos(toRad(lat2)) *
              Math.sin(dLon / 2) *
              Math.sin(dLon / 2);
          return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        };

        return (
          getDistance(
            userLocation.latitude,
            userLocation.longitude,
            a.coordinates.latitude,
            a.coordinates.longitude
          ) -
          getDistance(
            userLocation.latitude,
            userLocation.longitude,
            b.coordinates.latitude,
            b.coordinates.longitude
          )
        );
      })
    : trucks ?? [];

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading, setLoading]);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) =>
          setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          }),
        () => console.error("Erro ao obter localização do usuário.")
      );
    }
  }, []);

  if (error)
    return (
      <Typography variant="body1" color="error">
        Erro ao carregar os veículos.
      </Typography>
    );

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Listagem de Caminhões
      </Typography>

      <Map trucks={sortedTrucks} />

      {isLoading && <TruckListSkeleton />}

      {!isLoading && sortedTrucks.length === 0 && (
        <Typography
          variant="body1"
          color="textSecondary"
          align="center"
          sx={{ mt: 2 }}
        >
          Nenhum caminhão encontrado.
        </Typography>
      )}

      {!isLoading && sortedTrucks.length > 0 && (
        <TruckTable trucks={sortedTrucks} />
      )}
    </Container>
  );
};
