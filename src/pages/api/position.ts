import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../utils/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const { safeAddress } = req.query;
    if (!safeAddress || typeof safeAddress !== "string") {
      return res.status(500).json({ error: "Invalid safe address" });
    }
    return await prisma.positions.findMany({
      where: {
        address: safeAddress,
      },
    });
  }
}
