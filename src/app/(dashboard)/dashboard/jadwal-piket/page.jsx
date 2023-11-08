import { cookies } from "next/headers";
import ActionTablePiket from "./actionTablePiket";
import ActionPage from "./actionPage";

export default function JadwalPiket() {
  const cookieStore = cookies();
  const token = cookieStore.get("token");
  const roleid = cookieStore.get("role");

  return <ActionPage token={token} roleid={roleid.value} />;
}
