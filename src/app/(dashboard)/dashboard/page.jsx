import { Suspense } from "react";
import LoadingHomeDashboard from "./loading";
import DashboardHomeFeed from "./dashboardHomeFeed";

export default function Dashboard() {
  return (
    <>
      <Suspense fallback={<LoadingHomeDashboard />}>
        <DashboardHomeFeed />
      </Suspense>
    </>
  );
}
