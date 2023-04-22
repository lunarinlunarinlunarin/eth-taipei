import { useConnect } from "wagmi";

import { Button } from "../Button/button";

export function ConnectScreen() {
  const { connect, connectors, error } = useConnect();
  return (
    <>
      {connectors.map((connector) => (
        <Button primary disabled={!connector.ready} key={connector.id} onClick={() => connect({ connector })} text="Connect Wallet" />
      ))}

      {error && <div>{error.message}</div>}
    </>
  );
}
