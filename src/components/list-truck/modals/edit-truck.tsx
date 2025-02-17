import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { TruckWithDistance } from "../../../interfaces/truck";

interface EditTruckDialogProps {
  open: boolean;
  selectedTruck: TruckWithDistance | null;
  handleEditClose: () => void;
  handleSaveEdit: () => void;
  handleChangeField: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleChangeDate: (value: dayjs.Dayjs | null) => void;
}

const EditTruckDialog = ({
  open,
  selectedTruck,
  handleEditClose,
  handleSaveEdit,
  handleChangeField,
  handleChangeDate,
}: EditTruckDialogProps) => {
  return (
    <Dialog open={open} onClose={handleEditClose}>
      <DialogTitle>Editar Caminhão</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          label="Identificador"
          name="identifier"
          value={selectedTruck?.identifier || ""}
          onChange={handleChangeField}
          sx={{ mt: 2 }}
        />

        <TextField
          fullWidth
          label="Placa"
          name="license_plate"
          value={selectedTruck?.license_plate || ""}
          onChange={handleChangeField}
          sx={{ mt: 2 }}
        />

        <TextField
          fullWidth
          label="Rastreador"
          name="tracker_serial_number"
          value={selectedTruck?.tracker_serial_number || ""}
          onChange={handleChangeField}
          sx={{ mt: 2 }}
        />
        <DatePicker
          label="Data de Início"
          value={
            selectedTruck?.start_date ? dayjs(selectedTruck.start_date) : null
          }
          onChange={handleChangeDate}
          sx={{ mt: 2, width: "100%" }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleEditClose} variant="outlined">
          Cancelar
        </Button>
        <Button onClick={handleSaveEdit} variant="contained">
          Salvar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditTruckDialog;
