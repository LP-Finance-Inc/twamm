import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { PublicKey } from "@solana/web3.js";
import { Twamm } from "../target/types/twamm"
import { signer, connection } from "./config/config";

const { Wallet } = anchor;

const setOracleConfig = async() => {
    anchor.setProvider(new anchor.AnchorProvider(connection, new Wallet(signer), anchor.AnchorProvider.defaultOptions()));
    let program = anchor.workspace.Twamm as Program<Twamm>
    
    let [multisigKey, multisigBump] = await PublicKey.findProgramAddress(
        [Buffer.from(anchor.utils.bytes.utf8.encode("multisig"))],
        new PublicKey("TWAPzC9xaeBpgDNF26z5VAcmxBowVz5uqmTx47LkWUy")
      );

    let tokenAMint = new PublicKey("DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263"); // HNT 
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


    let tokenAOracle = { pyth: {} } as never;
    let tokenBOracle = { pyth: {} } as never

    let oracleAccountTokenA = new PublicKey("7moA1i5vQUpfDwSpK6Pw9s56ahB7WFGidtbL2ujWrVvm");
    let oracleAccountTokenB = new PublicKey("Gnt27xtC473ZT2Mw5u8wZ68Z3gULkSTb5DuxJy7eJotD")
    let tx = await program.methods
        .setOracleConfig({
            maxOraclePriceErrorTokenA: 100.0,
            maxOraclePriceErrorTokenB: 100.0,
            maxOraclePriceAgeSecTokenA: 10,
            maxOraclePriceAgeSecTokenB: 10,
            oracleTypeTokenA: tokenAOracle,
            oracleTypeTokenB: tokenBOracle,
            oracleAccountTokenA: oracleAccountTokenA,
            oracleAccountTokenB: oracleAccountTokenB,
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
setOracleConfig();


