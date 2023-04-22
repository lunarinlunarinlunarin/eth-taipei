import schedule from "node-schedule";
// import axios from "axios";
import * as dotenv from "dotenv";
import prisma from "../utils/prisma";

dotenv.config();

function main() {
  console.log("Zapper started");
  // runs every minute
  schedule.scheduleJob("*/1 * * * *", async () => {
    console.log("Run at: ", new Date());
  });
}

main();

// function queryDb() {
//   prisma.positions.findFirst({
//     where: {
//         last_swapped: {
//             lte: last_swapped
//         }
//     }
//   })
// }
