import axios from "axios";

export default async function PostTambahProker({ token, name, organization_id, lokasi, tanggal, waktu }) {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/rapat-proker`,
    {
      organization_id: organization_id,
      name: name,
      lokasi: lokasi,
      tanggal: tanggal,
      waktu: waktu,
    },
    {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response;
}
