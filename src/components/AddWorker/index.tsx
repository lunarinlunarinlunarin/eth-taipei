import { CheckIcon } from "@heroicons/react/24/outline";
import Safe from "@safe-global/protocol-kit";
import { SafeTransaction, SafeTransactionDataPartial } from "@safe-global/safe-core-sdk-types";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { useAccount, useProvider, useSigner } from "wagmi";
import { ZapInterface } from "../../pages";
import { WORKER_PUBLIC_ADDRESS, ZAP_MODULE_ADDRESS } from "../../utils/constants";
import { Button } from "../Button/button";
import LoadingDots from "../LoadingDots";
import ZapModule from "../../abi/ZapModule.json";

export const AddWorker = ({ safeSdk, safeAccountAddress }: { safeSdk: Safe | null; safeAccountAddress: string }) => {
  const { data: signer } = useSigner();
  const { address } = useAccount();
  const [isEnabled, setIsEnabled] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const provider = useProvider();

  useEffect(() => {
    const init = async () => {
      const USDC = new ethers.Contract(ZAP_MODULE_ADDRESS, ZapModule, provider);
      const isAuthorized = await USDC.isWorkerAuthorized(safeAccountAddress, WORKER_PUBLIC_ADDRESS);
      setIsEnabled(!!isAuthorized);
    };
    init();
  }, [provider, safeAccountAddress]);

  if (!safeSdk) return null;

  async function addWorker() {
    if (!signer || !address || !safeSdk) return;
    try {
      setIsLoading(true);
      const safeTransactionData: SafeTransactionDataPartial = {
        to: ZAP_MODULE_ADDRESS,
        data: ZapInterface.encodeFunctionData("addWorker", [WORKER_PUBLIC_ADDRESS]),
        value: "0",
      };

      const safeTransaction: SafeTransaction = await safeSdk?.createTransaction({ safeTransactionData });
      // const nonce = safeService.getNextNonce(safeSdk.getAddress());
      // const safeTxHash = await safeSdk.getTransactionHash(safeTransaction);
      // const senderSignature = await safeSdk.signTransactionHash(safeTxHash);
      // const tx = await safeService.proposeTransaction({
      //   safeAddress: safeSdk.getAddress(),
      //   safeTransactionData: safeTransaction.data,
      //   safeTxHash,
      //   senderAddress: address,
      //   senderSignature: senderSignature.data,
      //   origin: "GNOBERRA",
      // });
      const executeTxResponse = await safeSdk.executeTransaction(safeTransaction);
      const receipt = executeTxResponse.transactionResponse && (await executeTxResponse.transactionResponse.wait());
      if (receipt) {
        setIsEnabled(true);
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
          {isEnabled ? <CheckIcon className="w-5 h-5" aria-hidden="true" /> : 2}
        </span>
        <span className="text-xs">Allowing Gnoberra to execute your transactions on your behalf. </span>
      </div>
      <Button
        onClick={() => addWorker()}
        primary
        text={
          isLoading ? (
            <span className="flex flex-row items-center space-x-1">
              <span>Adding worker</span>
              <LoadingDots />
            </span>
          ) : (
            "Add Worker"
          )
        }
        className="text-sm w-44"
        disabled={isEnabled || isLoading}
      />
    </div>
  );
};
