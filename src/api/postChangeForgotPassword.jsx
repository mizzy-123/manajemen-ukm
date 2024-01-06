import axios from "axios";
export default async function PostChangeForgotPassword({ token, password, password_confirmation, email }) {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/reset-password`,
    {
      email: email,
      token: token,
      password: password,
      password_confirmation: password_confirmation,
    },
    {
      headers: {
        Accept: "application/json",
      },
    }
  );
  return response;
}
