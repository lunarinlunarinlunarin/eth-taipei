import React from "react";
import { ExternalLinkIcon } from "@heroicons/react/outline";
import Image from "next/image";
import DataTable, { createTheme } from "react-data-table-component";
import { CHAIN_INFO } from "../../../data";
import { useAtom } from "jotai";
import { earningsAtom } from "../../../pages";

const data = [
  { date: new Date(), adTitle: "Subaru", budget: "100", currency: "USDC", views: "100", amount_spend: "1", status: "Active", end_date: new Date() },
  { date: new Date(), adTitle: "Siberru", budget: "1", currency: "USDC", views: "120", amount_spend: "1", status: "Active", end_date: new Date() },
];
export default function AdvertHistory() {
  const [earnings] = useAtom(earningsAtom);
  createTheme("dark", {
    background: {
      default: "transparent",
    },
  });
  const customStyles = {
    rows: {
      style: {
        minHeight: "52px", // override the row height
        background: "transparent",
      },
    },
    head: {
      style: {
        backgroundColor: "#2C343F",
        fontSize: "12px",
        fontWeight: 500,
        borderTopLeftRadius: "8px",
        borderTopRightRadius: "8px",
      },
    },
    subHeader: {
      style: {
        paddingLeft: "0px",
        paddingRight: "0px",
        marginBottom: "6px",
        background: "transparent",
      },
    },
    headCells: {
      style: {
        paddingLeft: "24px",
      },
    },
    cells: {
      style: {
        paddingLeft: "24px", // override the cell padding for data cells
        paddingRight: "12px",
      },
    },
  };

  const columns = [
    {
      name: "DATE",
      cell: (row) => {
        return new Date(row.date).toLocaleDateString("en-us", {
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        });
      },
      minWidth: "200px",
    },
    {
      name: "ADVERTISER",
      selector: (row) => row.adTitle,
    },
    {
      name: "BUDGET",
      cell: (row) => {
        return Number(row.budget).toFixed(2) + " " + row.currency;
      },
    },
    {
      name: "AMOUNT SPEND",
      cell: (row) => {
        return Number(row.budget).toFixed(2) + " " + row.currency;
      },
    },
    {
      name: "VIEWS",
      cell: (row) => {
        return row.views;
      },
    },
    {
      name: "END DATE",
      cell: (row) => {
        return new Date(row.date).toLocaleDateString("en-us", {
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        });
      },
      minWidth: "180px",
    },
    {
      name: "STATUS",
      cell: (row) => {
        return <div className="text-success">{row.status}</div>;
      },
    },
  ];

  return (
    <div className="inline-block min-w-full space-y-4 align-middle" suppressHydrationWarning={true}>
      <div>
        <span className="text-base sm:text-lg">Your total earnings to date:</span>
        <span className="text-xs font-medium sm:text-lg"> ~ 690 USD</span>
      </div>
      <div className="flex flex-row items-center space-x-2">
        <span className="text-base sm:text-lg">Claimable earnings:</span>
        <div className="flex flex-row items-center space-x-2 text-xs font-medium text-success sm:text-lg">
          <span>~{earnings?.toFixed(2)} USD </span>
          <div className="flex w-fit cursor-pointer justify-center rounded-full bg-[#ff948e] px-2 py-3 text-center text-xs text-white sm:px-4 sm:text-sm">
            Claim Rewards
          </div>{" "}
        </div>
      </div>
      <DataTable columns={columns} data={data} customStyles={customStyles} theme="light" pagination />
    </div>
  );
}
