import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { Twamm } from "../target/types/twamm"
import { signer, connection } from "./config/config";

const { Wallet } = anchor;

const fetch_all_orders = async() => {  
    anchor.setProvider(new anchor.AnchorProvider(connection, new Wallet(signer), anchor.AnchorProvider.defaultOptions()));
    let program = anchor.workspace.Twamm as Program<Twamm>

    let orders = await program.account.order.all()

    return orders;
}
fetch_all_orders();
