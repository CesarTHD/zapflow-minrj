export const getAuthHeaders = () => {
  const auth = localStorage.getItem(
    "sb-hjlcvvrkdnegxzxhpqti-auth-token"
  );

  if (!auth) {
    throw new Error("Usuário não autenticado.");
  }

  const { access_token } = JSON.parse(auth);

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${access_token}`,
  };
};