import { TruckApiResponse } from "../interfaces/truck";

export const updateTruck = async (
  url: string,
  { arg }: { arg: TruckApiResponse }
) => {
  const response = await fetch(url, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(arg),
  });

  if (!response.ok) {
    throw new Error("Erro ao atualizar caminhão");
  }

  const data = await response.json();
  return data.truck;
};
