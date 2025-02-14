import { useEffect, useState } from "react";
import { UserLocation } from "../../interfaces/user-location";
import { useSnackbarStore } from "../../stores/snackbar";

const useUserLocation = () => {
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const { showSnackbar } = useSnackbarStore();

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const location: UserLocation = {
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
          };
          setUserLocation(location);
        },
        () => {
          showSnackbar("Erro ao obter a localização do usuário.");
        }
      );
    }
  }, []);

  return userLocation;
};

export default useUserLocation;
