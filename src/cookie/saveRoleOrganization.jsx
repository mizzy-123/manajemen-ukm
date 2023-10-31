"use server";

import { cookies } from "next/headers";

export default async function saveRoleOrganization({ data }) {
  cookies().set("me", data);
}
