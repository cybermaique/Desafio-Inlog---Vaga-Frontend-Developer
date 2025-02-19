import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  Box,
  IconButton,
  Menu,
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
} from "../../../constants/table";
import { TruckWithDistance } from "../../../interfaces/truck";
import { colors } from "../../../styles/colors";
import { formatDate } from "../../../utils/date";
import { getTruckCellValue } from "../../../utils/list-truck";
import { CustomActionsComponent } from "./custom-actions-component";

interface TruckTableProps {
  trucks: TruckWithDistance[];
  selectedTruck: TruckWithDistance | null;
  setSelectedTruck: (truck: TruckWithDistance | null) => void;
  setIsDistanceDescending: (prev: boolean) => void;
  isDistanceDescending: boolean;
  handleEditOpen: (truck: TruckWithDistance) => void;
  handleDeleteOpen: (truck: TruckWithDistance) => void;
}

export const TruckTable = ({
  trucks,
  selectedTruck,
  setSelectedTruck,
  setIsDistanceDescending,
  isDistanceDescending,
  handleEditOpen,
  handleDeleteOpen,
}: TruckTableProps) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedTruckForMenu, setSelectedTruckForMenu] =
    useState<TruckWithDistance | null>(null);

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleMenuOpen = (
    event: React.MouseEvent<HTMLElement>,
    truck: TruckWithDistance
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedTruckForMenu(truck);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedTruckForMenu(null);
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
                    {column.key === "start_date" ? (
                      formatDate(truck.start_date)
                    ) : column.key === "image" ? (
                      <img
                        src={truck.image || DEFAULT_TRUCK_IMAGE}
                        alt="Caminhão"
                        width={70}
                        height={50}
                      />
                    ) : column.key === "actions" ? (
                      <>
                        <IconButton
                          onClick={(event) => handleMenuOpen(event, truck)}
                        >
                          <MoreVertIcon />
                        </IconButton>
                      </>
                    ) : (
                      getTruckCellValue(truck, column.key)
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
        </TableBody>
      </Table>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem
          onClick={() => {
            handleEditOpen(selectedTruckForMenu!);
            handleMenuClose();
          }}
        >
          Editar
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleDeleteOpen(selectedTruckForMenu!);
            handleMenuClose();
          }}
        >
          Excluir
        </MenuItem>
      </Menu>

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
