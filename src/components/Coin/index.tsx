import Safe from "@safe-global/protocol-kit";
import { SafeTransaction, SafeTransactionDataPartial } from "@safe-global/safe-core-sdk-types";
import { useAccount, useSigner } from "wagmi";
import { ZapInterface } from "../../pages";
import { Button } from "../Button/button";
import React from "react";

export const Coin = ({ fromValue, toValue }) => {

  return (
    <div className="flex flex-row justify-between" style={{padding: '2rem', background: '#fff', marginBottom: '1rem', borderRadius: '10px'}}>
      <div className="flex flex-row items-center space-x-2">
        <span className="text-xs">From</span>
        <span className="text-xs">{fromValue}</span>
      </div>
      <div className="flex flex-row items-center space-x-2">
        <span className="text-xs">To</span>
        <span className="text-xs">{toValue}</span>
      </div>
    </div>
  );
};
