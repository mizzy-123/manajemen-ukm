import axios from "axios";
export default async function UpdateRole({ token, user_id, organization_id, role_id }) {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/ganti-role`,
    {
      user_id: user_id,
      organization_id: organization_id,
      role_id: role_id,
    },
    {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response;
}
