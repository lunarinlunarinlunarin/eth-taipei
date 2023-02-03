import { useDynamicContext } from "@dynamic-labs/sdk-react";
import { truncate } from "../../utils";

export default function ConnectionButtons() {
  const { isAuthenticated, user, setShowAuthFlow, handleLogOut } = useDynamicContext();
  const account = user?.walletPublicKey;

  return (
    <div className="flex flex-row justify-end sm:items-center">
      {isAuthenticated ? (
        <div className="flex w-full flex-row items-center justify-center space-x-4">
          <span className="text-xs">{truncate(account)}</span>
          <div
            onClick={() => handleLogOut()}
            className="flex w-[100px] cursor-not-allowed justify-center rounded-full bg-[#ff948e] px-2 py-2 text-center text-xs text-white"
          >
            Sign Out
          </div>
        </div>
      ) : (
        <div onClick={() => setShowAuthFlow(true)}>Connect Wallet</div>
      )}
    </div>
  );
}
