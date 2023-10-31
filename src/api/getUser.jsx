import axios from "axios";

export default async function GetUser({ token }) {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/me`, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  return response;
}
