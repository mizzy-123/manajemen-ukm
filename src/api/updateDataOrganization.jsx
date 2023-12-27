import axios from "axios";

export default async function UpdateDataOrganization({ token, organization_id, name_organization, foto, misi, visi }) {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/update-data-organization/${organization_id}`,
    {
      name_organization: name_organization,
      foto: foto,
      misi: misi,
      visi: visi,
    },
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response;
}
