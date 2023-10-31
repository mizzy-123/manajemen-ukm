import axios from "axios";
export default async function LoginAccount({ account, password }) {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/login`,
    {
      account: account,
      password: password,
    },
    {
      headers: {
        Accept: "application/json",
      },
    }
  );
  return response;
}
