import {
  Box,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import {
  DEFAULT_TRUCK_IMAGE,
  PAGE_SIZE_OPTIONS,
  TRUCK_TABLE_COLUMNS,
} from "../../constants/table";
import { Truck, TruckWithDistance } from "../../interfaces/truck";
import { colors } from "../../styles/colors";
import { getTruckCellValue } from "../../utils/list-truck";
import { CustomActionsComponent } from "./custom-actions-component";

interface TruckTableProps {
  trucks: TruckWithDistance[];
  selectedTruck: Truck | null;
  setSelectedTruck: (truck: Truck | null) => void;
  setIsDistanceDescending: (prev: boolean) => void;
  isDistanceDescending: boolean;
}

export const TruckTable = ({
  trucks,
  selectedTruck,
  setSelectedTruck,
  setIsDistanceDescending,
  isDistanceDescending,
}: TruckTableProps) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  useEffect(() => {
    setPage(0);
  }, [trucks]);

  return (
    <TableContainer
      component={Paper}
      sx={{ mt: 2, borderTop: `1px solid ${colors.chineseWhite}` }}
    >
      <Table data-testid="truck-table">
        <TableHead>
          <TableRow>
            {TRUCK_TABLE_COLUMNS.map((column) => (
              <TableCell
                key={column.key}
                sx={
                  column.sortable
                    ? { cursor: "pointer", fontWeight: "bold" }
                    : {}
                }
                onClick={
                  column.sortable
                    ? () => setIsDistanceDescending(!isDistanceDescending)
                    : undefined
                }
              >
                {column.sortable ? (
                  <TableSortLabel
                    active
                    direction={isDistanceDescending ? "desc" : "asc"}
                  >
                    <strong>{column.label}</strong>
                  </TableSortLabel>
                ) : (
                  <strong>{column.label}</strong>
                )}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {trucks
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((truck) => (
              <TableRow
                key={truck.id}
                onClick={() => setSelectedTruck(truck)}
                sx={{
                  cursor: "pointer",
                  backgroundColor:
                    selectedTruck?.id === truck.id
                      ? colors.antiFlashWhite
                      : "inherit",
                }}
              >
                {TRUCK_TABLE_COLUMNS.map((column) => (
                  <TableCell key={column.key}>
                    {column.key === "image" ? (
                      <img
                        src={truck.image || DEFAULT_TRUCK_IMAGE}
                        alt="Caminhão"
                        width={70}
                        height={50}
                      />
                    ) : (
                      getTruckCellValue(truck, column.key)
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <Box
        display="flex"
        justifyContent="space-between"
        width="100%"
        padding={2}
      >
        {trucks.length > 0 && (
          <Typography variant="body1">
            {trucks.length}{" "}
            {trucks.length === 1
              ? "Resultado encontrado"
              : "Resultados encontrados"}
          </Typography>
        )}
        <Box display="flex" alignItems="center">
          <Typography variant="body1" marginRight={1}>
            Exibir
          </Typography>
          <Select
            value={rowsPerPage}
            onChange={(e) =>
              setRowsPerPage(parseInt(e.target.value as string, 10))
            }
            variant="outlined"
            size="small"
          >
            {PAGE_SIZE_OPTIONS.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
          <Typography variant="body1" marginLeft={1}>
            registros por página
          </Typography>
        </Box>
        <TablePagination
          component="div"
          count={trucks.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          ActionsComponent={CustomActionsComponent}
          rowsPerPageOptions={[]}
          labelRowsPerPage=""
          labelDisplayedRows={() => ""}
        />
      </Box>
    </TableContainer>
  );
};
