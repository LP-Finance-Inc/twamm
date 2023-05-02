import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { Twamm } from "../target/types/twamm"
import { signer, connection } from "./config/config";

const { Wallet } = anchor;

const fetch_all_token_pairs = async() => {  
    anchor.setProvider(new anchor.AnchorProvider(connection, new Wallet(signer), anchor.AnchorProvider.defaultOptions()));
    let program = anchor.workspace.Twamm as Program<Twamm>

    let tokenPairs = await program.account.tokenPair.all();
    for (let i=0; i<tokenPairs.length; i++) {
        console.log(tokenPairs[i].account.configA.mint.toString());
        console.log(tokenPairs[i].account.statsA.orderVolumeUsd.toString());
        console.log(tokenPairs[i].account.statsB.orderVolumeUsd.toString());
        console.log();
    }
    return tokenPairs;
}
fetch_all_token_pairs();
