import { CheckIcon } from "@heroicons/react/24/outline";
import Safe from "@safe-global/protocol-kit";
import { SafeTransaction, SafeTransactionDataPartial } from "@safe-global/safe-core-sdk-types";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { useAccount, useProvider, useSigner } from "wagmi";
import { ZapInterface } from "../../pages";
import { ZAP_MODULE_ADDRESS } from "../../utils/constants";
import { Button } from "../Button/button";
import LoadingDots from "../LoadingDots";
import ZapModule from "../../abi/ZapModule.json";

export const AllowZap = ({ safeSdk, safeAccountAddress, fromToken, toToken }: { safeSdk: Safe | null; safeAccountAddress: string; fromToken; toToken }) => {
  const { data: signer } = useSigner();
  const { address } = useAccount();
  const [isEnabled, setIsEnabled] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const provider = useProvider();

  useEffect(() => {
    const init = async () => {
      const USDC = new ethers.Contract(ZAP_MODULE_ADDRESS, ZapModule, provider);
      const isAuthorized = await USDC.isSafeSourcePairedZappable(safeAccountAddress, fromToken.address, toToken.address);
      setIsEnabled(!!isAuthorized);
    };
    init();
  }, [provider, safeAccountAddress, toToken, fromToken]);
  if (!safeSdk) return null;

  async function zap() {
    if (!signer || !address || !safeSdk) return;
    setIsLoading(true);
    try {
      const safeTransactionData: SafeTransactionDataPartial = {
        to: ZAP_MODULE_ADDRESS,
        data: ZapInterface.encodeFunctionData("addAllowedZap", [fromToken.address, toToken.address]),
        value: "0",
      };

      const safeTransaction: SafeTransaction = await safeSdk?.createTransaction({ safeTransactionData });
      if (safeTransaction) {
        const txResponse = await safeSdk?.executeTransaction(safeTransaction);
        const txResult = await txResponse?.transactionResponse?.wait();
        if (txResult) {
          setIsEnabled(true);
        }
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex flex-row justify-between">
      <div className="flex flex-row items-center space-x-2">
        <span
          className={`border-blue hover:bg-blue flex h-10 w-10 cursor-pointer flex-col items-center justify-center rounded-full border uppercase tracking-wide text-white shadow-lg hover:text-white ${
            isEnabled ? "bg-success" : " bg-primary-500"
          }`}
        >
          {isEnabled ? <CheckIcon className="w-5 h-5" aria-hidden="true" /> : 3}
        </span>
        <span className="text-xs">Allowing Gnoberra to swap and provide on your behalf</span>
      </div>
      <Button
        onClick={() => zap()}
        primary
        text={
          isLoading ? (
            <span className="flex flex-row items-center space-x-1">
              <span>Allowing zap</span>
              <LoadingDots />
            </span>
          ) : (
            "Allow Zap"
          )
        }
        className="text-sm w-44"
        disabled={isEnabled || isLoading}
      />
    </div>
  );
};
