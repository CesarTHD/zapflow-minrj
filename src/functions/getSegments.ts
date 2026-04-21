export const getSegments = async (setLoading) => {
  setLoading(true);
  try {
    const segments = await fetch(`https://${import.meta.env.VITE_URL_API}/segments`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.parse(JSON.stringify(`{
          'company_id': ${import.meta.env.VITE_COMPANY_ID}
      }`))
    });

    return segments.json();
  } catch (error) {
    console.log(error)
  } finally {
    setLoading(false);
  }
}