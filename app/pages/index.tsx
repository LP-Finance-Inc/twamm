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
      <meta property="og:type" content="website" />
      <meta property="og:title" content="LP Finance | TWAMM" />
      <meta
        property="og:description"
        content="Permissionless TWAP Order Execution"
      />
      <meta
        property="og:image"
        content="https://lptokenbucket.s3.amazonaws.com/Screenshot+2023-05-21+at+11.08.54+PM.png"
      />
      <meta property="og:url" content="https://twap.lp.finance" />
      <title>LP Finance | TWAMM</title>
    </Head>
    <IndexPage />
  </>
);

export default Home;
