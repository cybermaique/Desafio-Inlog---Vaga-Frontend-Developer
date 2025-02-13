import { createServer, Model } from "miragejs";

export function makeServer() {
  return createServer({
    models: {
      truck: Model,
    },

    seeds(server) {
      server.create("truck", {
        id: "1",
        identifier: "Truck 1",
        license_plate: "AAA-9A99",
        tracker_serial_number: "A0000000",
        coordinates: { latitude: -25.43247, longitude: -49.27845 },
      });
      server.create("truck", {
        id: "2",
        identifier: "Truck 2",
        license_plate: "BBB-4B44",
        tracker_serial_number: "B1111111",
        coordinates: { latitude: -23.55052, longitude: -46.63331 },
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
