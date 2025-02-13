import { Box, Button, TextField } from "@mui/material";
import { formatLicensePlate } from "../../utils/truck";

interface TruckFiltersProps {
  filters: {
    licensePlate: string;
    trackerSerialNumber: string;
    maxDistance: string;
  };
  setFilters: (filters: TruckFiltersProps["filters"]) => void;
  onSearch: () => void;
  onKeyDown: (event: React.KeyboardEvent) => void;
  onClear: () => void;
}

export const TruckFilters = ({
  filters,
  setFilters,
  onSearch,
  onKeyDown,
  onClear,
}: TruckFiltersProps) => {
  const handleFilterChange =
    (field: keyof typeof filters) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      let value = event.target.value;

      if (field === "licensePlate") {
        value = formatLicensePlate(value);
      }

      if (field === "trackerSerialNumber") {
        value = value.toUpperCase().slice(0, 10);
      }

      setFilters({ ...filters, [field]: value });
    };

  // Verifica se TODOS os filtros estão vazios
  const isFilterEmpty =
    !filters.licensePlate.trim() &&
    !filters.trackerSerialNumber.trim() &&
    !filters.maxDistance.trim();

  return (
    <Box display="flex" justifyContent="space-between">
      <Box display="flex" gap={2} flexWrap="wrap" alignItems="center">
        <TextField
          label="Placa"
          variant="outlined"
          value={filters.licensePlate}
          onChange={handleFilterChange("licensePlate")}
          onKeyDown={onKeyDown}
        />
        <TextField
          label="Rastreador"
          variant="outlined"
          value={filters.trackerSerialNumber}
          onChange={handleFilterChange("trackerSerialNumber")}
          onKeyDown={onKeyDown}
        />
        <TextField
          label="Distância Máxima (km)"
          variant="outlined"
          type="number"
          value={filters.maxDistance}
          onChange={handleFilterChange("maxDistance")}
          onKeyDown={onKeyDown}
        />
      </Box>
      <Box display="flex" gap={2}>
        <Button
          variant="outlined"
          onClick={onClear}
          size="large"
          disabled={isFilterEmpty} // Desabilita se os filtros estiverem vazios
        >
          Limpar
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={onSearch}
          size="large"
          disabled={isFilterEmpty} // Desabilita se os filtros estiverem vazios
        >
          Buscar
        </Button>
      </Box>
    </Box>
  );
};
