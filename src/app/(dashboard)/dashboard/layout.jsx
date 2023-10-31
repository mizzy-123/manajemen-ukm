import Footer from "@/components/dashboard/footer";
import Header from "@/components/dashboard/header";
import Sidebar from "@/components/dashboard/sidebar";
import { cookies } from "next/headers";

export const metadata = {
  title: "Dashboard ukm",
  description: "Generated by create next app",
};

export default function DashboardLayout({ children }) {
  const roleid = cookies().get("role");
  const cookieStore = cookies();
  const token = cookieStore.get("token");
  return (
    <>
      <div className="nk-app-root">
        {/* <!-- main @s --> */}
        <div className="nk-main ">
          {/* <!-- sidebar @s --> */}
          <Sidebar role={roleid.value} />
          {/* <!-- sidebar @e --> */}
          {/* <!-- wrap @s --> */}
          <div className="nk-wrap ">
            {/* <!-- main header @s --> */}
            <Header roleid={roleid.value} token={token.value} />
            {/* <!-- main header @e --> */}
            {/* <!-- content @s --> */}
            {children}
            {/* <!-- content @e --> */}
            {/* <!-- footer @s --> */}
            <Footer />
            {/* <!-- footer @e --> */}
          </div>
          {/* <!-- wrap @e --> */}
        </div>
        {/* <!-- main @e --> */}
      </div>
      {/* </div> */}
    </>
  );
}
