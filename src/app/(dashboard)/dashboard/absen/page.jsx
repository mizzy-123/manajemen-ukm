import { cookies } from "next/headers";
import ActionPage from "./actionPage";

export default function Absen() {
  const cookieStore = cookies();
  const token = cookieStore.get("token");
  const roleid = cookieStore.get("role");
  return (
    <div className="nk-content">
      <div className="container-fluid">
        <div className="nk-content-inner">
          <div className="nk-content-body">
            <ActionPage token={token} roleid={roleid} />
          </div>
        </div>
      </div>
    </div>
  );
}
