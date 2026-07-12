import { getAuthHeaders } from "./getAuthHeaders";

export const getSegmentCount = async (filters, loja) => {
  const response = await fetch(
    `${import.meta.env.VITE_URL_API}/segments/count`,
    {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify({ filters, loja }),
    }
  );

  if (!response.ok) {
    throw new Error("Erro ao buscar preview do segmento.");
  }

  return response.json();
};