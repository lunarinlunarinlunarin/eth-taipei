import { ethers } from "ethers";
import Image from "next/image";
import { useAccount, useProvider, useSigner } from "wagmi";
import { USDC_ADDRESS } from "../../data";
import ERC20ABI from "../../abi/ERC20Token.json";
import { Button } from "../Button/button";
import { useState } from "react";
import { constuctExplorerUrl, toValidInput } from "../../utils";
import LoadingDots from "../LoadingDots";

export function TransferFundsToSafe({ safeAccountAddress, decimals, mutateBalance }: { safeAccountAddress: string; decimals: number | null; mutateBalance }) {
  const [amount, setAmount] = useState("");
  const [txhash, setTxHash] = useState<string | null>(null);
  const [transferLoading, setTransferLoading] = useState<boolean>(false);
  const { address } = useAccount();
  const { data: signer } = useSigner();
  const provider = useProvider();

  async function transferFunds() {
    if (!signer || !address || !decimals) return;
    setTransferLoading(true);
    try {
      const USDC = new ethers.Contract(USDC_ADDRESS, ERC20ABI, provider);
      const tx = await USDC.connect(signer).transfer(safeAccountAddress, Number(amount) * Math.pow(10, decimals));
      if (tx) {
        const receipt = await tx.wait();
        if (receipt) {
          setTransferLoading(false);
          setTxHash(receipt.transactionHash);
          mutateBalance();
        }
      }
    } catch (error) {}
  }
  return (
    <div className="flex flex-row items-center justify-center w-full space-x-4">
      {txhash ? (
        <div className="flex flex-col items-center">
          <div>You have successfully transferred funds to your Safe.</div>
          <a className="text-sm underline cursor-pointer text-primary-400" href={constuctExplorerUrl(txhash)} target="_blank" rel="noreferrer">
            View transaction
          </a>
        </div>
      ) : transferLoading ? (
        <div className="flex flex-row items-center w-full space-x-2">
          <span> Transferring funds to Safe </span>
          <LoadingDots />
        </div>
      ) : (
        <div className="flex flex-row items-center space-x-4">
          <div className="relative rounded-md shadow-sm">
            <input
              type="number"
              name="amount"
              id="amunt"
              className="block w-full rounded-md border-0 py-1.5 pl-3 pr-12 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="0.00"
              onChange={(event) => {
                setAmount(toValidInput(event.target.value, /[^0-9.]/g));
              }}
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <span className="text-gray-500 sm:text-sm" id="price-currency">
                USDC
              </span>
            </div>
          </div>
          <Button primary onClick={() => transferFunds()} text="Transfer funds" className="w-fit py-1.5 text-sm" />
        </div>
      )}
    </div>
  );
}
