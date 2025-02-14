import { Box, Button, Container, Paper } from "@mui/material";
import { useEffect, useState } from "react";
import { TruckFilters } from "../../components/list-truck/filters";
import { TruckTable } from "../../components/list-truck/table";
import { TruckViewMap } from "../../components/list-truck/truck-view-map";
import NoResults from "../../components/no-results";
import PageHeader from "../../components/page-header";
import { TruckListSkeleton } from "../../components/skeleton";
import { PAPER_STYLES } from "../../constants/styles";
import useUserLocation from "../../hooks/use-user-location";
import {
  TruckNormalized,
  TruckWithDistance,
} from "../../interfaces/truck-normalized";
import { useGetTrucks } from "../../services/get-trucks";
import { useLoadingStore } from "../../stores/loading";
import { useSnackbarStore } from "../../stores/snackbar";
import {
  downloadTruckReport,
  sortAndFilterTrucks,
} from "../../utils/list-truck";

const ListTruck = () => {
  const { setLoading } = useLoadingStore();
  const { showSnackbar } = useSnackbarStore();
  const userLocation = useUserLocation();
  const { data: trucks, error, isLoading } = useGetTrucks();
  const [selectedTruck, setSelectedTruck] = useState<TruckNormalized | null>(
    null
  );
  const [isDistanceDescending, setIsDistanceDescending] = useState(false);

  const [filters, setFilters] = useState({
    licensePlate: "",
    trackerSerialNumber: "",
    maxDistance: "",
  });
  const [appliedFilters, setAppliedFilters] = useState(filters);
  const [filteredTrucks, setFilteredTrucks] = useState<TruckWithDistance[]>([]);
  const hasData = !isLoading && filteredTrucks.length > 0;

  const handleSearch = () => setAppliedFilters(filters);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") handleSearch();
  };

  const handleClear = () => {
    const clearedFilters = {
      licensePlate: "",
      trackerSerialNumber: "",
      maxDistance: "",
    };
    setFilters(clearedFilters);
    setAppliedFilters(clearedFilters);
  };

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

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading, setLoading]);

  useEffect(() => {
    if (error) showSnackbar("Erro ao carregar os veículos.", "error");
  }, [error, showSnackbar]);

  return (
    <Container maxWidth={false} aria-busy={isLoading}>
      <Box display="flex" flexDirection="column" gap={2} mt={2}>
        <PageHeader
          title="Listagem de Caminhões"
          subtitle="Confira a localização e detalhes dos caminhões disponíveis."
        />
        <Paper elevation={0} sx={PAPER_STYLES}>
          {hasData && (
            <TruckFilters
              filters={filters}
              setFilters={setFilters}
              onSearch={handleSearch}
              onKeyDown={handleKeyDown}
              onClear={handleClear}
            />
          )}

          {(isLoading || hasData) && (
            <TruckViewMap
              key={filteredTrucks.length}
              trucks={filteredTrucks}
              selectedTruck={selectedTruck}
            />
          )}

          {isLoading && <TruckListSkeleton />}
          {!isLoading && filteredTrucks.length === 0 && <NoResults />}
          {hasData && (
            <>
              <TruckTable
                trucks={filteredTrucks}
                selectedTruck={selectedTruck}
                setSelectedTruck={setSelectedTruck}
                setIsDistanceDescending={setIsDistanceDescending}
                isDistanceDescending={isDistanceDescending}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={() => downloadTruckReport(filteredTrucks)}
              >
                Baixar Relatório PDF
              </Button>
            </>
          )}
        </Paper>
      </Box>
    </Container>
  );
};

export default ListTruck;
