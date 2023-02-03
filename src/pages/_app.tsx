import { DynamicContextProvider } from "@dynamic-labs/sdk-react";
import React from "react";
import "./global.css";

function Glance({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page);
  return (
    <DynamicContextProvider
      settings={{
        appLogoUrl: "/suberra.jpg",
        appName: "Suberra",
        environmentId: "14c986f5-2087-4351-8c3c-0f03aae51b1d",
      }}
    >
      {getLayout(<Component {...pageProps} />)}
    </DynamicContextProvider>
  );
}

export default Glance;
