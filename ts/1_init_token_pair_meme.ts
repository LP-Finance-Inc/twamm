import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { PublicKey, SystemProgram, SYSVAR_RENT_PUBKEY } from "@solana/web3.js";
import * as spl from "@solana/spl-token";
import { Twamm } from "../target/types/twamm"
import { signer, connection } from "./config/config";

const { Wallet } = anchor;

const initTokenPair = async() => {
    anchor.setProvider(new anchor.AnchorProvider(connection, new Wallet(signer), anchor.AnchorProvider.defaultOptions()));
    let program = anchor.workspace.Twamm as Program<Twamm>
    
    let [multisigKey, multisigBump] = await PublicKey.findProgramAddress(
        [Buffer.from(anchor.utils.bytes.utf8.encode("multisig"))],
        new PublicKey("TWAPzC9xaeBpgDNF26z5VAcmxBowVz5uqmTx47LkWUy")
      );

    let [authorityKey, authorityBump] =
      await PublicKey.findProgramAddress(
        [Buffer.from(anchor.utils.bytes.utf8.encode("transfer_authority"))],
        new PublicKey("TWAPzC9xaeBpgDNF26z5VAcmxBowVz5uqmTx47LkWUy")
      );
      
    let tokenAMint = new PublicKey("AZsHEMXd36Bj1EMNXhowJajpUXzrKcK57wW4ZGXVa7yR"); // GUAC 
    let tokenBMint = new PublicKey("EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"); // USDC

    let tokenACustodyKey = await spl.getAssociatedTokenAddress(
        tokenAMint,
        authorityKey,
        true
      );
  
    let tokenBCustodyKey = await spl.getAssociatedTokenAddress(
        tokenBMint,
        authorityKey,
        true
      );

    let [tokenPairKey, tokenPairBump] =
    await PublicKey.findProgramAddress(
      [
        Buffer.from(anchor.utils.bytes.utf8.encode("token_pair")),
        tokenAMint.toBuffer(),
        tokenBMint.toBuffer(),
      ],
      new PublicKey("TWAPzC9xaeBpgDNF26z5VAcmxBowVz5uqmTx47LkWUy")
    );


    let tokenAOracle = { test: {} } as never;
    let tokenBOracle = { test: {} } as never;

    const [oracleTokenAKey, oracleTokenABump] = await PublicKey.findProgramAddress(
        [
          Buffer.from(anchor.utils.bytes.utf8.encode("token_a_oracle")),
          tokenAMint.toBuffer(),
          tokenBMint.toBuffer(),
        ],
        program.programId
      );

      const [oracleTokenBKey, oracleTokenBBump] = await PublicKey.findProgramAddress(
        [
          Buffer.from(anchor.utils.bytes.utf8.encode("token_b_oracle")),
          tokenAMint.toBuffer(),
          tokenBMint.toBuffer(),
        ],
        program.programId
      );

    let tx = await program.methods
        .initTokenPair({
            allowDeposits: true,
            allowWithdrawals: true,
            allowCranks: true,
            allowSettlements: false, // block settlements
            feeNumerator: new anchor.BN(1),
            feeDenominator: new anchor.BN(1000),
            settleFeeNumerator: new anchor.BN(0),
            settleFeeDenominator: new anchor.BN(1),
            crankRewardTokenA: new anchor.BN(0),
            crankRewardTokenB: new anchor.BN(0),
            minSwapAmountTokenA: new anchor.BN(1),
            minSwapAmountTokenB: new anchor.BN(1),
            maxSwapPriceDiff: 0.1,
            maxUnsettledAmount: 0.3,
            minTimeTillExpiration: 0.3,
            maxOraclePriceErrorTokenA: 100.0,
            maxOraclePriceErrorTokenB: 100.0,
            maxOraclePriceAgeSecTokenA: 60, // 60 sec
            maxOraclePriceAgeSecTokenB: 60, // 60 sec
            oracleTypeTokenA: tokenAOracle,
            oracleTypeTokenB: tokenBOracle,
            oracleAccountTokenA: oracleTokenAKey,
            oracleAccountTokenB: oracleTokenBKey,
            crankAuthority: PublicKey.default,
            timeInForceIntervals: [300, 900, 1800, 3600, 7200, 14400, 28800, 86400, 172800, 345600], // 5min ,15min, 30min, 1h, 2h, 4h, 8h, 24h, 48h, 96h
        })
        .accounts({
            admin: signer.publicKey,
            multisig: multisigKey,
            tokenPair: tokenPairKey,
            transferAuthority: authorityKey,
            mintTokenA: tokenAMint,
            mintTokenB: tokenBMint,
            custodyTokenA: tokenACustodyKey,
            custodyTokenB: tokenBCustodyKey,
            systemProgram: SystemProgram.programId,
            rent: SYSVAR_RENT_PUBKEY,
            tokenProgram: spl.TOKEN_PROGRAM_ID,
            associatedTokenProgram: spl.ASSOCIATED_TOKEN_PROGRAM_ID
        })
        .signers([signer])
        .rpc();
    
    console.log(tx);

    let tokenPair = await program.account.tokenPair.fetch(
        tokenPairKey
    );
    console.log(tokenPair);
    
}
initTokenPair();


