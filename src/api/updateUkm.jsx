import axios from "axios";
export default async function UpdateUkm({ token, organization_id, name_organization }) {
  const response = await axios.put(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/edit-ukm/${organization_id}`,
    {
      name_organization: name_organization,
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
