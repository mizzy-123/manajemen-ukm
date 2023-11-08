import axios from "axios";
export default async function PostJadwalPiket({ token, mahasiswa_id, hari_id }) {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/add-petugas-piket`,
    {
      mahasiswa_id: mahasiswa_id,
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
