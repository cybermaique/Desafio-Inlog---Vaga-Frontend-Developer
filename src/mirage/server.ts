import { createServer, Model, Response } from "miragejs";
import { TRUCKS } from "../__mocks__/trucks-server.mock";

export function makeServer() {
  return createServer({
    models: {
      truck: Model,
    },

    seeds(server) {
      TRUCKS.forEach((truck) => {
        server.create("truck", truck);
      });
    },

    routes() {
      this.namespace = "api";

      this.get("/caminhoes", (schema) => {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(schema.all("truck"));
          }, 300);
        });
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

        return schema.create("truck", { ...newTruck });
      });

      this.put("/caminhao/:id", (schema, request) => {
        let id = request.params.id;
        let updatedTruck = JSON.parse(request.requestBody);

        let truck = schema.find("truck", id);

        if (!truck) {
          return new Response(404, {}, { error: "Caminhão não encontrado" });
        }

        if (
          !updatedTruck.license_plate ||
          !updatedTruck.tracker_serial_number ||
          !updatedTruck.coordinates ||
          !updatedTruck.identifier
        ) {
          return new Response(400, {}, { error: "Dados inválidos" });
        }

        truck.update(updatedTruck);
        return truck;
      });

      this.delete("/caminhao/:id", (schema, request) => {
        let id = request.params.id;
        let truck = schema.find("truck", id);

        if (!truck) {
          return new Response(404, {}, { error: "Caminhão não encontrado" });
        }

        truck.destroy();
        return new Response(
          200,
          {},
          { message: "Caminhão excluído com sucesso" }
        );
      });
    },
  });
}
