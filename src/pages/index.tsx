import BaseLayout from "../layouts/base";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { gnosis } from "wagmi/chains";
import { useAccount, useConnect, useDisconnect, useProvider } from "wagmi";
import { useSigner } from "wagmi";
import Safe, { SafeFactory, EthersAdapter, SafeAccountConfig } from "@safe-global/protocol-kit";
import { BigNumber, ethers } from "ethers";
import ERC20ABI from "../abi/ERC20Token.json";
import { useEffect, useState } from "react";
import { Button } from "../components/Button/button";
import { truncate } from "../utils";
import { SALT, USDC_ADDRESS } from "../data";
import { TransferFundsToSafe } from "../components/TransferFundsToSafe";
import Image from "next/image";
import { CreateSafe } from "../components/CreateSafe";
import { ConnectScreen } from "../components/ConnectScreen";
import LoadingDots from "../components/LoadingDots";
import LoadingScreen from "../components/LoadingScreen";
import { AllowZap } from "../components/AllowZap";
import { useSafeAppsSDK } from "@gnosis.pm/safe-apps-react-sdk";
import zapAbi from "../abi/ZapModule.json";
import { Interface } from "@ethersproject/abi";
import { SafeTransaction, SafeTransactionDataPartial } from "@safe-global/safe-core-sdk-types";
import { AddWorker } from "../components/AddWorker";
import { AddModule } from "../components/AddModule";

export const ZapInterface = new Interface(zapAbi);

export const useIsMounted = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
};

enum PAGE_VIEW {
  CONNECT,
  CREATE,
  HAS_WALLET,
}
export default function Home() {
  const isMounted = useIsMounted();
  const [view, setView] = useState<PAGE_VIEW>(PAGE_VIEW.CONNECT);
  const [safeSdk, setSafeSdk] = useState<Safe | null>(null);
  const [safeAccountAddress, setSafeAccountAddress] = useState("");
  const [userUSDCBalance, setUserUSDCBalance] = useState(0);
  const [safeFactory, setSafefactory] = useState<SafeFactory | null>(null);
  const [decimals, setDecimals] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const provider = useProvider();
  const { data: signer } = useSigner();

  useEffect(() => {
    const init = async () => {
      if (!isConnected) setView(PAGE_VIEW.CONNECT);
      if (!signer || !address) return;
      setIsLoading(true);
      const ethAdapter = new EthersAdapter({
        ethers,
        signerOrProvider: signer,
      });
      const safeAccountConfig: SafeAccountConfig = {
        owners: [address],
        threshold: 1,
      };

      const safeDeploymentConfig = { saltNonce: SALT };
      const safeFactory = await SafeFactory.create({ ethAdapter });
      if (safeFactory) setSafefactory(safeFactory);
      const safeAddress = await safeFactory.predictSafeAddress({ safeAccountConfig, safeDeploymentConfig });
      if (safeAddress) {
        setSafeAccountAddress(safeAddress);
        const USDC = new ethers.Contract(USDC_ADDRESS, ERC20ABI, provider);
        const usdcBalance: BigNumber = await USDC.connect(signer).balanceOf(safeAddress);
        const decimals: number = await USDC.decimals();
        setDecimals(decimals);
        setUserUSDCBalance(usdcBalance.toNumber() / Math.pow(10, decimals));
        try {
          const safeSdk: Safe = await Safe.create({ ethAdapter, safeAddress });
          setSafeSdk(safeSdk);
          const a = await safeSdk.getModules();
          setView(PAGE_VIEW.HAS_WALLET);
        } catch (error) {
          setView(PAGE_VIEW.CREATE);
        }
      }
      setIsLoading(false);
    };
    init();
  }, [isConnected, address, signer]);

  if (!isMounted) return null;

  return (
    <div className="flex flex-col w-full min-h-screen py-2">
      <div className="mx-8 flex h-[calc(100vw-100px)] w-full flex-col items-start">
        <Image height={30} width={115} src="/logo.png" alt="Brand Logo" />

        {isLoading ? (
          <LoadingDots />
        ) : PAGE_VIEW.CONNECT === view ? (
          <ConnectScreen />
        ) : PAGE_VIEW.CREATE === view ? (
          <CreateSafe safeFactory={safeFactory} setSafeSdk={setSafeSdk} />
        ) : (
          <div className="flex w-[600px] flex-col space-y-4">
            <div className="flex flex-col">
              <span className="">Safe Address</span>
              <span className="text-xs"> {truncate(safeSdk?.getAddress())}</span>
            </div>
            <div className="flex flex-col">
              <span className="">Balance</span>
              {userUSDCBalance && <span className="text-xs">{userUSDCBalance?.toString()} USDC</span>}
            </div>
            <div className="flex flex-col items-center space-y-4">
              <TransferFundsToSafe safeAccountAddress={safeAccountAddress} decimals={decimals} />
            </div>
            <AddModule safeSdk={safeSdk} />
            <AddWorker safeSdk={safeSdk} safeAccountAddress={safeAccountAddress} />
            <AllowZap safeSdk={safeSdk} safeAccountAddress={safeAccountAddress} />
          </div>
        )}
      </div>
      <Button secondary onClick={() => disconnect()} text="Disconnect" />
    </div>
  );
}

Home.getLayout = (currentPage) => <BaseLayout>{currentPage}</BaseLayout>;
