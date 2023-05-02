import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { PublicKey  } from "@solana/web3.js";
import { Twamm } from "../target/types/twamm"
import { signer, connection } from "./config/config";

const { Wallet } = anchor;

const setFees = async() => {
    anchor.setProvider(new anchor.AnchorProvider(connection, new Wallet(signer), anchor.AnchorProvider.defaultOptions()));
    let program = anchor.workspace.Twamm as Program<Twamm>
    
    let [multisigKey, multisigBump] = await PublicKey.findProgramAddress(
        [Buffer.from(anchor.utils.bytes.utf8.encode("multisig"))],
        new PublicKey("TWAPzC9xaeBpgDNF26z5VAcmxBowVz5uqmTx47LkWUy")
      );


    let tokenAMint = new PublicKey("So11111111111111111111111111111111111111112"); // SOL
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


    let tx = await program.methods
        .setFees({
            feeNumerator: new anchor.BN(1),
            feeDenominator: new anchor.BN(1000), // 0.1%
            settleFeeNumerator: new anchor.BN(1),
            settleFeeDenominator: new anchor.BN(1000), // 0.1%
            crankRewardTokenA: new anchor.BN(1),
            crankRewardTokenB: new anchor.BN(1)
        })
        .accounts({
            admin: signer.publicKey,
            multisig: multisigKey,
            tokenPair: tokenPairKey,
        })
        .signers([signer])
        .rpc();
    
    console.log(tx);
    
}
setFees();

