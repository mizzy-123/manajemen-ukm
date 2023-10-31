"use server";

import { cookies } from "next/headers";

export default async function saveToken({ token }) {
  const exp = 7200;
  cookies().set("token", token, { maxAge: exp });
  // cookies().delete("token");
  // const cookieStore = cookies();
  // const getToken = cookieStore.get("token");
  // console.log(getToken);
  // localStorage.setItem("token", token);
}
