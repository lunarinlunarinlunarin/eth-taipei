import React, { useState } from "react";
import Create from "./Create";
import AdvertHistory from "./History";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

enum DASHBOARD_VIEW {
  CREATE,
  HISTORY,
  ANALYTICS,
}

const tabs = [
  { name: "Create Campaign", view: DASHBOARD_VIEW.CREATE },
  { name: "Campaign History", view: DASHBOARD_VIEW.HISTORY },
  { name: "Settings", view: DASHBOARD_VIEW.ANALYTICS },
];

export default function CreateAdvert() {
  const [view, setView] = useState(DASHBOARD_VIEW.CREATE);

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
        {DASHBOARD_VIEW.CREATE === view && <Create />}
        {DASHBOARD_VIEW.HISTORY === view && <AdvertHistory />}
      </div>
    </div>
  );
}
