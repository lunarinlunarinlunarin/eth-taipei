import { BigNumber, ethers } from "ethers";
import ERC20ABI from "../abi/ERC20Token.json";
import { useProvider, useSigner } from "wagmi";
import useSWR from "swr";

export function useUserBalance(safeAddress: string, token: any) {
  const provider = useProvider();
  const { data: signer } = useSigner();
  const key = `${safeAddress}-${token.address}`;

  const { data, mutate } = useSWR(token && signer && safeAddress ? [key] : null, async (key) => {
    if (!token || !signer || !safeAddress) return { tokenBalance: 0, decimals: 0 };
    const tokenContract = new ethers.Contract(token.address, ERC20ABI, provider);
    const tokenBalance: BigNumber = await tokenContract.connect(signer).balanceOf(safeAddress);

    const decimals: number = await tokenContract.decimals();
    return { tokenBalance: tokenBalance.toNumber() / Math.pow(10, decimals), decimals };
  });
  const { tokenBalance, decimals } = data || { tokenBalance: 0, decimals: 0 };
  return {
    tokenBalance,
    decimals,
    mutate,
  };
}
