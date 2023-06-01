import * as anchor from "@project-serum/anchor";
import { TwammTester, OrderSide } from "./twamm_tester";
import { expect, assert } from "chai";

describe("single_user_with_min_order", () => {
  let twamm = new TwammTester();
  let tifs = [0, 300, 0, 900, 0, 0, 0, 0, 0, 0];
  let tif = 300;
  let tokenAPrice = 30;
  let tokenBPrice = 1;
  let side: OrderSide = "buy";
  let reverseSide: OrderSide = "sell";
  let amount = 40000;
  let settleAmountSmall = 20000;
  let settleAmountFull = 10000000;
  let minPlaceOrderToken1 = [0, 50000, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000];
  let minPlaceOrderToken2 = [0, 40000, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000];

  it("init", async () => {
    await twamm.init();
  });

  it("scenario1", async () => {
    await twamm.resetWithMinOrder(tifs, [1, 10], minPlaceOrderToken1);
    await twamm.setOraclePrice(tokenAPrice, tokenBPrice);

    // place and check order
    const [ta_balance, tb_balance] = await twamm.getBalances(0);
    await twamm.ensureFails(twamm.placeOrder(0, side, tif, amount));

  });

  it("scenario2", async () => {
    await twamm.deleteTestPool(0, tif);
    await twamm.resetWithMinOrder(tifs, [1, 10], minPlaceOrderToken2);

    const [ta_balance, tb_balance] = await twamm.getBalances(0);
    const [platform_a_balance, platform_b_balance] = await twamm.getPlatformBalances();
    await twamm.placeOrder(0, side, tif, amount);
    await twamm.setTime(135);
    await twamm.settle(reverseSide, settleAmountFull);
    const [ta_balance1, tb_balance1] = await twamm.getBalances(1);
    await twamm.placeOrder(1, side, tif, amount, true);
    await twamm.cancelOrderWithPlatform(0, tif, amount);
    let tokenPair = await twamm.program.account.tokenPair.fetch(
      twamm.tokenPairKey
    );

    expect(Number(tokenPair.statsA.feesCollected)).to.equal(0);
    expect(Number(tokenPair.statsB.feesCollected)).to.equal(0);

    await twamm.cancelOrderWithPlatform(1, tif, amount, true);
    const [ta_balance2, tb_balance2] = await twamm.getBalances(1);
    expect(ta_balance2).to.equal(ta_balance1);
    expect(tb_balance2).to.equal(tb_balance1);

    let source_amount_received = twamm.getTokenAAmount(amount / 2);

    const [platform_a_balance_post, platform_b_balance_post] = await twamm.getPlatformBalances();
    
    expect(platform_b_balance).to.equal(platform_b_balance_post);
    expect(platform_a_balance_post - platform_a_balance)
        .to.equal(Math.ceil(source_amount_received/10));

    const sol_balance_pre  = await twamm.getSolBalanceFromIdx(3)
    let sol_fees = await twamm.getExtraSolBalance(twamm.authorityKey);
    expect(sol_fees).to.greaterThan(0);

    await twamm.withdrawFees(0, 0, sol_fees);
    const sol_balance_post  = await twamm.getSolBalanceFromIdx(3)
    expect(sol_balance_post - sol_balance_pre).to.equal(sol_fees);
  });
});