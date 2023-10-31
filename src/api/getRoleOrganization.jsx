"use server";
import axios from "axios";
import { cookies } from "next/headers";

export default async function GetRoleOrganization({ token }) {
  const cookieStore = cookies();
  const getToken = cookieStore.get("token");
  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/myrole`, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${getToken.value}`,
    },
  });

  return response;
}
