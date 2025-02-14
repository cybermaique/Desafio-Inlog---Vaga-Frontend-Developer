import { Button } from "@mui/material";
import { useSnackbarStore } from "../../stores/snackbar";

interface LocationButtonProps {
  setPosition: (position: { lat: number; lng: number }) => void;
  setValue: (field: string, value: number) => void;
}

const LocationButton = ({ setPosition, setValue }: LocationButtonProps) => {
  const showSnackbar = useSnackbarStore((state) => state.showSnackbar);

  const getUserLocation = () => {
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const userPosition = { lat: coords.latitude, lng: coords.longitude };
        setPosition(userPosition);
        setValue("latitude", coords.latitude);
        setValue("longitude", coords.longitude);
      },
      () => showSnackbar("Erro ao obter localização do usuário", "error")
    );
  };

  return (
    <Button variant="outlined" onClick={getUserLocation}>
      Usar minha localização
    </Button>
  );
};

export default LocationButton;
