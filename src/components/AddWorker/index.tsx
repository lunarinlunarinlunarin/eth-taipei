import Safe from "@safe-global/protocol-kit";
import { SafeTransaction, SafeTransactionDataPartial } from "@safe-global/safe-core-sdk-types";
import { useAccount, useSigner } from "wagmi";
import { ZapInterface } from "../../pages";
import { Button } from "../Button/button";

export const AddWorker = ({ safeSdk }: { safeSdk: Safe | null }) => {
  const { data: signer } = useSigner();
  const { address } = useAccount();
  if (!safeSdk) return null;

  async function addWorker() {
    if (!signer || !address || !safeSdk) return;

    try {
      const safeTransactionData: SafeTransactionDataPartial = {
        to: "0xb21d04D9278Df116B418ed803d1858E9c3c98a9F",
        data: ZapInterface.encodeFunctionData("addAllowedZap", ["0xDDAfbb505ad214D7b80b1f830fcCc89B60fb7A83", "0x6A023CCd1ff6F2045C3309768eAd9E68F978f6e1"]),
        value: "0",
      };

      const safeTransaction: SafeTransaction = await safeSdk?.createTransaction({ safeTransactionData });
      if (safeTransaction) {
        const txResponse = await safeSdk?.executeTransaction(safeTransaction);
        const abc = await txResponse?.transactionResponse?.wait();
      }
    } catch (error) {}
  }

  return (
    <div className="flex flex-row justify-between">
      <div className="flex flex-row items-center space-x-2">
        <span className="flex flex-col items-center justify-center w-10 h-10 tracking-wide text-white uppercase border rounded-full shadow-lg cursor-pointer border-blue hover:bg-blue bg-primary-500 hover:text-white">
          2
        </span>
        <span className="text-xs">Allowing Gnoberra to execute your transactions on your behalf. </span>
      </div>
      <Button onClick={() => addWorker()} primary text="Add Worker" className="w-36" />
    </div>
  );
};
