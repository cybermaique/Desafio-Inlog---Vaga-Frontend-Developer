import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Container, Paper, Typography } from "@mui/material";
import "leaflet/dist/leaflet.css";
import { useState } from "react";
import { useForm } from "react-hook-form";
import useSWRMutation from "swr/mutation";
import TruckFormField from "../components/add-truck/form-field";
import LocationButton from "../components/add-truck/location-button";
import TruckSelectionMap from "../components/add-truck/truck-selection-map";
import PageHeader from "../components/page-header";
import { NewTruck } from "../interfaces/truck";
import { addTruck } from "../services/post-truck";
import { useLoadingStore } from "../stores/loading";
import { useSnackbarStore } from "../stores/snackbar";
import truckSchema from "../validation/truck-schema";
const AddTruck = () => {
  const showSnackbar = useSnackbarStore((state) => state.showSnackbar);
  const { setLoading } = useLoadingStore();
  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(truckSchema) });

  const [position, setPosition] = useState<{ lat: number; lng: number } | null>(
    null
  );
  const { trigger, isMutating } = useSWRMutation("/api/caminhao", addTruck);

  const onSubmit = async (data: any) => {
    const formattedData: NewTruck = {
      identifier: data.identifier,
      license_plate: data.license_plate,
      tracker_serial_number: data.tracker_serial_number,
      coordinates: {
        latitude: data.latitude,
        longitude: data.longitude,
      },
    };
    try {
      setLoading(true);
      await trigger(formattedData);
      showSnackbar("Caminhão cadastrado com sucesso!", "success");
      reset({
        identifier: "",
        license_plate: "",
        tracker_serial_number: "",
        latitude: 0,
        longitude: 0,
      });
    } catch {
      showSnackbar("Erro ao cadastrar caminhão.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth={false}>
      <Box display="flex" flexDirection="column" gap={2} mt={2}>
        <PageHeader
          title="Adicionar Caminhão"
          subtitle="Cadastre um novo caminhão e sua localização."
        />
        <Paper
          elevation={0}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 4.5,
            padding: 2,
            borderRadius: 2,
          }}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box display="flex" flexDirection="column" gap={2}>
              <TruckFormField
                name="identifier"
                label="Identificador *"
                control={control}
                errors={errors}
              />
              <TruckFormField
                name="license_plate"
                label="Placa *"
                control={control}
                errors={errors}
                isLicensePlate
              />
              <TruckFormField
                name="tracker_serial_number"
                label="Número de Série do Rastreador *"
                control={control}
                errors={errors}
              />
              <Typography variant="subtitle1">
                Selecione a localização no mapa *:
              </Typography>
              <TruckSelectionMap
                position={position}
                setPosition={setPosition}
                setValue={setValue}
              />
              <Typography
                variant="caption"
                color={errors.latitude ? "error" : "inherit"}
              >
                {errors.latitude?.message
                  ? String(errors.latitude.message)
                  : `Latitude: ${
                      position?.lat || "Não selecionado"
                    } | Longitude: ${position?.lng || "Não selecionado"}`}
              </Typography>
              <Box display="flex" justifyContent="flex-end" gap={2} mt={2}>
                <LocationButton setPosition={setPosition} setValue={setValue} />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={isMutating}
                >
                  {isMutating ? "Salvando..." : "Salvar Caminhão"}
                </Button>
              </Box>
            </Box>
          </form>
        </Paper>
      </Box>
    </Container>
  );
};

export default AddTruck;
