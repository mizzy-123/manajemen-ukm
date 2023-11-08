import axios from "axios";
export default async function UpdateUserPiket({ token, userpiket_id, hari_id }) {
  const response = await axios.put(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/update-petugas-piket`,
    {
      userpiket_id: userpiket_id,
      hari_id: hari_id,
    },
    {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token.value}`,
      },
    }
  );
  return response;
}
