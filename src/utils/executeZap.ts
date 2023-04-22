import { ethers } from "ethers";
import { Interface } from "@ethersproject/abi";
import { ZAP_MODULE_ADDRESS } from "../utils/constants";
import zapModuleAbi from "../abi/ZapModule.json";
import erc20Abi from "../abi/ERC20Token.json";

export const ZapInterface = new Interface(zapModuleAbi);

export async function executeZap(safeAddress: string, sourceToken: string, pairedToken: string, sourceAmount: number) {
  const privateKey = process.env.WORKER_PRIVATE_KEY;
  if (!privateKey) throw new Error("Missing private key");
  const wallet = new ethers.Wallet(privateKey);
  const provider = new ethers.providers.JsonRpcProvider("https://rpc.gnosischain.com");
  const signerWallet = wallet.connect(provider);

  const token = new ethers.Contract(sourceToken, erc20Abi, provider);
  const tokenDecimals = await token.decimals();
  const fullAmount = sourceAmount * 10 ** tokenDecimals;

  const calldata = encodeExecuteZap(safeAddress, sourceToken, pairedToken, fullAmount);
  const simulateTx = await signerWallet.call({
    to: ZAP_MODULE_ADDRESS,
    data: calldata,
  });

  console.log("Simulated result: " + simulateTx);
  if (simulateTx !== "0x") {
    throw new Error("Simulated transaction failed");
  }

  return signerWallet.sendTransaction({
    to: ZAP_MODULE_ADDRESS,
    data: calldata,
    // gasLimit: 1000000,
  });
}
function encodeExecuteZap(safeAddress: string, sourceToken: string, pairedToken: string, fullAmount: number) {
  return ZapInterface.encodeFunctionData("executeZap", [safeAddress, sourceToken, pairedToken, fullAmount]);
}
