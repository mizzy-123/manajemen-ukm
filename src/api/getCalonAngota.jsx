export default async function GetCalonAnggota(id_formulir, token) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/daftar-calon?form_id=${id_ukm}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
    cache: "no-store",
  });
  return response;
}
