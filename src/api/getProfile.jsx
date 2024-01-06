export default async function GetProfile(token) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/profile`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token.value}`,
      Accept: "application/json",
    },
    cache: "no-store",
  });
  return response;
}
