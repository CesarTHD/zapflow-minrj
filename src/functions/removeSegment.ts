import { getAuthHeaders } from "./getAuthHeaders";

export const removeSegment = async (id) => {
    const response = await fetch(
    `${import.meta.env.VITE_URL_API}/segments/${id}`,
    {
      method: "DELETE",
      headers: getAuthHeaders()
    }
  );

  return response;
};