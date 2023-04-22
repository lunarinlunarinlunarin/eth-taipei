import Safe from "@safe-global/protocol-kit";
import { SafeTransaction, SafeTransactionDataPartial } from "@safe-global/safe-core-sdk-types";
import { useEffect, useState } from "react";
import { useAccount, useSigner } from "wagmi";
import { CheckIcon } from "@heroicons/react/24/outline";
import { Button } from "../Button/button";
import { ZAP_MODULE_ADDRESS } from "../../utils/constants";

export const AddModule = ({ safeSdk }: { safeSdk: Safe | null }) => {
  const { data: signer } = useSigner();
  const { address } = useAccount();
  const [isEnabled, setIsEnabled] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const init = async () => {
      const isEnabled = await safeSdk?.isModuleEnabled(ZAP_MODULE_ADDRESS);
      setIsEnabled(!!isEnabled);
    };
    init();
  }, [safeSdk]);

  if (!safeSdk) return null;
  async function addModule() {
    if (!signer || !address || !safeSdk) return;
    try {
      const safeTx = await safeSdk?.createEnableModuleTx(ZAP_MODULE_ADDRESS);
      if (safeTx) {
        const txResponse = await safeSdk?.executeTransaction(safeTx);
        const abc = await txResponse?.transactionResponse?.wait();
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
          {isEnabled ? <CheckIcon className="w-5 h-5" aria-hidden="true" /> : 1}
        </span>
        <span className="text-xs">Grant Gnoberra access to your Safe.</span>
      </div>
      <Button onClick={() => addModule()} primary text="Add Module" className="w-36" disabled={isEnabled} />
    </div>
  );
};
