// @ts-ignore
// @ts-nocheck
import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { PublicKey, SystemProgram, SYSVAR_RENT_PUBKEY } from "@solana/web3.js";
import * as spl from "@solana/spl-token";
import { Twamm } from "../target/types/twamm"
import { Swap } from "@openbook-dex/swap";
import { TokenListContainer } from "@solana/spl-token-registry";
import { signer, connection } from "./config/config";
import axios from "axios";


const { Wallet } = anchor;

const initTokenPairOpenbook = async() => {
    const provider = new anchor.AnchorProvider(connection, new Wallet(signer), anchor.AnchorProvider.defaultOptions())
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
      
    let tokenAMint = new PublicKey("9tzZzEHsKnwFL1A3DyFJwj36KnZj3gZ7g4srWp9YTEoh"); // SRB 
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
      const tokenList = await axios.get(
        "https://github.com/LP-Finance-Inc/token-list/blob/main/legacy-token-list.json"
      );
    
      // Init openbook accounts
      const client = new Swap(provider, tokenList);
      const res = await client.initAccounts({
        fromMint: new PublicKey("EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"),
        toMint: new PublicKey("DUALa4FC2yREwZ59PHeu1un4wis36vHRv5hWVBmzykCJ")
      }
      );
      console.log(res);
    
}
initTokenPairOpenbook();

