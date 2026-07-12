import { getAuthHeaders } from "./getAuthHeaders";

export const getCampaigns = async (setLoading) => {
  setLoading(true);

  try {
    const response = await fetch(
      `${import.meta.env.VITE_URL_API}/campaigns?company_id=${import.meta.env.VITE_COMPANY_ID}`,
      {
        method: "GET",
        headers: getAuthHeaders()
      }
    );

    if (!response.ok) {
      throw new Error(`Erro ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Erro ao buscar campanhas:", error);
    throw error;
  } finally {
    setLoading(false);
  }
};