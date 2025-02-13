import { createServer, Model } from "miragejs";

export function makeServer() {
  return createServer({
    models: {
      truck: Model,
    },

    seeds(server) {
      const trucks = [
        { id: "1", uf: "AC", city: "Rio Branco", lat: -9.97499, lon: -67.8243 },
        { id: "2", uf: "AL", city: "Maceió", lat: -9.66599, lon: -35.735 },
        { id: "3", uf: "AP", city: "Macapá", lat: 0.0349, lon: -51.0694 },
        { id: "4", uf: "AM", city: "Manaus", lat: -3.11903, lon: -60.0217 },
        { id: "5", uf: "BA", city: "Salvador", lat: -12.9714, lon: -38.5014 },
        { id: "6", uf: "CE", city: "Fortaleza", lat: -3.71722, lon: -38.5431 },
        { id: "7", uf: "DF", city: "Brasília", lat: -15.7801, lon: -47.9292 },
        { id: "8", uf: "ES", city: "Vitória", lat: -20.3155, lon: -40.3128 },
        { id: "9", uf: "GO", city: "Goiânia", lat: -16.6809, lon: -49.253 },
        { id: "10", uf: "MA", city: "São Luís", lat: -2.52972, lon: -44.3028 },
        { id: "11", uf: "MT", city: "Cuiabá", lat: -15.5989, lon: -56.0949 },
        {
          id: "12",
          uf: "MS",
          city: "Campo Grande",
          lat: -20.4428,
          lon: -54.6464,
        },
        {
          id: "13",
          uf: "MG",
          city: "Belo Horizonte",
          lat: -19.9167,
          lon: -43.9345,
        },
        { id: "14", uf: "PA", city: "Belém", lat: -1.45502, lon: -48.5024 },
        {
          id: "15",
          uf: "PB",
          city: "João Pessoa",
          lat: -7.11509,
          lon: -34.8641,
        },
        { id: "16", uf: "PR", city: "Curitiba", lat: -25.4284, lon: -49.2733 },
        { id: "17", uf: "PE", city: "Recife", lat: -8.04756, lon: -34.877 },
        { id: "18", uf: "PI", city: "Teresina", lat: -5.08921, lon: -42.8016 },
        {
          id: "19",
          uf: "RJ",
          city: "Rio de Janeiro",
          lat: -22.9068,
          lon: -43.1729,
        },
        { id: "20", uf: "RN", city: "Natal", lat: -5.795, lon: -35.2096 },
        {
          id: "21",
          uf: "RS",
          city: "Porto Alegre",
          lat: -30.0346,
          lon: -51.2177,
        },
        {
          id: "22",
          uf: "RO",
          city: "Porto Velho",
          lat: -8.76116,
          lon: -63.9039,
        },
        { id: "23", uf: "RR", city: "Boa Vista", lat: 2.82384, lon: -60.6753 },
        {
          id: "24",
          uf: "SC",
          city: "Florianópolis",
          lat: -27.5954,
          lon: -48.548,
        },
        {
          id: "25",
          uf: "SP",
          city: "São Paulo",
          lat: -23.55052,
          lon: -46.63331,
        },
        { id: "26", uf: "SE", city: "Aracaju", lat: -10.9472, lon: -37.0731 },
        { id: "27", uf: "TO", city: "Palmas", lat: -10.1835, lon: -48.3336 },
      ];

      trucks.forEach((truck) => {
        server.create("truck", {
          id: truck.id,
          identifier: `Caminhão ${truck.id} - ${truck.city} (${truck.uf})`,
          license_plate: `AAA-${truck.id}A${truck.id}`,
          tracker_serial_number: `T${truck.id}${truck.id}${truck.id}${truck.id}${truck.id}`,
          coordinates: { latitude: truck.lat, longitude: truck.lon },
        });
      });
    },

    routes() {
      this.namespace = "api";

      this.get("/caminhoes", (schema) => {
        return schema.all("truck");
      });

      this.post("/caminhao", (schema, request) => {
        let newTruck = JSON.parse(request.requestBody);
        return schema.create("truck", newTruck);
      });
    },
  });
}
