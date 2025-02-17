export const deleteTruck = async (url: string) => {
  const response = await fetch(url, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Erro ao excluir caminhão");
  }

  return response.json();
};
