import { getAuthHeaders } from "./getAuthHeaders";

export const createSegment = async (payload) => {
  
  const response = await fetch(
    `${import.meta.env.VITE_URL_API}/segments`,
    {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(payload),
    }
  );

  if (!response.ok) {
    throw new Error("Erro ao salvar segmento.");
  }

  return response.json();
};