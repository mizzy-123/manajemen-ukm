import axios from "axios";
export default async function PostEditFormulir({ token, expired, formid }) {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/edit-formulir/${formid}`,
    {
      expired: expired,
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
