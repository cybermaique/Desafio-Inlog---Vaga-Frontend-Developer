import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Truck } from "../interfaces/truck";

interface TruckTableProps {
  trucks: Truck[];
}

export const TruckTable = ({ trucks }: TruckTableProps) => {
  return (
    <TableContainer component={Paper} sx={{ mt: 2 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Identificador</TableCell>
            <TableCell>
              <strong>Placa</strong>
            </TableCell>
            <TableCell>
              <strong>Rastreador</strong>
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
            <TableRow key={truck.id}>
              <TableCell>{truck.identifier}</TableCell>
              <TableCell>{truck.license_plate}</TableCell>
              <TableCell>{truck.tracker_serial_number}</TableCell>
              <TableCell>{truck.coordinates.latitude}</TableCell>
              <TableCell>{truck.coordinates.longitude}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
