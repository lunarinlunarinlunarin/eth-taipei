import { NextApiRequest, NextApiResponse } from "next";
import { ethers } from "ethers";
import { ZAP_MODULE_ADDRESS } from "../../utils/constants";
import zapModuleAbi from "../../abi/ZapModule.json";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const provider = new ethers.providers.JsonRpcProvider("https://rpc.gnosischain.com");
  const zapModule = new ethers.Contract(ZAP_MODULE_ADDRESS, zapModuleAbi, provider);
  zapModule.functions.NAME().then((name) => console.log(name));
  return res.status(200).json({ text: "Hello" });
}
