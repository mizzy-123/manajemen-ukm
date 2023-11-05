import axios from "axios";
export default async function PostRecruitment({ token, organization_id, expired }) {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/rekrut-ukm`,
    {
      organization_id: organization_id,
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
