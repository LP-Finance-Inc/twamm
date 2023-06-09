import Document, { Head, Html, Main, NextScript } from "next/document";
import createEmotionServer from "@emotion/server/create-instance";

import createEmotionCache from "../src/emotion-cache";
import { darkTheme } from "../src/theme/external-theme";

export default class PageDocument extends Document {
  render() {
    const { main } = darkTheme.palette.primary;

    return (
      <Html lang="en">
        <Head>
          <link rel="manifest" href="/manifest.json" />
          <meta name="theme-color" content={main} />
          <link rel="apple-touch-icon" href="/static/favicon-32x32.png" />
          <meta name="apple-mobile-web-app-status-bar" content={main} />
          <link rel="icon" href="/static/favicon.ico" />
          <meta
            name="keywords"
            content="
            Crypto TWAP, TWAMM, Time-weighted Average Market Maker,
            Solana TWAP, Solana TWAMM,  Solana Time-weighted Average Market Maker,
            LP Finance, LP Finance DeFi, Solana DeFi, LP Finance Inc.,
            Paradigm TWAMM, Solana protocol, Solana ecosystem
          "
          />
          {/* <!-- Open Graph / Facebook --> */}
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://www.twap.so/" />
          <meta property="og:title" content="LP Finance | TWAMM" />
          <meta
            property="og:description"
            content="Permissionless TWAP order execution protocol on Solana."
          />
          <meta
            property="og:image"
            content="https://lptokenbucket.s3.amazonaws.com/lp-logo-light.png"
          />

          {/* <!-- Twitter --> */}
          <meta property="twitter:card" content="summary_large_image" />
          <meta property="twitter:url" content="https://www.twap.so/" />
          <meta property="twitter:title" content="LP Finance | TWAMM" />
          <meta
            property="twitter:description"
            content="Permissionless TWAP order execution protocol on Solana."
          />
          <meta
            property="twitter:image"
            content="https://lptokenbucket.s3.amazonaws.com/lp-logo-light.png"
          />
          {/* Inject MUI styles first to match with the prepend: true configuration. */}
          {(this.props as any).emotionStyleTags}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

// `getInitialProps` belongs to `_document` (instead of `_app`),
// it's compatible with static-site generation (SSG).
PageDocument.getInitialProps = async (ctx) => {
  // Resolution order
  //
  // On the server:
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. document.getInitialProps
  // 4. app.render
  // 5. page.render
  // 6. document.render
  //
  // On the server with error:
  // 1. document.getInitialProps
  // 2. app.render
  // 3. page.render
  // 4. document.render
  //
  // On the client
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. app.render
  // 4. page.render

  const originalRenderPage = ctx.renderPage;

  // You can consider sharing the same emotion cache between all the SSR requests to speed up performance.
  // However, be aware that it can have global side effects.
  const cache = createEmotionCache();
  const { extractCriticalToChunks } = createEmotionServer(cache);

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App: any) =>
        function EnhanceApp(props) {
          // eslint-disable-next-line react/jsx-props-no-spreading
          return <App emotionCache={cache} {...props} />;
        },
    });

  const initialProps = await Document.getInitialProps(ctx);
  // This is important. It prevents emotion to render invalid HTML.
  // See https://github.com/mui-org/material-ui/issues/26561#issuecomment-855286153
  const emotionStyles = extractCriticalToChunks(initialProps.html);
  const emotionStyleTags = emotionStyles.styles.map((style) => (
    <style
      data-emotion={`${style.key} ${style.ids.join(" ")}`}
      key={style.key}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: style.css }}
    />
  ));

  return {
    ...initialProps,
    emotionStyleTags,
  };
};
