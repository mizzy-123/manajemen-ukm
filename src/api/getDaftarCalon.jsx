export default async function GetDaftarCalon({ token, formid, page, search }) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/daftar-calon?form_id=${formid}&search=${search !== null ? search : ""}&page=${page !== null ? page : ""}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
    cache: "no-store",
  });

  return response;
}
