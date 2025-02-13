import { createServer, Model } from "miragejs";
import { TRUCKS } from "./mock";

export function makeServer() {
  return createServer({
    models: {
      truck: Model,
    },

    seeds(server) {
      TRUCKS.forEach((truck) => {
        server.create("truck", {
          id: truck.id,
          identifier: `Caminhão ${truck.id} - ${truck.city} (${truck.uf})`,
          license_plate: truck.plate,
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
