import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { PublicKey, SystemProgram } from "@solana/web3.js";
import { Twamm } from "../target/types/twamm"
import { signer, connection } from "./config/config";

const { Wallet } = anchor;

const initialize = async() => {
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
    let adminMetas = [
        {
            isSigner: false,
            isWritable: false,
            pubkey: signer.publicKey
        },
        {
          isSigner: false,
          isWritable: false,
          pubkey: new PublicKey("7KDQhb9KX8y9rkrtyAw4arkRVctGhaRhaUMCadfg4bEk")
        },
        {
          isSigner: false,
          isWritable: false,
          pubkey: new PublicKey("C9ZhKm84WLUQyYjjsSqXRMPsbWvzjguNPWErJfkkytn6")
        }
    ]

    let tx = await program.methods
        .init({minSignatures: 1})
        .accounts({
            upgradeAuthority: signer.publicKey,
            multisig: multisigKey,
            transferAuthority: authorityKey,
            twammProgram: new PublicKey("TWAPzC9xaeBpgDNF26z5VAcmxBowVz5uqmTx47LkWUy"),
            twammProgramData: new PublicKey("DMj5ZemANpEbHArjGKmdwM1qVoYwNNSerrf1REaxcNA4"),
            systemProgram: SystemProgram.programId,
        })
        .remainingAccounts(adminMetas)
        .rpc()
    
    console.log(tx);
    
}
initialize();