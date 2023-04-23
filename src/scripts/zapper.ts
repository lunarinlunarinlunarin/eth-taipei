import schedule from "node-schedule";
import axios from "axios";
import * as dotenv from "dotenv";

dotenv.config();

const SECRET_TOKEN = process.env.SECRET_TOKEN;
const API_URL = process.env.VERCEL_URL ?? process.env.API_URL;
function main() {
  console.log("API: " + API_URL);
  console.log("Zapper started");
  // runs every minute
  schedule.scheduleJob("*/1 * * * *", async () => {
    console.log("Run at: ", new Date());
    const results = await axios.post(
      process.env.API_URL + "/api/renew",
      {},
      {
        headers: {
          Authorization: SECRET_TOKEN,
        },
      }
    );
    console.log(results.data);
  });
}

main();
