export const getSegments = async (setLoading) => {
  setLoading(true);
  try {
    const segments = await fetch(
      `https://${import.meta.env.VITE_URL_API}/segments?company_id=${import.meta.env.VITE_COMPANY_ID}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

    return segments.json();
  } catch (error) {
    console.log(error);
  } finally {
    setLoading(false);
  }
};