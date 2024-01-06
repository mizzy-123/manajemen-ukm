import { cookies } from "next/headers";
import ActionPage from "./actionPage";
import GetProfile from "@/api/getProfile";

export default async function Personal() {
  const cookieStore = cookies();
  const token = cookieStore.get("token");
  const roleid = cookieStore.get("role");
  const dataProfile = await GetProfile(token);
  const profileJson = await dataProfile.json();
  return <ActionPage token={token} roleid={roleid} profile={profileJson} />;
}
