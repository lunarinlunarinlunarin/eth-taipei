import Safe from "@safe-global/protocol-kit";
import { SafeTransaction, SafeTransactionDataPartial } from "@safe-global/safe-core-sdk-types";
import { useAccount, useSigner } from "wagmi";
import { ZapInterface } from "../../pages";
import { Button } from "../Button/button";

export const AllowZap = ({ safeSdk }: { safeSdk: Safe | null }) => {
  const { data: signer } = useSigner();
  const { address } = useAccount();
  if (!safeSdk) return null;

  async function zap() {
    if (!signer || !address || !safeSdk) return;
    try {
      const safeTransactionData: SafeTransactionDataPartial = {
        to: "0xb21d04D9278Df116B418ed803d1858E9c3c98a9F",
        data: ZapInterface.encodeFunctionData("addWorker", ["0xAF811bEA365c6d309d4fC1f174bFf78137571851"]),
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
    } catch (error) {}
  }

  return (
    <div className="flex flex-row justify-between">
      <div className="flex flex-row items-center space-x-2">
        <span className="flex flex-col items-center justify-center w-10 h-10 tracking-wide text-white uppercase border rounded-full shadow-lg cursor-pointer border-blue hover:bg-blue bg-primary-500 hover:text-white">
          3
        </span>
        <span className="text-xs">Allowing Gnoberra to swap and provide on your behalf</span>
      </div>
      <Button onClick={() => zap()} primary text="Allow Zap" className="w-36" />
    </div>
  );
};
