import axios from "axios";
export default async function UpdateProker({ token, id, name, lokasi, date, time }) {
  const response = await axios.put(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/edit-rapat-proker/${id}`,
    {
      name: name,
      lokasi: lokasi,
      tanggal: date,
      waktu: time,
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
