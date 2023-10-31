export default async function GetMyOrganization(token) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/myorganization`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
    cache: "no-store",
  });
  return response;
}
