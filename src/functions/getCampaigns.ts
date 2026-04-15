export const getCampaigns = async (setLoading) => {
    setLoading(true);
    try {
      const campaigns = await fetch(`https://${import.meta.env.VITE_URL_API}/campaigns`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });

      return campaigns.json();
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false);
    }
  }