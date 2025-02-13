import { Box, Container, Paper } from "@mui/material";
import { useEffect, useState } from "react";
import { TruckFilters } from "../components/list-truck/filters";
import { TruckTable } from "../components/list-truck/table";
import { TruckViewMap } from "../components/list-truck/truck-view-map";
import NoResults from "../components/no-results";
import PageHeader from "../components/page-header";
import { TruckListSkeleton } from "../components/skeleton";
import { Truck, TruckWithDistance } from "../interfaces/truck";
import { UserLocation } from "../interfaces/user-location";
import { useGetTrucks } from "../services/get-trucks";
import { useLoadingStore } from "../stores/loading";
import { useSnackbarStore } from "../stores/snackbar";

const TruckList = () => {
  const { setLoading } = useLoadingStore();
  const { showSnackbar } = useSnackbarStore();
  const { data: trucks, error, isLoading } = useGetTrucks();
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const [selectedTruck, setSelectedTruck] = useState<Truck | null>(null);
  const [isDistanceDescending, setIsDistanceDescending] = useState(false);

  const [filters, setFilters] = useState({
    licensePlate: "",
    trackerSerialNumber: "",
    maxDistance: "",
  });

  const [appliedFilters, setAppliedFilters] = useState(filters);
  const [filteredTrucks, setFilteredTrucks] = useState<TruckWithDistance[]>([]);

  const handleSearch = () => {
    setAppliedFilters(filters);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const handleClear = () => {
    setFilters(() => {
      const clearedFilters = {
        licensePlate: "",
        trackerSerialNumber: "",
        maxDistance: "",
      };

      setAppliedFilters(clearedFilters);
      return clearedFilters;
    });
  };

  useEffect(() => {
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

    const newFilteredTrucks = sortedTrucks.filter((truck) => {
      return (
        (appliedFilters.licensePlate
          ? truck.license_plate
              .toLowerCase()
              .includes(appliedFilters.licensePlate.toLowerCase())
          : true) &&
        (appliedFilters.trackerSerialNumber
          ? truck.tracker_serial_number
              .toLowerCase()
              .includes(appliedFilters.trackerSerialNumber.toLowerCase())
          : true) &&
        (appliedFilters.maxDistance
          ? truck.distance <= parseFloat(appliedFilters.maxDistance)
          : true)
      );
    });

    setFilteredTrucks(newFilteredTrucks);
  }, [appliedFilters, trucks, userLocation, isDistanceDescending]);

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
        () => showSnackbar("Erro ao obter localização do usuário.", "error")
      );
    }
  }, []);

  useEffect(() => {
    if (error) {
      showSnackbar("Erro ao carregar os veículos.", "error");
    }
  }, [error, showSnackbar]);

  return (
    <Container maxWidth={false}>
      <Box display="flex" flexDirection="column" gap={2} mt={2}>
        <PageHeader
          title="Listagem de Caminhões"
          subtitle="Confira a localização e detalhes dos caminhões disponíveis."
        />
        <Paper
          elevation={0}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 4.5,
            padding: 2,
            borderRadius: 2,
          }}
        >
          <TruckFilters
            filters={filters}
            setFilters={setFilters}
            onSearch={handleSearch}
            onKeyDown={handleKeyDown}
            onClear={handleClear}
          />

          <TruckViewMap trucks={filteredTrucks} selectedTruck={selectedTruck} />

          {isLoading && <TruckListSkeleton />}

          {!isLoading && filteredTrucks.length === 0 && <NoResults />}
          {!isLoading && filteredTrucks.length > 0 && (
            <TruckTable
              trucks={filteredTrucks}
              selectedTruck={selectedTruck}
              setSelectedTruck={setSelectedTruck}
              setIsDistanceDescending={setIsDistanceDescending}
              isDistanceDescending={isDistanceDescending}
            />
          )}
        </Paper>
      </Box>
    </Container>
  );
};

export default TruckList;
