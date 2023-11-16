import axios from "axios";

export default async function PostTambahUkm({ token, name_organization, name, nim, email, password }) {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/tambah-ukm`,
    {
      name_organization: name_organization,
      name: name,
      nim: nim,
      email: email,
      password: password,
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
