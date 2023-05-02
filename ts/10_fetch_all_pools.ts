import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { Twamm } from "../target/types/twamm"
import { signer, connection } from "./config/config";

const { Wallet } = anchor;

const fetch_all_pools = async() => {
    anchor.setProvider(new anchor.AnchorProvider(connection, new Wallet(signer), anchor.AnchorProvider.defaultOptions()));
    let program = anchor.workspace.Twamm as Program<Twamm>

    let pools = await program.account.pool.all()
    console.log(pools);
    return pools;
}
fetch_all_pools();
