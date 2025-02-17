import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { TruckWithDistance } from "../../../interfaces/truck";

interface DeleteTruckDialogProps {
  open: boolean;
  selectedTruck: TruckWithDistance | null;
  handleDeleteClose: () => void;
  handleConfirmDelete: () => void;
}

const DeleteTruckDialog = ({
  open,
  selectedTruck,
  handleDeleteClose,
  handleConfirmDelete,
}: DeleteTruckDialogProps) => {
  return (
    <Dialog open={open} onClose={handleDeleteClose}>
      <DialogTitle>Confirmar Exclusão</DialogTitle>
      <DialogContent>
        Tem certeza que deseja excluir o caminhão{" "}
        <strong>{selectedTruck?.identifier}</strong>?
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDeleteClose} variant="outlined">
          Cancelar
        </Button>
        <Button onClick={handleConfirmDelete} variant="contained">
          Excluir
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteTruckDialog;
