import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
} from "@mui/material";
import { Truck, TruckWithDistance } from "../interfaces/truck";
import { colors } from "../styles/colors";

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
  return (
    <TableContainer component={Paper} sx={{ mt: 2 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <strong>Identificador</strong>
            </TableCell>
            <TableCell>
              <strong>Placa</strong>
            </TableCell>
            <TableCell>
              <strong>Rastreador</strong>
            </TableCell>
            <TableCell
              onClick={() => setIsDistanceDescending(!isDistanceDescending)}
              sx={{ cursor: "pointer", fontWeight: "bold" }}
            >
              <TableSortLabel
                active
                direction={isDistanceDescending ? "desc" : "asc"}
              >
                <strong>Distância (km)</strong>
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <strong>Latitude</strong>
            </TableCell>
            <TableCell>
              <strong>Longitude</strong>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {trucks.map((truck) => (
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
              <TableCell>{truck.identifier}</TableCell>
              <TableCell>{truck.license_plate}</TableCell>
              <TableCell>{truck.tracker_serial_number}</TableCell>
              <TableCell>{truck.distance.toFixed(2)}</TableCell>
              <TableCell>{truck.coordinates.latitude}</TableCell>
              <TableCell>{truck.coordinates.longitude}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
