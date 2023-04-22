import React from "react";
import "./global.css";
import { WagmiConfig, createClient, configureChains } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { gnosis } from "wagmi/chains";

function Base({ Component, pageProps }) {
  const { provider, webSocketProvider } = configureChains([gnosis], [publicProvider()]);

  const client = createClient({
    autoConnect: true,
    provider,
    webSocketProvider,
  });
  const getLayout = Component.getLayout || ((page) => page);
  return <WagmiConfig client={client}>{getLayout(<Component {...pageProps} />)}</WagmiConfig>;
}

export default Base;
