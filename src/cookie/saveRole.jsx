"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export default async function SaveRole({ role }) {
  cookies().set("role", `${role}`);
  revalidatePath("/");
}
