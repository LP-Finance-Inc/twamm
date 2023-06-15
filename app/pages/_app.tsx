import "../src/why-did-you-render";
import type { AppProps } from "next/app";
import { CacheProvider, EmotionCache } from "@emotion/react";
import { StrictMode, useState, useEffect } from "react";
import { SWRConfig } from "swr";

import "../styles/wallet.css";
import "../styles/globals.css";
import ScreenLoader from "../src/atoms/screen-loader";
import createEmotionCache from "../src/emotion-cache";
import swrConfig from "../src/swr-options";
import * as SolanaCtx from "../src/contexts/solana-connection-context";
import { CoingeckoApiProvider } from "../src/contexts/coingecko-api-context";
import { Provider as JupiterV4ApiProvider } from "../src/contexts/jupiter-v4-api-context";
import { NotificationProvider } from "../src/contexts/notification-context";
import { ThemeProvider } from "../src/contexts/theme-context";
import { Provider as TxProvider } from "../src/contexts/transaction-runner-context";
import { WalletProvider } from "../src/contexts/wallet-context";
import { JUPITER_CONFIG_URI } from "../src/env";

const clientSideEmotionCache = createEmotionCache();

interface PageProps extends AppProps {
  emotionCache?: EmotionCache;
}

if (!(SolanaCtx.endpoints.solana.endpoint && SolanaCtx.endpoints.ankr.endpoint))
  throw new Error("Absent cluster endpoints");

const App = ({
  Component,
  emotionCache = clientSideEmotionCache,
  pageProps,
}: PageProps) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const LoadingTimeOut = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => {
      clearTimeout(LoadingTimeOut);
    };
  }, []);

  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider>
        <StrictMode>
          {loading ? (
            <ScreenLoader />
          ) : (
            <NotificationProvider>
              <CoingeckoApiProvider>
                <JupiterV4ApiProvider config={{ basePath: JUPITER_CONFIG_URI }}>
                  <SolanaCtx.Provider>
                    <WalletProvider>
                      <SWRConfig value={swrConfig}>
                        <TxProvider>
                          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
                          <Component {...pageProps} />
                        </TxProvider>
                      </SWRConfig>
                    </WalletProvider>
                  </SolanaCtx.Provider>
                </JupiterV4ApiProvider>
              </CoingeckoApiProvider>
            </NotificationProvider>
          )}
        </StrictMode>
      </ThemeProvider>
    </CacheProvider>
  );
};

export default App;
