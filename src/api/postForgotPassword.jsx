import axios from "axios";
export default async function PostForgotPassword({ email }) {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/forgot-password`,
    {
      email: email,
    },
    {
      headers: {
        Accept: "application/json",
      },
    }
  );
  return response;
}
