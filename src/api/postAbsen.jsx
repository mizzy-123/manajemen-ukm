import axios from "axios";
export default async function PostAbsen({ token, organizationId }) {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/absensi`,
    {
      organization_id: organizationId,
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
