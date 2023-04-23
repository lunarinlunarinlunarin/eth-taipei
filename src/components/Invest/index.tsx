import { BigNumber, ethers } from "ethers";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { toValidInput } from "../../utils";
import ERC20ABI from "../../abi/ERC20Token.json";
import { useProvider, useSigner } from "wagmi";

export const Invest = ({ token, safeAddress, setAmount }) => {
  const [userBalance, setUserBalance] = useState<number>(0);
  const provider = useProvider();
  const { data: signer } = useSigner();

  useEffect(() => {
    if (!signer) return;
    const init = async () => {
      const USDC = new ethers.Contract(token.address, ERC20ABI, provider);
      const usdcBalance: BigNumber = await USDC.connect(signer).balanceOf(safeAddress);
      const decimals: number = await USDC.decimals();
      setUserBalance(usdcBalance.toNumber() / Math.pow(10, decimals));
    };
    init();
  });
  return (
    <div className="flex flex-col p-4 space-y-2" style={{ background: "#fff", marginBottom: "1rem", borderRadius: "10px" }}>
      <span>How much {token.label} do you want to invest?</span>
      <div className="relative w-1/2 rounded-md shadow-sm ">
        <input
          type="number"
          name="amount"
          className="block w-full p-3 pr-12 text-gray-900 border-0 rounded-md ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder="0.00"
          onChange={(event) => {
            setAmount(toValidInput(event.target.value, /[^0-9.]/g));
          }}
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-2 space-x-1 pointer-events-none">
          <Image height={25} width={25} src={token?.logo} alt="Brand Logo" className="hover:cursor-pointer" />
          <span className="text-mono sm:text-sm" id="price-currency">
            {token.label}
          </span>
        </div>
      </div>
      <div className="text-xs">
        In wallet: {userBalance} {token.label}
      </div>
    </div>
  );
};
