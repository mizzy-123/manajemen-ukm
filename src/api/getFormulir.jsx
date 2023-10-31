export default async function GetFormulir(id_ukm, token) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/formulir?organization_id=${id_ukm}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
    cache: "no-store",
  });
  return response;
}
