import { cookies } from "next/headers";
import ActionPage from "./actionPage";

export default async function EditUkm() {
  const cookieStore = cookies();
  const token = cookieStore.get("token");
  const roleid = cookieStore.get("role");
  return <ActionPage token={token} roleid={roleid} />;
}
