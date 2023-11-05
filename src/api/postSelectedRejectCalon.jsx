import axios from "axios";

export default async function PostSelectedRejectCalon({ selectedData, token }) {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/select-reject-calon`,
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
