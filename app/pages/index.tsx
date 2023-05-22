import type { NextPage } from "next";
import Head from "next/head";
import IndexPage from "../src/pages/index-page";

const Home: NextPage = () => (
  <>
    <Head>
      <meta
        name="viewport"
        content="initial-scale=1,user-scalable=no,maximum-scale=1,width=device-width"
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
        content="https://lptokenbucket.s3.amazonaws.com/bg.png"
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
        content="https://lptokenbucket.s3.amazonaws.com/bg.png"
      />
      <title>LP Finance | TWAMM</title>
    </Head>
    <IndexPage />
  </>
);

export default Home;
