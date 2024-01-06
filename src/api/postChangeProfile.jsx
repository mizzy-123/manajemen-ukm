import axios from "axios";
export default async function PostChangeProfile({ token, name, nim, no_telepon }) {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/change-profile`,
    {
      name: name,
      nim: nim,
      no_telepon: no_telepon,
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
