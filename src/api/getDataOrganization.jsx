export default async function GetDataOrganization({ token, organization_id }) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/data-organization?organization_id=${organization_id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
    cache: "no-store",
  });

  return response;
}
