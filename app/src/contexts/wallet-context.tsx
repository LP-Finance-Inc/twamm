import type { FC, ReactNode } from "react";
import type { WalletError } from "@solana/wallet-adapter-base";
import {
  AlphaWalletAdapter,
  AvanaWalletAdapter,
  BackpackWalletAdapter,
  BitKeepWalletAdapter,
  BitpieWalletAdapter,
  BloctoWalletAdapter,
  BraveWalletAdapter,
  CloverWalletAdapter,
  Coin98WalletAdapter,
  CoinbaseWalletAdapter,
  CoinhubWalletAdapter,
  ExodusWalletAdapter,
  GlowWalletAdapter,
  HuobiWalletAdapter,
  HyperPayWalletAdapter,
  KeystoneWalletAdapter,
  KrystalWalletAdapter,
  LedgerWalletAdapter,
  MathWalletAdapter,
  NekoWalletAdapter,
  NightlyWalletAdapter,
  NufiWalletAdapter,
  ParticleAdapter,
  PhantomWalletAdapter,
  SafePalWalletAdapter,
  SaifuWalletAdapter,
  SalmonWalletAdapter,
  SkyWalletAdapter,
  SlopeWalletAdapter,
  SolflareWalletAdapter,
  SolletWalletAdapter,
  SolongWalletAdapter,
  SpotWalletAdapter,
  StrikeWalletAdapter,
  TokenaryWalletAdapter,
  TokenPocketWalletAdapter,
  TorusWalletAdapter,
  TrustWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import { useCallback, useMemo } from "react";
import { WalletProvider as Provider } from "@solana/wallet-adapter-react";

import { useSnackbar } from "./notification-context";
import { WalletModalProvider } from "../lib";
import useTheme from "./theme-context";

export const WalletProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const { enqueueSnackbar } = useSnackbar();
  const { theme } = useTheme();

  const wallets = useMemo(() => {
    const adapters = [
      new AlphaWalletAdapter(),
      new AvanaWalletAdapter(),
      new BackpackWalletAdapter(),
      new BitKeepWalletAdapter(),
      new BitpieWalletAdapter(),
      new BloctoWalletAdapter(),
      new BraveWalletAdapter(),
      new CloverWalletAdapter(),
      new Coin98WalletAdapter(),
      new CoinbaseWalletAdapter(),
      new CoinhubWalletAdapter(),
      new ExodusWalletAdapter(),
      new GlowWalletAdapter(),
      new HuobiWalletAdapter(),
      new HyperPayWalletAdapter(),
      new KeystoneWalletAdapter(),
      new KrystalWalletAdapter(),
      new LedgerWalletAdapter(),
      new MathWalletAdapter(),
      new NekoWalletAdapter(),
      new NightlyWalletAdapter(),
      new NufiWalletAdapter(),
      new ParticleAdapter(),
      new PhantomWalletAdapter(),
      new SafePalWalletAdapter(),
      new SaifuWalletAdapter(),
      new SalmonWalletAdapter(),
      new SkyWalletAdapter(),
      new SlopeWalletAdapter(),
      new SolflareWalletAdapter(),
      new SolletWalletAdapter(),
      new SolongWalletAdapter(),
      new SpotWalletAdapter(),
      new StrikeWalletAdapter(),
      new TokenaryWalletAdapter(),
      new TokenPocketWalletAdapter(),
      new TorusWalletAdapter(),
      new TrustWalletAdapter(),
    ];

    return adapters;
  }, []);

  const onError = useCallback(
    (error: WalletError) => {
      enqueueSnackbar(error.message || error.name, {
        variant: "error",
      });
    },
    [enqueueSnackbar]
  );

  return (
    <Provider wallets={wallets} onError={onError}>
      <WalletModalProvider theme={theme}>{children}</WalletModalProvider>
    </Provider>
  );
};
