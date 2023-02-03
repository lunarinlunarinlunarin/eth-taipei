import dynamic from "next/dynamic";
import React, { useState } from "react";
import KYC from "./KYC";
import Settings from "./Settings";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

enum DASHBOARD_VIEW {
  KYC,
  EARN_HISTORY,
  SETTINGS,
}

const tabs = [
  { name: "Earn History", view: DASHBOARD_VIEW.EARN_HISTORY },
  { name: "KYC", view: DASHBOARD_VIEW.KYC },
  { name: "Settings", view: DASHBOARD_VIEW.SETTINGS },
];
export default function UserDashboard() {
  const EarnHistory = dynamic(() => import("./History"), { ssr: false });
  const [view, setView] = useState(DASHBOARD_VIEW.EARN_HISTORY);
  return (
    <div className="flex h-screen w-full flex-wrap py-4 px-8">
      <div className="flex w-full flex-1 flex-col space-y-4">
        <div className="sm:hidden">
          <select
            id="current-tab"
            name="current-tab"
            className="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            defaultValue={tabs.find((tab) => tab.view === view).name}
          >
            {tabs.map((tab) => (
              <option key={tab.name}>{tab.name}</option>
            ))}
          </select>
        </div>
        <div className="hidden sm:block">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => (
              <div
                key={tab.name}
                className={classNames(
                  tab.view === view ? "border-indigo-500 text-indigo-600" : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
                  "whitespace-nowrap border-b-2 px-1 pb-4 text-sm font-medium"
                )}
                onClick={() => setView(tab.view)}
                aria-current={tab.view === view ? "page" : undefined}
              >
                {tab.name}
              </div>
            ))}
          </nav>
        </div>
        {DASHBOARD_VIEW.KYC === view && <KYC />}
        {DASHBOARD_VIEW.SETTINGS === view && <Settings />}
        {DASHBOARD_VIEW.EARN_HISTORY === view && <EarnHistory />}
      </div>
    </div>
  );
}
