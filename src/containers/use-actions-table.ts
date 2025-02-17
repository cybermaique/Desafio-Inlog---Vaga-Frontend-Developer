import dayjs from "dayjs";
import { useState } from "react";
import { mutate } from "swr";
import { TruckWithDistance } from "../interfaces/truck";
import { deleteTruck } from "../services/delete-truck";
import { updateTruck } from "../services/update-truck";
import { useLoadingStore } from "../stores/loading";
import { useSnackbarStore } from "../stores/snackbar";

export const useActionsTable = () => {
  const { setLoading } = useLoadingStore();
  const { showSnackbar } = useSnackbarStore();

  const [selectedTruck, setSelectedTruck] = useState<TruckWithDistance | null>(
    null
  );
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const handleEditOpen = (truck: TruckWithDistance) => {
    setSelectedTruck(truck);
    setOpenEditDialog(true);
  };

  const handleEditClose = () => setOpenEditDialog(false);

  const handleDeleteOpen = (truck: TruckWithDistance) => {
    setSelectedTruck(truck);
    setOpenDeleteDialog(true);
  };

  const handleDeleteClose = () => setOpenDeleteDialog(false);

  const handleSaveEdit = async () => {
    if (!selectedTruck) return;

    try {
      setLoading(true);
      await updateTruck(`/api/caminhao/${selectedTruck.id}`, {
        arg: selectedTruck,
      });

      await mutate("/api/caminhoes");

      showSnackbar("Caminhão atualizado com sucesso!", "success");
      handleEditClose();
    } catch (error) {
      showSnackbar("Erro ao atualizar caminhão!", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmDelete = async () => {
    if (!selectedTruck) return;

    try {
      setLoading(true);
      await deleteTruck(`/api/caminhao/${selectedTruck.id}`);

      await mutate("/api/caminhoes");

      showSnackbar("Caminhão excluído com sucesso!", "success");
      handleDeleteClose();
    } catch (error) {
      showSnackbar("Erro ao excluir caminhão!", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleChangeField = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!selectedTruck) return;

    const { name, value } = event.target;

    setSelectedTruck({
      ...selectedTruck,
      [name]: value,
    });
  };

  const handleChangeDate = (value: dayjs.Dayjs | null) => {
    if (!selectedTruck) return;

    setSelectedTruck({
      ...selectedTruck,
      start_date: value?.toISOString() || "",
    });
  };

  return {
    selectedTruck,
    setSelectedTruck,
    openEditDialog,
    openDeleteDialog,
    handleEditOpen,
    handleEditClose,
    handleDeleteOpen,
    handleDeleteClose,
    handleSaveEdit,
    handleConfirmDelete,
    handleChangeField,
    handleChangeDate,
  };
};
