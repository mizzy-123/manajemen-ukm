import ActionPage from "./actionPage";
import { cookies } from "next/headers";

export default function Rapat() {
  const cookieStore = cookies();
  const token = cookieStore.get("token");
  const roleid = cookieStore.get("role");
  return <ActionPage token={token} roleid={roleid} />;
}
