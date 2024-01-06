"use server";

import { cookies } from "next/headers";

export default async function saveEmail({ email }) {
  const exp = 7200;
  cookies().set("email", email, { maxAge: exp });
  // cookies().delete("token");
  // const cookieStore = cookies();
  // const getToken = cookieStore.get("token");
  // console.log(getToken);
  // localStorage.setItem("token", token);
}
