import axios from "axios";
export default async function PostDaftarUkm({ form_id, name, nim, email, no_telepon, kelamin }) {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/daftar-ukm`,
    {
      form_id: form_id,
      name: name,
      nim: nim,
      no_telepon: no_telepon,
      email: email,
      kelamin: kelamin,
    },
    {
      headers: {
        Accept: "application/json",
      },
    }
  );
  return response;
}
