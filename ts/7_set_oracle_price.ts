import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { PublicKey, SystemProgram } from "@solana/web3.js";
import { Twamm } from "../target/types/twamm"
import { signer, connection } from "./config/config";

const { Wallet } = anchor;

const setOraclePrice = async(priceTokenA, priceTokenB, expoTokenA, expoTokenB) => {
    anchor.setProvider(new anchor.AnchorProvider(connection, new Wallet(signer), anchor.AnchorProvider.defaultOptions()));
    let program = anchor.workspace.Twamm as Program<Twamm>
    
    let [multisigKey, multisigBump] = await PublicKey.findProgramAddress(
        [Buffer.from(anchor.utils.bytes.utf8.encode("multisig"))],
        new PublicKey("TWAPzC9xaeBpgDNF26z5VAcmxBowVz5uqmTx47LkWUy")
      );

    let tokenAMint = new PublicKey("9noXzpXnkyEcKF3AeXqUHTdR59V5uvrRBUZ9bwfQwxeq"); // KING 
    let tokenBMint = new PublicKey("EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"); // USDC

    let [tokenPairKey, tokenPairBump] =
    await PublicKey.findProgramAddress(
      [
        Buffer.from(anchor.utils.bytes.utf8.encode("token_pair")),
        tokenAMint.toBuffer(),
        tokenBMint.toBuffer(),
      ],
      new PublicKey("TWAPzC9xaeBpgDNF26z5VAcmxBowVz5uqmTx47LkWUy")
    );

    let oracleAccountTokenA = new PublicKey("CcgZ7MKwpBXzcN99ykyzxh36dPwcV2A7Li8Q9mMvi1Qv"); // KING TEST
    let oracleAccountTokenB = new PublicKey("H6J8e3URqPcbP9HjNJf1bMxKCTfp42hD6sw5sUW8fwfQ"); // USDC TEST
    
    const now = new Date;
    const timeStamp = now.getTime()

    let tx = await program.methods
        .setTestOraclePrice({
            priceTokenA: new anchor.BN(priceTokenA),
            priceTokenB: new anchor.BN(priceTokenB),
            expoTokenA,
            expoTokenB,
            confTokenA: new anchor.BN(0),
            confTokenB: new anchor.BN(0),
            publishTimeTokenA: new anchor.BN(timeStamp),
            publishTimeTokenB: new anchor.BN(timeStamp),
        })
        .accounts({
            admin: signer.publicKey,
            multisig: multisigKey,
            tokenPair: tokenPairKey,
            oracleTokenA: oracleAccountTokenA,
            oracleTokenB: oracleAccountTokenB,
            systemProgram: SystemProgram.programId,
        })
        .signers([signer])
        .rpc();
    
    console.log(tx);
    
}
// priceTokenA, priceTokenB, expoTokenA, expoTokenB

setOraclePrice(
  0.000384 * 10 ** 6,
  1 * 10 ** 0,
  -6,
  -0
);


