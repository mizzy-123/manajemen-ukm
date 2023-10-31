"use server";

import { cookies } from "next/headers";

export default async function CekRole() {
  if (cookies().has("role")) {
    return true;
  } else {
    return false;
  }
}
