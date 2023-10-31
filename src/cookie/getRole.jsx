"use server";
import { cookies } from "next/headers";
export default async function GetRole() {
  const cookieStore = cookies();
  const getToken = cookieStore.get("role");
  return getToken;
}
