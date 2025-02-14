import { createServer, Model, Response } from "miragejs";
import { TRUCKS_SERVER } from "../__mocks__/trucks-server.mock";

export function makeServer() {
  return createServer({
    models: {
      truck: Model,
    },

    seeds(server) {
      TRUCKS_SERVER.forEach((truck) => {
        server.create("truck", {
          id: truck.id,
          identifier: `Caminhão ${truck.id} - ${truck.city} (${truck.uf})`,
          license_plate: truck.plate,
          tracker_serial_number: `T${truck.id}${truck.id}${truck.id}${truck.id}${truck.id}`,
          coordinates: { latitude: truck.lat, longitude: truck.lon },
          image: truck.image,
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

        if (
          !newTruck.license_plate ||
          !newTruck.tracker_serial_number ||
          !newTruck.coordinates ||
          !newTruck.identifier
        ) {
          return new Response(400, {}, { error: "Dados inválidos" });
        }

        return schema.create("truck", newTruck);
      });
    },
  });
}
