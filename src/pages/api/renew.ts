import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../utils/prisma";
import dayjs from "dayjs";
import { getNextPeriod } from "../../utils/getNextPeriod";
import { executeZap } from "../../utils/executeZap";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const SECRET = process.env.SECRET_TOKEN;
  if (req.headers.authorization !== SECRET) return res.status(401).end("Unauthorized");
  if (req.method === "POST") {
    const now = dayjs();
    const toRenew = await prisma.position.findMany({
      where: {
        next_swap_at: {
          lte: now.toDate(),
        },
        failure_tx_count: {
          lt: 5,
        },
      },
    });
    console.log(
      "Renewing positions: ",
      toRenew.map((p) => p.id)
    );
    const results = await Promise.all(
      toRenew.map(async (position) => {
        const tx = await executeZap(position.address, position.source_token, position.paired_token, position.total_amount.toNumber());
        if (!tx) {
          return prisma.position.update({
            where: {
              id: position.id,
            },
            data: {
              failure_tx_count: position.failure_tx_count,
            },
          });
        } else {
          const { last_swap_at, next_swap_at } = getNextPeriod(now.toDate(), position.interval, position.interval_count);

          return prisma.position.update({
            where: {
              id: position.id,
            },
            data: {
              last_swap_at,
              next_swap_at,
              swap_success_tx_hash: {
                push: tx.hash,
              },
            },
          });
        }
      })
    );

    return res.status(200).json({ results });
  }

  return res.status(405).end("Method not allowed");
}
