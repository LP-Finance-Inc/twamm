import type { Idl } from "@project-serum/anchor";
import idlJson from "../idl.json";

export const idl = idlJson as Idl;

export const JUPITER_CONFIG_URI = "https://quote-api.jup.ag";

export const JUPITER_PRICE_ENDPOINT_V4 = "https://price.jup.ag/v4/price";

export const NEXT_PUBLIC_ENABLE_TX_SIMUL =
  process.env.NEXT_PUBLIC_ENABLE_TX_SIMUL || "";

export const AnkrClusterApiUrl = "https://rpc.ankr.com/solana";

export const ClusterApiUrl = process.env.NEXT_PUBLIC_CLUSTER_API_URL;

export const programId: string | undefined =
  process.env.NEXT_PUBLIC_PROGRAM_ADDRESS;

export const FEE_ACCOUNT: string = process.env.NEXT_PUBLIC_FEE_ACCOUNT || "";

export const feeBps: number = Number(process.env.NEXT_PUBLIC_FEE_BPS) || 0;

export const platformFeeAccount: string =
  process.env.NEXT_PUBLIC_PLATFORM_FEE_ACCOUNT || "";

export const STARRED_COINS =
  process.env.NEXT_PUBLIC_STARRED_COINS?.split(",") || [];
