import { Outlet } from "react-router-dom";
import HeaderTabs from "../landing/Header";

export default function AppLayout() {
  return (
    <>
      <HeaderTabs />
      <Outlet />
    </>
  );
}
