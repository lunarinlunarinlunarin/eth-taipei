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
import { PAGE_VIEW } from "../../pages";

export function CreateSafe({ safeFactory, setSafeSdk, setView }: { safeFactory: SafeFactory | null; setSafeSdk; setView }) {
  const { address } = useAccount();
  const [isLoading, setIsLoading] = useState(false);
  async function createSafe() {
    if (!safeFactory || !address) return;
    setIsLoading(true);
    const owners = [address];
    const threshold = 1;
    const safeAccountConfig: SafeAccountConfig = {
      owners,
      threshold,
    };
    try {
      const safeSdk: Safe = await safeFactory.deploySafe({ safeAccountConfig, safeDeploymentConfig: { saltNonce: SALT } });
      if (safeSdk) {
        setSafeSdk(safeSdk);
        setView(PAGE_VIEW.HAS_WALLET);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }
  if (!safeFactory) return null;
  return (
    <div className="flex flex-col space-y-2">
      <div>You need to create a Safe before using Gnoberra</div>
      <Button
        primary
        className="flex items-center h-12 w-80"
        onClick={() => createSafe()}
        text={
          isLoading ? (
            <span className="flex flex-row space-x-2">
              <span>Creating a Safe</span>
              <LoadingDots />
            </span>
          ) : (
            "Create Safe"
          )
        }
        disabled={isLoading}
      />
    </div>
  );
}
