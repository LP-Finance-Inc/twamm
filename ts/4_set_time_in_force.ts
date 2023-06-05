import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { PublicKey } from "@solana/web3.js";
import { Twamm } from "../target/types/twamm";
import { signer, connection } from "./config/config";

const { Wallet } = anchor;

const setTimeInForce = async() => {
    anchor.setProvider(new anchor.AnchorProvider(connection, new Wallet(signer), anchor.AnchorProvider.defaultOptions()));
    let program = anchor.workspace.Twamm as Program<Twamm>
    
    let [multisigKey, multisigBump] = await PublicKey.findProgramAddress(
        [Buffer.from(anchor.utils.bytes.utf8.encode("multisig"))],
        new PublicKey("TWAPzC9xaeBpgDNF26z5VAcmxBowVz5uqmTx47LkWUy")
      );
    
    let tokenAMint = new PublicKey("7vfCXTUXx5WJV5JADk17DUJ4ksgau7utNKj4b963voxs"); // SOL
    let tokenBMint = new PublicKey("EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"); // USDC

    let [tokenPairKey, tokenPairBump] = await PublicKey.findProgramAddress(
        [
            Buffer.from(anchor.utils.bytes.utf8.encode("token_pair")),
            tokenAMint.toBuffer(),
            tokenBMint.toBuffer()
        ],
        new PublicKey("TWAPzC9xaeBpgDNF26z5VAcmxBowVz5uqmTx47LkWUy")
    )

    let tx = await program.methods
        .setTimeInForce({timeInForceIndex:0, newTimeInForce:900})
        .accounts({
            admin: signer.publicKey,
            multisig: multisigKey,
            tokenPair: tokenPairKey
        })
        .signers([signer])
        .rpc().then(console.log)
    
}
setTimeInForce();