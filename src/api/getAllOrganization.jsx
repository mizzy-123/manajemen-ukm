export default async function GetAllOrganization({ token }) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/all-organization`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
    cache: "no-store",
  });

  return response;
}
