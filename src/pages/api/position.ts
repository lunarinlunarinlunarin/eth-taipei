import { NextApiRequest, NextApiResponse } from "next";
import { ethers } from "ethers";
import prisma from "../../utils/prisma";
import { executeZap } from "../../utils/executeZap";
import { getNextPeriod } from "../../utils/getNextPeriod";
import dayjs from "dayjs";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const { safeAddress } = req.query;
    if (!safeAddress || typeof safeAddress !== "string") {
      return res.status(500).json({ error: "Invalid safe address" });
    }
    return await prisma.position.findMany({
      where: {
        address: safeAddress,
      },
    });
  }
  if (req.method === "POST") {
    const { safeAddress, sourceToken, pairedToken, totalAmount, interval, interval_count } = req.body;
    if (!safeAddress || typeof safeAddress !== "string") {
      return res.status(500).json({ error: "Invalid safe address" });
    }
    if (!sourceToken || typeof sourceToken !== "string" || !ethers.utils.isAddress(sourceToken)) {
      return res.status(500).json({ error: "Invalid source token" });
    }
    if (!pairedToken || typeof pairedToken !== "string" || !ethers.utils.isAddress(pairedToken)) {
      return res.status(500).json({ error: "Invalid paired token" });
    }
    if (!totalAmount || typeof totalAmount !== "number") {
      return res.status(500).json({ error: "Invalid source amount" });
    }

    const tx = await executeZap(safeAddress, sourceToken, pairedToken, totalAmount);
    if (!tx) return res.status(500).json({ error: "Failed to execute zap" });

    const now = dayjs();
    const { last_swap_at, next_swap_at } = getNextPeriod(now.toDate(), interval, interval_count);
    const result = await prisma.position.create({
      data: {
        address: safeAddress,
        source_token: sourceToken,
        paired_token: pairedToken,
        total_amount: totalAmount,
        last_swap_at,
        next_swap_at,
        interval,
        interval_count,
        swap_success_tx_hash: [tx.hash],
      },
    });

    return res.status(200).json({ result, tx });
  }

  return res.status(405).end("Method not allowed");
}
