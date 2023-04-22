import schedule from "node-schedule";
import axios from "axios";
import * as dotenv from "dotenv";

dotenv.config();

function main() {
  console.log("Zapper started");
  // runs every minute
  schedule.scheduleJob("*/1 * * * *", async () => {
    console.log("Run at: ", new Date());
    axios.post(process.env.API_URL + "/api/renew", {
      headers: {
        Authorization: process.env.SECRET_TOKEN,
      },
    });
  });
}

main();
