import { Box, Container, Paper } from "@mui/material";
import { TruckFilters } from "../../components/list-truck/filters";
import DeleteTruckDialog from "../../components/list-truck/modals/delete-truck";
import EditTruckDialog from "../../components/list-truck/modals/edit-truck";
import { TruckTable } from "../../components/list-truck/table/table";
import { TruckViewMap } from "../../components/list-truck/truck-view-map";
import NoResults from "../../components/no-results";
import PageHeader from "../../components/page-header";
import { TruckListSkeleton } from "../../components/skeleton";
import { PAPER_STYLES } from "../../constants/styles";
import { useActionsTable } from "../../containers/use-actions-table";
import { useListTruck } from "../../containers/use-list-truck";
import { useTruckFilters } from "../../containers/use-truck-filters";

const ListTruck = () => {
  const {
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
  } = useActionsTable();

  const {
    filters,
    setFilters,
    appliedFilters,
    handleSearch,
    handleKeyDown,
    handleClear,
  } = useTruckFilters();

  const {
    trucks: filteredTrucks,
    isLoading,
    isDistanceDescending,
    setIsDistanceDescending,
    hasData,
  } = useListTruck(appliedFilters);

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
            <TruckTable
              trucks={filteredTrucks}
              selectedTruck={selectedTruck}
              setSelectedTruck={setSelectedTruck}
              setIsDistanceDescending={setIsDistanceDescending}
              isDistanceDescending={isDistanceDescending}
              handleEditOpen={handleEditOpen}
              handleDeleteOpen={handleDeleteOpen}
            />
          )}
        </Paper>
      </Box>
      <EditTruckDialog
        open={openEditDialog}
        selectedTruck={selectedTruck}
        handleEditClose={handleEditClose}
        handleSaveEdit={handleSaveEdit}
        handleChangeField={handleChangeField}
        handleChangeDate={handleChangeDate}
      />
      <DeleteTruckDialog
        open={openDeleteDialog}
        selectedTruck={selectedTruck}
        handleDeleteClose={handleDeleteClose}
        handleConfirmDelete={handleConfirmDelete}
      />
    </Container>
  );
};

export default ListTruck;
