import { NewTruck } from "../interfaces/truck-normalized";

export const addTruck = async (url: string, { arg }: { arg: NewTruck }) => {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(arg),
  });

  if (!response.ok) {
    throw new Error("Erro ao cadastrar caminhão");
  }

  return response.json();
};
