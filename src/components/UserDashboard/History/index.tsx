import React from "react";
import { ExternalLinkIcon } from "@heroicons/react/outline";
import Image from "next/image";
import DataTable, { createTheme } from "react-data-table-component";
import { CHAIN_INFO } from "../../../data";
import { useAtom } from "jotai";
import { earningsAtom } from "../../../pages";

const data = [
  { date: new Date(), advertiser: "Apple", unit_amount: "1", currency: "USDC", chain_id: "1" },
  { date: new Date("2023-01-10T17:35:40.000Z"), advertiser: "Lamborghini", unit_amount: "1", currency: "USDC", chain_id: "1" },
  { date: new Date("2023-01-11T17:35:40.000Z"), advertiser: "Suberra", unit_amount: "100", currency: "SUB", chain_id: "42161" },
  { date: new Date("2023-01-12T17:35:40.000Z"), advertiser: "Lamborghini", unit_amount: "2", currency: "USDT", chain_id: "137" },
  { date: new Date("2023-01-13T17:35:40.000Z"), advertiser: "Korean Air", unit_amount: "3", currency: "ETH", chain_id: "1" },
  { date: new Date("2023-01-14T17:35:40.000Z"), advertiser: "Do-Kwon", unit_amount: "0.5", currency: "Luna", chain_id: "137" },
  { date: new Date("2023-01-15T17:35:40.000Z"), advertiser: "Sam Bankman-Fried", unit_amount: "69   ", currency: "JailDollars", chain_id: "43114" },
  { date: new Date("2023-01-16T17:35:40.000Z"), advertiser: "Su Zhu", unit_amount: "0.2", currency: "Eth", chain_id: "42161" },
  { date: new Date("2023-01-17T17:35:40.000Z"), advertiser: "Kyle Davies", unit_amount: "0.1", currency: "Matic", chain_id: "1" },
  { date: new Date("2023-01-18T17:35:40.000Z"), advertiser: "Vitalik", unit_amount: "1222", currency: "Eth", chain_id: "42161" },
  { date: new Date("2023-01-19T17:35:40.000Z"), advertiser: "CZ", unit_amount: "0.8", currency: "Avax", chain_id: "1" },
  { date: new Date("2023-01-20T17:35:40.000Z"), advertiser: "Edison", unit_amount: "1.2", currency: "USDC", chain_id: "43114" },
  { date: new Date("2023-01-21T17:35:40.000Z"), advertiser: "Zac", unit_amount: "1.3", currency: "USDC", chain_id: "1" },
];
export default function EarnHistory() {
  const [earnings, setEarnings] = useAtom(earningsAtom);
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
      selector: (row) => row.advertiser,
    },
    {
      name: "AMOUNT EARNED",
      cell: (row) => {
        return Number(row.unit_amount).toFixed(2) + " " + row.currency;
      },
    },
    {
      name: "NETWORK",
      cell: (row) => {
        return (
          <div className="flex flex-row items-center space-x-1">
            <Image src={CHAIN_INFO[row.chain_id]?.logo} alt="chain logo" height={16} width={16} />
            <div>{CHAIN_INFO[row.chain_id]?.label}</div>
          </div>
        );
      },
    },
    {
      name: "TRANSACTION HASH",
      cell: (row) => {
        return (
          <div className="flex cursor-pointer flex-row items-center space-x-1 text-xs text-primary-500 dark:text-[#97BDF5] 2xl:text-sm">
            <span onClick={() => {}}>View Transaction</span>
            <ExternalLinkIcon className="h-4" />
          </div>
        );
      },
      minWidth: "180px",
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
