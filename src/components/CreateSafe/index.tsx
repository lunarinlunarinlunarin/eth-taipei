import { ethers } from "ethers";
import Image from "next/image";
import { useAccount, useProvider, useSigner } from "wagmi";
import { SALT, USDC_ADDRESS } from "../../data";
import ERC20ABI from "../../abi/ERC20Token.json";
import { Button } from "../Button/button";
import { useState } from "react";
import { constuctExplorerUrl, toValidInput } from "../../utils";
import LoadingDots from "../LoadingDots";
import Safe, { SafeAccountConfig, SafeFactory } from "@safe-global/protocol-kit";

export function CreateSafe({ safeFactory, setSafeSdk }: { safeFactory: SafeFactory | null; setSafeSdk }) {
  const { address } = useAccount();
  async function createSafe() {
    if (!safeFactory || !address) return;
    const owners = [address];
    const threshold = 1;
    const safeAccountConfig: SafeAccountConfig = {
      owners,
      threshold,
    };
    try {
      const safeSdk: Safe = await safeFactory.deploySafe({ safeAccountConfig, safeDeploymentConfig: { saltNonce: SALT } });
      if (safeSdk) setSafeSdk(safeSdk);
    } catch (error) {
      console.log(error);
    }
  }
  if (!safeFactory) return null;
  return <Button primary onClick={() => createSafe()} text="Create Safe" />;
}
