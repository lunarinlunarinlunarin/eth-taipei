import { useDynamicContext } from "@dynamic-labs/sdk-react";
import dynamic from "next/dynamic";
import router from "next/router";
import { useEffect } from "react";
import Header from "../components/Header";
import SideMenu from "../components/SideMenu";

export default function DashboardLayout({ children }) {
  const SideMenu = dynamic(() => import("../components/SideMenu"), { ssr: false });
  const { isAuthenticated } = useDynamicContext();

  return (
    <div className="flex h-screen w-full flex-auto">
      <SideMenu />
      <div className="flex-grow-1 flex max-h-screen w-full flex-col overflow-auto bg-[#F6F7F9]">{children}</div>
    </div>
  );
}
