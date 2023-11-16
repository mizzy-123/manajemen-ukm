import GetUser from "@/api/getUser";
import { cookies } from "next/headers";
import Link from "next/link";
export default async function DashboardHomeFeed() {
  const token = cookies().get("token");
  const user = await GetUser({ token: token.value });
  return (
    <div className="nk-content ">
      <div className="container-fluid">
        <div className="nk-content-inner">
          <div className="nk-content-body">
            <div className="nk-block-head nk-block-head-sm">
              <div className="nk-block-between">
                <div className="nk-block-head-content">
                  <h3 className="nk-block-title page-title">Selamat datang {user.data.data.name}</h3>
                </div>
                {/* <!-- .nk-block-head-content --> */}

                {/* <!-- .nk-block-head-content --> */}
              </div>
              {/* <!-- .nk-block-between --> */}
            </div>
            {/* <!-- .nk-block-head --> */}

            {/* // <!-- .nk-block --> */}
          </div>
        </div>
      </div>
    </div>
  );
}
