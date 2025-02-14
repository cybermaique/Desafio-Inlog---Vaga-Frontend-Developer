import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Container, Paper, Typography } from "@mui/material";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useSWRMutation from "swr/mutation";
import TruckFormField from "../../components/add-truck/form-field";
import LocationButton from "../../components/add-truck/location-button";
import TruckSelectionMap from "../../components/add-truck/truck-selection-map";
import PageHeader from "../../components/page-header";
import { DEFAULT_TRUCK_IMAGE } from "../../constants/table";
import useUserLocation from "../../hooks/use-user-location";
import { NewTruck } from "../../interfaces/truck";
import { addTruck } from "../../services/post-truck";
import { useLoadingStore } from "../../stores/loading";
import { useSnackbarStore } from "../../stores/snackbar";
import { convertFileToBase64 } from "../../utils/add-truck";
import truckSchema from "../../validation/truck-schema";

const AddTruck = () => {
  const showSnackbar = useSnackbarStore((state) => state.showSnackbar);
  const { setLoading } = useLoadingStore();
  const [imagePreview, setImagePreview] = useState<string>(DEFAULT_TRUCK_IMAGE);

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

  const userLocation = useUserLocation();

  const { trigger, isMutating } = useSWRMutation("/api/caminhao", addTruck);

  const onSubmit = async (data: any) => {
    const formattedData: NewTruck = {
      image: imagePreview || "",
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
      setImagePreview(DEFAULT_TRUCK_IMAGE);
    } catch {
      showSnackbar("Erro ao cadastrar caminhão.", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0] || null;
    if (file) {
      try {
        const base64 = await convertFileToBase64(file);
        setImagePreview(base64);
      } catch (error) {
        showSnackbar("Erro ao processar a imagem.", "error");
      }
    }
  };

  useEffect(() => {
    if (userLocation) {
      setPosition({ lat: userLocation.latitude, lng: userLocation.longitude });
      setValue("latitude", userLocation.latitude);
      setValue("longitude", userLocation.longitude);
    }
  }, [userLocation, setValue]);

  return (
    <Container maxWidth={false}>
      <Box display="flex" flexDirection="column" gap={2} mt={2}>
        <PageHeader
          title="Cadastrar Caminhão"
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
            <Box display="flex" gap={4} alignItems="center">
              {/* Foto do caminhão + Botão de Upload */}
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                gap={2}
              >
                <Button variant="contained" component="label">
                  {imagePreview
                    ? "Trocar Imagem"
                    : "Selecionar imagem do caminhão"}
                  <input
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={handleImageChange}
                  />
                </Button>

                {imagePreview && (
                  <Box
                    mt={1}
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                  >
                    <Typography variant="caption">Pré-visualização:</Typography>
                    <img
                      src={imagePreview}
                      alt="Pré-visualização"
                      width={220}
                      height={150}
                      style={{
                        borderRadius: 8,
                        objectFit: "cover",
                        border: "1px solid #ccc",
                      }}
                    />
                  </Box>
                )}
              </Box>

              {/* Inputs ao lado direito */}
              <Box display="flex" flexDirection="column" gap={2} flex={1}>
                <TruckFormField
                  name="identifier"
                  label="Identificador *"
                  control={control}
                  errors={errors}
                  maxLength={40}
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
                  maxLength={20}
                />
              </Box>
            </Box>

            <Typography variant="subtitle1" mt={4}>
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
                    position?.lat ?? "Não selecionado"
                  } | Longitude: ${position?.lng ?? "Não selecionado"}`}
            </Typography>
            <Box display="flex" justifyContent="flex-end" gap={2} mt={2}>
              <LocationButton setPosition={setPosition} setValue={setValue} />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={isMutating}
                size="large"
              >
                {isMutating ? "Salvando..." : "Salvar Caminhão"}
              </Button>
            </Box>
          </form>
        </Paper>
      </Box>
    </Container>
  );
};

export default AddTruck;
