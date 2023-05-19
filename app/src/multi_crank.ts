//@ts-nocheck
import { PublicKey } from "@solana/web3.js";
import { CrankClient } from "./crank_client";

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function do_crank(client: CrankClient) {
  // compute net amount to settle
  let [res, amount] = await client.getOutstandingAmount();
  if (!res) {
    return [false, `Failed to compute amount to settle: ${amount}`];
  }

  let preInstructions = null;
  let swapInstruction = null;
  let postInstructions = null;
  if (amount != 0) {
    // get routes
    const routes =
      amount > 0
        ? await client.getRoutes("buy", amount)
        : await client.getRoutes("sell", amount.neg());
    if (!routes) {
      return [false, "Failed to get routes"];
    }

    // find a route that fits a single transaction and return plain instructions
    let instructions = await client.getInstructions(routes.routesInfos);
    if (!instructions) {
      return [false, "Failed to select a route"];
    }

    [preInstructions, swapInstruction, postInstructions] = instructions;
  }

  return client.crank(preInstructions, swapInstruction, postInstructions);
}

async function crank_loop(tokenA: string) {
  const cluster_url = process.env.CLUSTER_URL;
  // eslint-disable-next-line no-param-reassign
  tokenA = new PublicKey(tokenA);
  const tokenB = new PublicKey("EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"); // USDC as tokenB
  const errorDelay = 10000; // 10 seconds
  const crankDelay = 5000; // 5 seconds

  // init client
  let client = new CrankClient();
  while (true) {
    try {
      await client.init(cluster_url, tokenA, tokenB);
      await client.reloadConfig();
      break;
    } catch (err) {
      console.error(err);
      console.log(`Retrying in ${errorDelay} sec...`);
      await sleep(errorDelay);
    }
  }
  client.log("Initialized");

  // main loop
  while (true) {
    await client.reloadConfig().catch((err) => console.error(err));
    if (
      !client.tokenPairConfig.allowCranks ||
      (client.tokenPairConfig.crankAuthority != PublicKey.default.toString() &&
        client.tokenPairConfig.crankAuthority !=
          client.provider.wallet.publicKey.toString())
    ) {
      client.error(
        `Cranks are not allowed at this time. Retrying in ${errorDelay} sec...`
      );
      await sleep(errorDelay);
      continue;
    }

    let [res, message] = await do_crank(client);
    if (res || message === "Nothing to settle at this time") {
      client.log(`Cranked: ${message}`);
    } else {
      client.error(`Crank error: ${message}. Trying internal matching...`);
      let [res2, message2] = await client.crank(null, null, null);
      if (res2 || message2 === "Nothing to settle at this time") {
        client.log(`Cranked internally: ${message2}`);
      } else {
        client.error(
          `Internal match error: ${message2}. Retrying in ${errorDelay} sec...`
        );
        await sleep(errorDelay);
        continue;
      }
    }

    await sleep(crankDelay);
  }
}

async function main(tokenAArray: Array<number>) {
  const promises = tokenAArray.map((tokenA) => crank_loop(tokenA));
  await Promise.all(promises);
}

main([
  "So11111111111111111111111111111111111111112", // SOL
  "3NZ9JMVBmGAqocybic2c7LQCJScmgsAZ6vQqTDzcqmJh", // BTC
  "7vfCXTUXx5WJV5JADk17DUJ4ksgau7utNKj4b963voxs", // ETH
  "MangoCzJ36AjZyKwVj3VnYU4GTonjfVEnJmvvWaxLac", // MNGO
  "orcaEKTdK7LKz57vaAYr9QeNsVEPfiu6QeMU1kektZE", // ORCA
  "HZRCwxP2Vq9PCpPXooayhJ2bxTpo5xfpQrwB1svh332p", // LDO
  "A9mUU4qviSctJVPJdBJWkb28deg915LYJKrzQ19ji3FM", // USDCet
  "mSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So", // mSOL
  "7dHbWXmci3dT8UFYWYZweBLXgycu7Y3iL6trKn1Y7ARj", // stSOL
  "4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R", // RAY
  "hntyVP6YFm1Hg25TN9WGLqM12b8TQmcknKrdu1oxWux", // HNT
  "7i5KKsX2weiTkry7jA4ZwSuXGhs5eJBEjY8vVxR4pfRx", // GMT
  "AUrMpCDYYcPuHhyNX8gEEqbmDPFUpBpHrNW3vPeCFn5Z", // AVAX
  "9gP2kCy3wA1ctvYWQk75guqXuHfrEomqydHLtcTCqiLa", // BNB
  "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU", // SAMO
]);

/*
Following Tokens cannot find route

  "9gP2kCy3wA1ctvYWQk75guqXuHfrEomqydHLtcTCqiLa", // BNB
  "Gz7VkD4MacbEB6yC5XD3HcumEiYx2EtDYYrfikGsvopG", // MATIC
*/
