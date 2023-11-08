import { cookies } from "next/headers";
import ActionTablePiket from "./actionTablePiket";
import ActionPage from "./actionPage";

export default function JadwalPiket() {
  const cookieStore = cookies();
  const token = cookieStore.get("token");
  const roleid = cookieStore.get("role");

  return (
    <ActionPage token={token} roleid={roleid.value}>
      <div className="nk-content ">
        <div className="container-fluid">
          <div className="nk-content-inner">
            <div className="nk-content-body">
              <ActionTablePiket token={token} roleid={roleid.value} />
            </div>
          </div>
        </div>
      </div>
    </ActionPage>
  );
}
