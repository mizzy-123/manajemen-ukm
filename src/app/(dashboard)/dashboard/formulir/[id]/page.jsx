import { cookies } from "next/headers";
import ActionCalonAnggota from "./actionCalonAnggota";

export default function CalonAnggota({ params }) {
  // error bagian tittle dan SWR
  const cookieStore = cookies();
  const token = cookieStore.get("token");
  return (
    <div className="nk-content ">
      <div className="container-fluid">
        <div className="nk-content-inner">
          <ActionCalonAnggota token={token.value} formid={params.id} />
        </div>
      </div>
    </div>
  );
}
