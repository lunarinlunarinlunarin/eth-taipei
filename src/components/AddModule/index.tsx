import Safe from "@safe-global/protocol-kit";
import { SafeTransaction, SafeTransactionDataPartial } from "@safe-global/safe-core-sdk-types";
import { useAccount, useSigner } from "wagmi";
import { ZapInterface } from "../../pages";
import { Button } from "../Button/button";

export const AddModule = ({ safeSdk }: { safeSdk: Safe | null }) => {
  const { data: signer } = useSigner();
  const { address } = useAccount();
  if (!safeSdk) return null;

  async function addModule() {
    if (!signer || !address || !safeSdk) return;
    const safeTx = await safeSdk?.createEnableModuleTx("0xb21d04D9278Df116B418ed803d1858E9c3c98a9F");
    if (safeTx) {
      const txResponse = await safeSdk?.executeTransaction(safeTx);
      const abc = await txResponse?.transactionResponse?.wait();
    }
  }

  return (
    <div className="flex flex-row justify-between">
      <div className="flex flex-row items-center space-x-2">
        <span className="flex flex-col items-center justify-center w-10 h-10 tracking-wide text-white uppercase border rounded-full shadow-lg cursor-pointer border-blue hover:bg-blue bg-primary-500 hover:text-white">
          1
        </span>
        <span className="text-xs">Grant Gnoberra access to your Safe.</span>
      </div>
      <Button onClick={() => addModule()} primary text="Add Module" className="w-36" />
    </div>
  );
};
