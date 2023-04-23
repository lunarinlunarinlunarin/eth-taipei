import { Switch } from "@headlessui/react";
import { Interval } from "@prisma/client";
import React from "react";
export const ExecutePeriod = ({ interval, setInterval }) => {
  return (
    <div className="flex flex-row items-center p-4 space-x-4" style={{ background: "#fff", marginBottom: "1rem", borderRadius: "10px" }}>
      <span>Executes</span>
      <div className="flex flex-row items-center justify-center space-x-2">
        <Switch
          checked={interval === Interval.MONTH}
          onChange={(check) => (check ? setInterval(Interval.MONTH) : setInterval(Interval.WEEK))}
          className={`relative inline-flex h-8 w-32 items-center rounded-full bg-gray-200`}
          name="Monthly"
        >
          <div className="flex flex-row justify-between w-full h-full">
            <span
              className={`flex w-16 flex-row items-center justify-center rounded-full text-xs ${
                interval === Interval.WEEK ? "bg-blue-600 text-white" : "bg-gray-200"
              }`}
            >
              Weekly
            </span>
            <span
              className={`flex w-16 flex-row items-center justify-center rounded-full text-xs ${
                interval === Interval.MONTH ? "bg-blue-600 text-white" : "bg-gray-200"
              }`}
            >
              Monthly
            </span>
          </div>
        </Switch>
      </div>
    </div>
  );
};
