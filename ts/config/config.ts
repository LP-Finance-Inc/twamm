import fs from "fs";
import * as dotenv from 'dotenv';
import { Connection, Keypair } from "@solana/web3.js";
dotenv.config({ path: "config/.env" });
const pk = Uint8Array.from(
    JSON.parse(fs.readFileSync("/Users/lpfinance/Users/lpfinance/.config/solana/id.json", "utf-8"))
)

export const signer = Keypair.fromSecretKey(pk);
export const connection = new Connection(process.env.RPC_URI, "confirmed");