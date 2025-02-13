import { Card, CardContent, Container, Typography } from "@mui/material";
import useSWR from "swr";

interface Vehicle {
  id: number;
  identifier: string;
  license_plate: string;
  tracker_serial_number: string;
  coordinates: { latitude: number; longitude: number };
}

const fetcher = (url: string) =>
  fetch(url)
    .then((res) => res.json())
    .then((data) => data.trucks);

export function TruckList() {
  const { data, error } = useSWR<Vehicle[]>("/api/caminhoes", fetcher);

  if (error) return <p>Erro ao carregar os veículos.</p>;
  if (!data) return <p>Carregando...</p>;

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Listagem de Caminhões
      </Typography>
      {data.map((vehicle) => (
        <Card key={vehicle.id} sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="h6">{vehicle.identifier}</Typography>
            <Typography variant="body2">
              Placa: {vehicle.license_plate}
            </Typography>
            <Typography variant="body2">
              Rastreador: {vehicle.tracker_serial_number}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Container>
  );
}
