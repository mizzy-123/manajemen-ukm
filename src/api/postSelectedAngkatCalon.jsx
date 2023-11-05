import axios from "axios";

export default async function PostSelectedAngkatCalon({ selectedData, token }) {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/select-angkat-calon`,
    {
      data: selectedData,
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
