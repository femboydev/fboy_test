import { GetPlayers } from "@communityox/ox_core/server";
import config from "../common/config.js";

setInterval(async () => {
  const players = await GetPlayers();

  console.log(`[fboy] Distributing salary of $${config.SALARY_AMOUNT} to ${players.length} players.`);

  for (const player of players) {

    const account = await player.getAccount();

    if (account) {
      await account.addBalance(
        {
          amount: config.SALARY_AMOUNT,
          message: "Salary Payment",
        }
      );
      console.log(`[fboy] Added $${config.SALARY_AMOUNT} to player ${player.username} (Account ID: ${account.accountId}).`);
    }
  }
}, 1000 * 60 * config.SALARY_INTERVAL_MINUTES);

console.log("\x1b[35m%s\x1b[0m", "[Femboy Salary] Started salary distribution service .");