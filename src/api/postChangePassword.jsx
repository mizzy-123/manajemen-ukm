import axios from "axios";
export default async function PostChangePassword({ token, password, password_confirmation }) {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/change-password`,
    {
      password: password,
      password_confirmation: password_confirmation,
    },
    {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token.value}`,
      },
    }
  );
  return response;
}
