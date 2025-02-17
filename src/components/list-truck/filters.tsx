import { Box, Button, TextField } from "@mui/material";
import { formatLicensePlate } from "../../utils/list-truck";

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

  const isFilterEmpty =
    !(filters.licensePlate?.trim() ?? "") &&
    !(filters.trackerSerialNumber?.trim() ?? "") &&
    !(filters.maxDistance?.trim() ?? "");

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      data-testid="truck-filters"
    >
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
          disabled={isFilterEmpty}
        >
          Limpar
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={onSearch}
          size="large"
          disabled={isFilterEmpty}
        >
          Buscar
        </Button>
      </Box>
    </Box>
  );
};
