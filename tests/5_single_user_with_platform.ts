import * as anchor from "@project-serum/anchor";
import { TwammTester, OrderSide } from "./twamm_tester";
import { expect, assert } from "chai";

describe("single_user_with_platform", () => {
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

  it("init", async () => {
    await twamm.init();
  });

  it("scenario1", async () => {
    await twamm.reset(tifs, [1, 10]);
    await twamm.setOraclePrice(tokenAPrice, tokenBPrice);

    // place and check order
    const [ta_balance, tb_balance] = await twamm.getBalances(0);
    await twamm.placeOrder(0, side, tif, amount);

    const [ta_balance2, tb_balance2] = await twamm.getBalances(0);
    expect(ta_balance2).to.equal(ta_balance);
    expect(tb_balance2).to.equal(tb_balance - amount);

    let order = await twamm.getOrder(0, tif);

    let orderExpected = {
      owner: twamm.users[0].publicKey,
      time: new anchor.BN(0),
      side: { buy: {} },
      pool: await twamm.getPoolKey(tif, 0),
      lpBalance: new anchor.BN(amount),
      tokenDebt: new anchor.BN(0),
      unsettledBalance: new anchor.BN(amount),
      settlementDebt: new anchor.BN(0),
      lastBalanceChangeTime: new anchor.BN(0),
      bump: order.bump,
    };
    expect(JSON.stringify(order)).to.equal(JSON.stringify(orderExpected));

    // settle
    await twamm.setTime(135);
    await twamm.settle(reverseSide, settleAmountSmall);

    // cancel
    await twamm.cancelOrderWithPlatform(0, tif, amount);
    await twamm.ensureFails(twamm.getOrder(0, tif));

    // check platform fees
    let [post_ta_balance, ] = await twamm.getBalances(0);
    let [platform_a_balance, platform_b_balance] = await twamm.getPlatformBalances()

    // As fee was 10%, user a balance delta is 9 times of platform a fee 
    // amount_token_a = 20000, fee = 20000 * 0.1 = 2000, receive_amount_token_a = 18000
    expect(post_ta_balance - ta_balance2).to.equal(platform_a_balance * 9);

    // check fees
    let tokenPair = await twamm.program.account.tokenPair.fetch(
      twamm.tokenPairKey
    );
    let fees_collected = Number(tokenPair.statsA.feesCollected);

    expect(fees_collected).to.equal(0); // settle fee was set to 0
    expect(Number(tokenPair.statsB.feesCollected)).to.equal(0);
  });

  it("scenario2", async () => {
    await twamm.deleteTestPool(0, tif);
    await twamm.reset(tifs, [1, 10]);

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

  it("scenario3", async () => {
    await twamm.deleteTestPool(0, tif);
    await twamm.reset(tifs, [1, 10]);

    const [ta_balance, tb_balance] = await twamm.getBalances(0);
    const [platform_a_balance, platform_b_balance] = await twamm.getPlatformBalances();
    await twamm.placeOrder(0, side, tif, amount);
    await twamm.setTime(135);
    await twamm.settle(reverseSide, settleAmountFull);

    await twamm.cancelOrderWithPlatform(0, tif, amount);
    let tokenPair = await twamm.program.account.tokenPair.fetch(
      twamm.tokenPairKey
    );

    let source_amount_received = twamm.getTokenAAmount(amount / 2);
    const [platform_a_balance_post, platform_b_balance_post] = await twamm.getPlatformBalances();
    expect(platform_b_balance).to.equal(platform_b_balance_post);
    expect(platform_a_balance_post - platform_a_balance)
        .to.equal(Math.ceil(source_amount_received/10));
    expect(Number(tokenPair.statsA.feesCollected)).to.equal(0);
    expect(Number(tokenPair.statsB.feesCollected)).to.equal(0);

    const [ta_balance4, tb_balance4] = await twamm.getBalances(3);
    const sol_balance_pre  = await twamm.getSolBalanceFromIdx(3)
    let sol_fees = await twamm.getExtraSolBalance(twamm.authorityKey);
    expect(sol_fees).to.greaterThan(0);
    await twamm.withdrawFees(0, 0, sol_fees);
    const [ta_balance5, tb_balance5] = await twamm.getBalances(3);
    const sol_balance_post  = await twamm.getSolBalanceFromIdx(3)
    expect(sol_balance_post - sol_balance_pre).to.equal(sol_fees);
  });

  it("scenario4", async () => {
    let side: OrderSide = "sell";
    let reverseSide: OrderSide = "buy";
    let amount = 1333333;
    let settleAmountSmall = 600;
    await twamm.reset(tifs, [1, 10]);
    await twamm.setOraclePrice(tokenAPrice, tokenBPrice);

    // place and check order
    const [ta_balance, tb_balance] = await twamm.getBalances(0);
    const [platform_a_balance, platform_b_balance] = await twamm.getPlatformBalances();
    await twamm.placeOrder(0, side, tif, amount);

    const [ta_balance2, tb_balance2] = await twamm.getBalances(0);
    expect(ta_balance2).to.equal(ta_balance - amount);
    expect(tb_balance2).to.equal(tb_balance);

    let order = await twamm.getOrder(0, tif);

    let orderExpected = {
      owner: twamm.users[0].publicKey,
      time: new anchor.BN(0),
      side: { sell: {} },
      pool: await twamm.getPoolKey(tif, 0),
      lpBalance: new anchor.BN(amount),
      tokenDebt: new anchor.BN(0),
      unsettledBalance: new anchor.BN(amount),
      settlementDebt: new anchor.BN(0),
      lastBalanceChangeTime: new anchor.BN(0),
      bump: order.bump,
    };
    expect(JSON.stringify(order)).to.equal(JSON.stringify(orderExpected));

    // settle
    await twamm.setTime(135);
    await twamm.settle(reverseSide, settleAmountSmall);

    // cancel
    await twamm.cancelOrderWithPlatform(0, tif, amount);
    await twamm.ensureFails(twamm.getOrder(0, tif));

    // check fees
    let tokenPair = await twamm.program.account.tokenPair.fetch(
      twamm.tokenPairKey
    );
    const [platform_a_balance_post, platform_b_balance_post] = await twamm.getPlatformBalances();
    expect(platform_a_balance_post).to.equal(platform_a_balance);
    expect(platform_b_balance_post - platform_b_balance).to.equal(settleAmountSmall / 10);
    expect(Number(tokenPair.statsA.feesCollected)).to.equal(0);
    expect(Number(tokenPair.statsB.feesCollected)).to.equal(0);

    // withdraw sol fees
    const sol_balance_pre  = await twamm.getSolBalanceFromIdx(3)
    let sol_fees = await twamm.getExtraSolBalance(twamm.authorityKey);
    expect(sol_fees).to.greaterThan(0);
    await twamm.withdrawFees(0, 0, sol_fees);
    const sol_balance_post  = await twamm.getSolBalanceFromIdx(3);
    expect(sol_balance_post - sol_balance_pre).to.equal(sol_fees);
  });
});
