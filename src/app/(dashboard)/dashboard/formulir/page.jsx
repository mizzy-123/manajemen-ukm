import GetFormulir from "@/api/getFormulir";
import { cookies } from "next/headers";
import ActionTable from "./actionTable";
import ActionPage from "./actionPage";

export default async function LihatCalonAnggota() {
  // const roleid = cookies().get("role");
  const cookieStore = cookies();
  const token = cookieStore.get("token");
  const roleid = cookieStore.get("role");

  // console.log(data);

  return <ActionPage token={token} roleid={roleid} />;
}
