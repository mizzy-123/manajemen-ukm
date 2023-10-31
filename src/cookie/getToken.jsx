"use server";
import { cookies } from "next/headers";
export default async function GetToken() {
  const cookieStore = cookies();
  const getToken = cookieStore.get("token");
  return getToken;
}
