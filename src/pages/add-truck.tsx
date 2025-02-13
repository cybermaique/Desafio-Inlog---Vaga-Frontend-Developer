import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import "leaflet/dist/leaflet.css";
import { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  MapContainer,
  Marker,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import useSWRMutation from "swr/mutation";
import * as z from "zod";
import PageHeader from "../components/page-header";
import truckIcon from "../components/truck-icon";
import { NewTruck } from "../interfaces/truck";
import { addTruck } from "../services/post-truck";
import { useLoadingStore } from "../stores/loading";
import { useSnackbarStore } from "../stores/snackbar";

const errorMap: z.ZodErrorMap = () => ({ message: "Campo obrigatório" });
z.setErrorMap(errorMap);

const schema = z.object({
  identifier: z
    .string()
    .min(3, "O identificador deve ter pelo menos 3 caracteres"),
  license_plate: z
    .string()
    .regex(/^[A-Z]{3}-\d{4}$|^[A-Z]{3}\d{1}[A-Z]{1}\d{2}$/i, "Placa inválida"),
  tracker_serial_number: z.string().min(5, "Número de série inválido"),
  latitude: z.number().min(-90).max(90, "Latitude inválida"),
  longitude: z.number().min(-180).max(180, "Longitude inválida"),
});

type FormData = z.infer<typeof schema>;

const AddTruck = () => {
  const mapRef = useRef<L.Map | null>(null);
  const showSnackbar = useSnackbarStore((state) => state.showSnackbar);
  const { setLoading } = useLoadingStore();
  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const [position, setPosition] = useState<{ lat: number; lng: number } | null>(
    null
  );
  const { trigger, isMutating } = useSWRMutation("/api/caminhao", addTruck);

  const onSubmit = async (data: FormData) => {
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
      setPosition(null);
    } catch {
      showSnackbar("Erro ao cadastrar caminhão.", "error");
    } finally {
      setLoading(false);
    }
  };

  const getUserLocation = () => {
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const userPosition = { lat: coords.latitude, lng: coords.longitude };
        setPosition(userPosition);
        setValue("latitude", coords.latitude);
        setValue("longitude", coords.longitude);

        if (mapRef.current) {
          mapRef.current.setView([coords.latitude, coords.longitude], 13);
        }
      },
      () => showSnackbar("Erro ao obter localização do usuário", "error")
    );
  };

  const LocationMarker = () => {
    const map = useMap();

    useEffect(() => {
      if (position && map) {
        map.setView([position.lat, position.lng], 13);
      }
    }, [position, map]);

    useMapEvents({
      click(e) {
        setValue("latitude", e.latlng.lat);
        setValue("longitude", e.latlng.lng);
        setPosition(e.latlng);
      },
    });

    return position ? <Marker position={position} icon={truckIcon} /> : null;
  };

  useEffect(() => {
    getUserLocation();
  }, []);

  return (
    <Container maxWidth={false}>
      <Box display="flex" flexDirection="column" gap={2} mt={2}>
        <PageHeader
          title="Adição de Caminhões"
          subtitle="Cadastre um novo caminhão e sua localização."
        />
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box display="flex" flexDirection="column" gap={2}>
            <Controller
              name="identifier"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Identificador *"
                  error={!!errors.identifier}
                  helperText={errors.identifier?.message}
                />
              )}
            />
            <Controller
              name="license_plate"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Placa *"
                  error={!!errors.license_plate}
                  helperText={errors.license_plate?.message}
                />
              )}
            />
            <Controller
              name="tracker_serial_number"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Número de Série do Rastreador *"
                  error={!!errors.tracker_serial_number}
                  helperText={errors.tracker_serial_number?.message}
                />
              )}
            />
            <Typography variant="subtitle1">
              Selecione a localização no mapa:
            </Typography>

            <MapContainer
              center={position || [-25.43247, -49.27845]}
              zoom={13}
              style={{ height: 300, width: "100%" }}
              whenReady={() => {
                if (mapRef.current) {
                  mapRef.current.invalidateSize();
                }
              }}
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <LocationMarker />
            </MapContainer>

            <Typography
              variant="caption"
              color={errors.latitude ? "error" : "inherit"}
            >
              {errors.latitude
                ? errors.latitude.message
                : `Latitude: ${
                    position?.lat || "Não selecionado"
                  } | Longitude: ${position?.lng || "Não selecionado"}`}
            </Typography>

            <Box display="flex" justifyContent="flex-end" gap={2} mt={2}>
              <Button variant="outlined" onClick={getUserLocation}>
                Usar minha localização
              </Button>
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
      </Box>
    </Container>
  );
};

export default AddTruck;
