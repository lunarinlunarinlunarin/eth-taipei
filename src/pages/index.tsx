import BaseLayout from "../layouts/base";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { gnosis } from "wagmi/chains";
import { useAccount, useConnect, useDisconnect, useProvider } from "wagmi";
import { useSigner } from "wagmi";
import Safe, { SafeFactory, EthersAdapter, SafeAccountConfig } from "@safe-global/protocol-kit";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { Button } from "../components/Button/button";
import { constuctExplorerUrl, truncate } from "../utils";
import { SALT, TokenList } from "../data";
import { TransferFundsToSafe } from "../components/TransferFundsToSafe";
import Image from "next/image";
import { CreateSafe } from "../components/CreateSafe";
import { ConnectScreen } from "../components/ConnectScreen";
import LoadingDots from "../components/LoadingDots";
import { AllowZap } from "../components/AllowZap";
import zapAbi from "../abi/ZapModule.json";
import { Interface } from "@ethersproject/abi";
import { AddWorker } from "../components/AddWorker";
import { AddModule } from "../components/AddModule";
import { Network } from "../components/Network";
import { Coin } from "../components/Coin";
import React from "react";
import { Invest } from "../components/Invest";
import axios from "axios";
import { Interval } from "@prisma/client";
import { ExecutePeriod } from "../components/ExecutePeriod";
import { DocumentDuplicateIcon } from "@heroicons/react/24/outline";
import { useUserBalance } from "../hooks/useUserBalance";

export const ZapInterface = new Interface(zapAbi);

export const useIsMounted = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
};

export enum PAGE_VIEW {
  CONNECT,
  CREATE,
  HAS_WALLET,
}

export default function Home() {
  const isMounted = useIsMounted();
  const [view, setView] = useState<PAGE_VIEW>(PAGE_VIEW.CONNECT);
  const [safeSdk, setSafeSdk] = useState<Safe | null>(null);
  const [safeAccountAddress, setSafeAccountAddress] = useState("");
  const [safeFactory, setSafefactory] = useState<SafeFactory | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const { data: signer } = useSigner();
  const [fromToken, setFromToken] = useState(TokenList.USDC);
  const [toToken, setToToken] = useState(TokenList.WETH);
  const [amount, setAmount] = useState("");
  const [interval, setInterval] = useState(Interval.MONTH);
  const [swapLoading, setSwapLoading] = useState<boolean>(false);
  const [successSwapTx, setSuccessSwapTx] = useState<any>(null);
  const { tokenBalance, decimals, mutate: mutateBalance } = useUserBalance(safeAccountAddress, fromToken);

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
        try {
          const safeSdk: Safe = await Safe.create({ ethAdapter, safeAddress });
          setView(PAGE_VIEW.HAS_WALLET);
          setSafeSdk(safeSdk);
        } catch (error) {
          setView(PAGE_VIEW.CREATE);
        }
      }
      setIsLoading(false);
    };
    init();
  }, [isConnected, address, signer]);

  const copy = (address: string) => {
    navigator?.clipboard.writeText(address);
  };

  async function swap() {
    setSwapLoading(true);
    try {
      const result = await axios.post("api/position", {
        safeAddress: safeAccountAddress,
        sourceToken: fromToken.address,
        pairedToken: toToken.address,
        totalAmount: Number(amount),
        interval: interval,
        interval_count: 1,
      });
      if (result) {
        setSuccessSwapTx(result.data.tx);
      }
    } catch (error) {
    } finally {
      setSwapLoading(false);
    }
  }

  if (!isMounted) return null;
  const hasSufficientBalance = !amount || (!!amount && tokenBalance >= Number(amount));
  return (
    <div className="flex flex-col w-full min-h-screen py-4">
      <div className="mx-8 flex h-[calc(100vw-150px)] flex-col items-start space-y-8">
        <div className="flex flex-row items-center justify-between w-full">
          <Image height={30} width={115} src="/logo.png" alt="Brand Logo" />
          {isConnected && <Button secondary onClick={() => disconnect()} text="Disconnect" />}
        </div>
        {isLoading ? (
          <LoadingDots />
        ) : PAGE_VIEW.CONNECT === view ? (
          <ConnectScreen />
        ) : PAGE_VIEW.CREATE === view ? (
          <CreateSafe safeFactory={safeFactory} setSafeSdk={setSafeSdk} setView={setView} />
        ) : (
          <>
            <div className="flex flex-row w-full gap-12">
              <div className="flex flex-col w-1/2 space-y-4">
                <div className="flex flex-row items-center justify-between">
                  <div className="flex flex-col">
                    <div className="flex flex-col">
                      <span className="">Safe Address</span>
                      <span className="flex flex-row items-center space-x-1 text-xs">
                        <span>{truncate(safeSdk?.getAddress())}</span>{" "}
                        <DocumentDuplicateIcon className="h-4 cursor-pointer " onClick={() => copy(safeAccountAddress)} />
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="">Balance</span>
                      {tokenBalance ? (
                        <span className="text-xs">
                          {tokenBalance?.toString()} {fromToken.label}
                        </span>
                      ) : (
                        <span className="text-xs">--</span>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col space-y-4">
                    <div className="flex flex-col">
                      <span className="">EOA Address</span>
                      <span className="flex flex-row items-center space-x-1 text-xs">
                        {address && (
                          <>
                            <span>{truncate(address)}</span>
                            <DocumentDuplicateIcon className="h-4 cursor-pointer " onClick={() => copy(address)} />
                          </>
                        )}
                      </span>
                    </div>
                    <TransferFundsToSafe safeAccountAddress={safeAccountAddress} decimals={decimals} mutateBalance={mutateBalance} />
                  </div>
                </div>
                <AddModule safeSdk={safeSdk} />
                <AddWorker safeSdk={safeSdk} safeAccountAddress={safeAccountAddress} />
                <AllowZap safeSdk={safeSdk} safeAccountAddress={safeAccountAddress} fromToken={fromToken} toToken={toToken} />
              </div>
              <div className="w-1/2 p-4" style={{ background: "#ddd", borderRadius: "20px" }}>
                <Network title={"Network:"} value={gnosis.name} />
                <Coin toToken={toToken} setToToken={setToToken} fromToken={fromToken} setFromToken={setFromToken} />
                <Invest setAmount={setAmount} token={fromToken} safeAddress={safeAccountAddress} />
                <ExecutePeriod setInterval={setInterval} interval={interval} />
                <div className="flex flex-row items-center justify-between w-full">
                  <span className="pl-4 text-sm text-mono text-medium text-error"> {!hasSufficientBalance ? "You have insufficient balance" : ""}</span>
                  <Button
                    primary
                    onClick={() => swap()}
                    text={
                      swapLoading ? (
                        <div className="flex flex-row items-center space-x-2">
                          <span>Swap in progress</span>
                          <LoadingDots />
                        </div>
                      ) : (
                        "Swap and provide liquidity"
                      )
                    }
                    className="flex flex-row items-center h-12 w-80"
                    disabled={!hasSufficientBalance || !amount}
                  />
                </div>
              </div>
            </div>
            <div className="flex w-full">
              {successSwapTx && successSwapTx?.hash && (
                <div className="flex flex-col items-center justify-center w-full">
                  <div className="text-xl">
                    You have successfully invested {amount} {fromToken?.label}!
                  </div>
                  <a
                    className="text-sm underline cursor-pointer text-primary-400"
                    href={constuctExplorerUrl(successSwapTx?.hash)}
                    target="_blank"
                    rel="noreferrer"
                  >
                    View transaction
                  </a>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

Home.getLayout = (currentPage) => <BaseLayout>{currentPage}</BaseLayout>;
