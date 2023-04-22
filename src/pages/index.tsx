import BaseLayout from "../layouts/base";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { gnosis } from "wagmi/chains";
import { useAccount, useConnect, useEnsName, useProvider } from "wagmi";
import { useSigner } from "wagmi";
import Safe, { SafeFactory, EthersAdapter, SafeAccountConfig } from "@safe-global/protocol-kit";
import { BigNumber, ethers } from "ethers";
import ERC20ABI from "../abi/ERC20Token.json";
import { useEffect, useState } from "react";
const SALT = "1234567890";
const USDC_ADDRESS = "0xDDAfbb505ad214D7b80b1f830fcCc89B60fb7A83";
export default function Home() {
  const [safeSdk, setSafeSdk] = useState<Safe | null>(null);
  const [safeAccountAddress, setSafeAccountAddress] = useState("");
  const [userUSDCBalance, setUserUSDCBalance] = useState(0);
  const { address, isConnected } = useAccount();
  const connector = new MetaMaskConnector({
    chains: [gnosis],
  });
  const { connect } = useConnect({
    connector: connector,
  });
  const provider = useProvider();
  const { data: signer } = useSigner();

  async function transferFunds() {
    if (!signer || !address) return;
    const USDC = new ethers.Contract(USDC_ADDRESS, ERC20ABI, provider);

    const result = await USDC.connect(signer).transfer(safeAccountAddress, 100);
  }
  useEffect(() => {
    const init = async () => {
      if (!signer || !address) return;
      const ethAdapter = new EthersAdapter({
        ethers,
        signerOrProvider: signer,
      });
      const safeAccountConfig: SafeAccountConfig = {
        owners: [address],
        threshold: 1,
      };
      const USDC = new ethers.Contract(USDC_ADDRESS, ERC20ABI, provider);
      const usdcBalance: BigNumber = await USDC.connect(signer).balanceOf(address);
      const decimals: number = await USDC.decimals();
      setUserUSDCBalance(usdcBalance.toNumber() / Math.pow(10, decimals));
      const safeDeploymentConfig = { saltNonce: SALT };
      const safeFactory = await SafeFactory.create({ ethAdapter });
      const safeAddress = await safeFactory.predictSafeAddress({ safeAccountConfig, safeDeploymentConfig });
      if (safeAddress) {
        setSafeAccountAddress(safeAddress);
        const safeSdk: Safe = await Safe.create({ ethAdapter, safeAddress });
        setSafeSdk(safeSdk);
      }
    };
    init();
  }, [address, provider, signer]);

  return (
    <div className="flex flex-col w-full min-h-screen py-2">
      <div className="mx-8 flex h-[calc(100vw-100px)] w-full flex-col items-center">
        <button onClick={() => connect()}>Connect Wallet</button>
        {isConnected ? (
          <div>
            <div>{safeSdk && safeSdk.getAddress()}</div>
            <div>Your safe has {userUSDCBalance?.toString()} USDC</div>
            <div onClick={() => transferFunds()} className="cursor-pointer">
              Transfer funds
            </div>
          </div>
        ) : (
          <div>312</div>
        )}
      </div>
    </div>
  );
}

Home.getLayout = (currentPage) => <BaseLayout>{currentPage}</BaseLayout>;
