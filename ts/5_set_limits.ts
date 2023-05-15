import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { PublicKey  } from "@solana/web3.js";
import { Twamm } from "../target/types/twamm"
import { signer, connection } from "./config/config";

const { Wallet } = anchor;

const setLimitsParams = async() => {
    anchor.setProvider(new anchor.AnchorProvider(connection, new Wallet(signer), anchor.AnchorProvider.defaultOptions()));
    let program = anchor.workspace.Twamm as Program<Twamm>
    
    let [multisigKey, multisigBump] = await PublicKey.findProgramAddress(
        [Buffer.from(anchor.utils.bytes.utf8.encode("multisig"))],
        new PublicKey("TWAPzC9xaeBpgDNF26z5VAcmxBowVz5uqmTx47LkWUy")
      );

    let tokenAMint = new PublicKey("Dn4noZ5jgGfkntzcQSUZ8czkreiZ1ForXYoV2H8Dm7S1"); // USDTet (Wormhole)
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
        .setLimits({
            minSwapAmountTokenA: new anchor.BN(1),
            minSwapAmountTokenB: new anchor.BN(1),
            maxSwapPriceDiff: 0.1,
            maxUnsettledAmount: 0.3,
            minTimeTillExpiration: 0.3,
        })
        .accounts({
            admin: signer.publicKey,
            multisig: multisigKey,
            tokenPair: tokenPairKey,
        })
        .signers([signer])
        .rpc();
    
    console.log(tx);

    let tokenPair = await program.account.tokenPair.fetch(
        tokenPairKey
    );
    console.log(tokenPair);
    
}
setLimitsParams();


