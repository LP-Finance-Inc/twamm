import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { PublicKey } from "@solana/web3.js";
import * as spl from "@solana/spl-token";
import { Twamm } from "../target/types/twamm"
import { signer, connection } from "./config/config";

const { Wallet } = anchor;

const withdrawFees = async() => {
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

    let tokenAMint = new PublicKey("AUrMpCDYYcPuHhyNX8gEEqbmDPFUpBpHrNW3vPeCFn5Z"); 
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

    let feeReceiver = new PublicKey("9pvCGNF2aw43Smb4J1pdyobq6PnjwkhXkuFov8P42S5w");
    let tokenAAta = await connection.getTokenAccountsByOwner(
      feeReceiver, {
        mint: tokenAMint
      }
    )

    let tokenBAta = await connection.getTokenAccountsByOwner(
      feeReceiver, {
        mint: tokenBMint
      }
    )
    let tx = await program.methods
        .withdrawFees({
            amountTokenA: new anchor.BN(0.027180869*10**9), // with decimals
            amountTokenB: new anchor.BN(0*10**6), // with decimals
            amountSol: new anchor.BN(0)
        })
        .accounts({
            admin: signer.publicKey,
            multisig: multisigKey,
            tokenPair: tokenPairKey,
            transferAuthority: authorityKey,
            custodyTokenA: tokenACustodyKey,
            custodyTokenB: tokenBCustodyKey,
            receiverTokenA: tokenAAta.value[0].pubkey, // USDCet ATA
            receiverTokenB: tokenBAta.value[0].pubkey, // USDC ATA
            receiverSol: feeReceiver, // Owner pubkey
            tokenProgram: spl.TOKEN_PROGRAM_ID,
        })
        .signers([signer])
        .rpc();
    
    console.log(tx);
    
}
withdrawFees();