import GetFormulir from "@/api/getFormulir";
import { cookies } from "next/headers";
import ActionTable from "./actionTable";

export default async function LihatCalonAnggota() {
  // const roleid = cookies().get("role");
  const cookieStore = cookies();
  const token = cookieStore.get("token");

  // console.log(data);

  return (
    <div className="nk-content ">
      <div className="container-fluid">
        <div className="nk-content-inner">
          <div className="nk-content-body">
            <div className="components-preview wide-md mx-auto">
              <div className="nk-block-head nk-block-head-lg wide-sm">
                <div className="nk-block-head-content">
                  <div className="nk-block-head-sub">
                    <a className="back-to" href="html/components.html">
                      <em className="icon ni ni-arrow-left"></em>
                      <span>Components</span>
                    </a>
                  </div>
                  <h2 className="nk-block-title fw-normal">Exclusive & Special Table</h2>
                  <div className="nk-block-des">
                    <p className="lead">
                      <strong>Softnio Team</strong> understand the value of <strong>real case-use</strong>, so our team designed some large content base table which is <strong>well optimized</strong> and fit on every screen. It gives you
                      extra ease on your project and surely you loved it.{" "}
                    </p>
                  </div>
                </div>
              </div>
              <div className="nk-block nk-block-lg">
                <div className="nk-block-head">
                  <div className="nk-block-head-content">
                    <h4 className="nk-block-title">Transaction List - With Action</h4>
                    <p>
                      The following table can be use for <strong className="text-primary">invoice, payment history</strong> related transaction.
                    </p>
                  </div>
                </div>
                <ActionTable token={token} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
