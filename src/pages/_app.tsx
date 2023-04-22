import React from "react";
import "./global.css";
import { WagmiConfig, createClient, configureChains } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { gnosis } from "wagmi/chains";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import SafeProvider from "@gnosis.pm/safe-apps-react-sdk";

function Base({ Component, pageProps }) {
  const { provider, webSocketProvider } = configureChains([gnosis], [publicProvider()]);

  const client = createClient({
    autoConnect: true,
    provider,
    connectors: [
      new MetaMaskConnector({
        chains: [gnosis],
      }),
    ],
    webSocketProvider,
  });
  const getLayout = Component.getLayout || ((page) => page);
  return (
    <WagmiConfig client={client}>
      <SafeProvider>{getLayout(<Component {...pageProps} />)}</SafeProvider>
    </WagmiConfig>
  );
}

export default Base;
