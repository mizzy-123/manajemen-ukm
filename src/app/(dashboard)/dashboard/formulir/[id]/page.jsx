import { cookies } from "next/headers";
import ActionCalonAnggota from "./actionCalonAnggota";
import ActionPage from "./actionPage";

export default function CalonAnggota({ params }) {
  // error bagian tittle dan SWR
  const cookieStore = cookies();
  const token = cookieStore.get("token");
  return <ActionPage token={token} params={params} />;
}
