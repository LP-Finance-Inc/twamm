import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { PublicKey  } from "@solana/web3.js";
import { Twamm } from "../target/types/twamm"
import { assert } from "chai";
import { signer, connection } from "./config/config";

const { Wallet } = anchor;

export const setTimeInForceMultiple = async(newTimeInForceArray) => {
    anchor.setProvider(new anchor.AnchorProvider(connection, new Wallet(signer), anchor.AnchorProvider.defaultOptions()));
    let program = anchor.workspace.Twamm as Program<Twamm>
    
    let [multisigKey, multisigBump] = await PublicKey.findProgramAddress(
        [Buffer.from(anchor.utils.bytes.utf8.encode("multisig"))],
        new PublicKey("TWAPzC9xaeBpgDNF26z5VAcmxBowVz5uqmTx47LkWUy")
      );
    
    let tokenAMint = new PublicKey("9tzZzEHsKnwFL1A3DyFJwj36KnZj3gZ7g4srWp9YTEoh"); // USDCet
    let tokenBMint = new PublicKey("EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"); // USDC

    let [tokenPairKey, tokenPairBump] = await PublicKey.findProgramAddress(
        [
            Buffer.from(anchor.utils.bytes.utf8.encode("token_pair")),
            tokenAMint.toBuffer(),
            tokenBMint.toBuffer()
        ],
        new PublicKey("TWAPzC9xaeBpgDNF26z5VAcmxBowVz5uqmTx47LkWUy")
    )
    assert(newTimeInForceArray.length=10, "Array length should be 10")
    for (let i=0; i<newTimeInForceArray.length; i++) {
        console.log(`Index ${9-i}`)
        try {
            let tx = await program.methods
            .setTimeInForce({timeInForceIndex:9-i, newTimeInForce:newTimeInForceArray[9-i]})
            .accounts({
                admin: signer.publicKey,
                multisig: multisigKey,
                tokenPair: tokenPairKey
            })
            .signers([signer])
            .rpc().then(console.log)
        } catch(error) {
            console.log(error)
        }
    }
}

// const tifArray = [901, 1801, 3601, 7201, 14401, 28801, 86401, 172801, 345601, 604801]
// setTimeInForceMultiple(tifArray)
setTimeInForceMultiple(
    [900, 1800, 3600, 7200, 14400, 28800, 86400, 172800, 345600, 604800]
);