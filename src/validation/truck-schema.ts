import * as z from "zod";

const errorMap: z.ZodErrorMap = () => ({ message: "Campo obrigatório" });
z.setErrorMap(errorMap);

const truckSchema = z.object({
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

export default truckSchema;
