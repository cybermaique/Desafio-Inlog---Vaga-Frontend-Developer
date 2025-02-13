import { Box, Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Map } from "../components/map";
import NoResults from "../components/no-results";
import PageHeader from "../components/page-header";
import { TruckListSkeleton } from "../components/skeleton";
import { TruckTable } from "../components/truck-table";
import { Truck, TruckWithDistance } from "../interfaces/truck";
import { UserLocation } from "../interfaces/user-location";
import { useGetTrucks } from "../services/get-trucks";
import { useLoadingStore } from "../stores/loading";

const TruckList = () => {
  const { setLoading } = useLoadingStore();
  const { data: trucks, error, isLoading } = useGetTrucks();
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const [selectedTruck, setSelectedTruck] = useState<Truck | null>(null);
  const [isDistanceDescending, setIsDistanceDescending] = useState(false);

  const sortedTrucks: TruckWithDistance[] = userLocation
    ? [...(trucks ?? [])]
        .map((truck) => {
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

          return {
            ...truck,
            distance: getDistance(
              userLocation.latitude,
              userLocation.longitude,
              truck.coordinates.latitude,
              truck.coordinates.longitude
            ),
          };
        })
        .sort((a, b) =>
          isDistanceDescending
            ? b.distance - a.distance
            : a.distance - b.distance
        )
    : (trucks ?? []).map((truck) => ({ ...truck, distance: 0 }));

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
    <Container maxWidth={false}>
      <Box display="flex" flexDirection="column" gap={2} mt={2}>
        <PageHeader
          title="Listagem de Caminhões"
          subtitle="Confira a localização e detalhes dos caminhões disponíveis."
        />

        <Map trucks={sortedTrucks} selectedTruck={selectedTruck} />

        {isLoading && <TruckListSkeleton />}

        {!isLoading && sortedTrucks.length === 0 && <NoResults />}
        {!isLoading && sortedTrucks.length > 0 && (
          <TruckTable
            trucks={sortedTrucks}
            selectedTruck={selectedTruck}
            setSelectedTruck={setSelectedTruck}
            setIsDistanceDescending={setIsDistanceDescending}
            isDistanceDescending={isDistanceDescending}
          />
        )}
      </Box>
    </Container>
  );
};

export default TruckList;
