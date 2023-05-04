import type { NextPage } from "next";
import Head from "next/head";
import { useState, useRef } from "react";

import IndexPage from "../src/pages/index-page";
import AnonPage from "../src/pages/anon-page";
import { useSnackbar } from "../src/contexts/notification-context";

// We are not intending to hide this strictly lol :) You can use this to access.
const SecretCodes = [
  "wtf is twamm",
  "solano defi",
  "mrgn", // marginfi
  "noot!", // penguin
  "doggy", // samo
  "yujin",
  "solshield", // solshield
  "is mango back?", // mango
  "wen toly", // toly
  "insiders", // solana insiders
  "wen twap",
  "solano",
];
const welcome = ["Twap me baby", "Hmm, your size is size", "Wen TWAP?"];
const whoAreYou = ["Your size is not size", "Insider traders not allowed"];

const Home: NextPage = () => {
  const { enqueueSnackbar } = useSnackbar();

  const [isLogged, setIsLogged] = useState<boolean>(false);
  const ref = useRef<any>(null);

  const handleInputValue = (event: any) => {
    if (event.key === "Enter") {
      const value = ref.current.getInputValue();
      const findCode = SecretCodes.find((code) => code === value);

      if (value === findCode) {
        setIsLogged(true);
        const msg = welcome[Math.floor(Math.random() * welcome.length)];
        enqueueSnackbar(msg, {
          variant: "success",
        });
      } else {
        const msg = whoAreYou[Math.floor(Math.random() * whoAreYou.length)];
        enqueueSnackbar(msg, {
          variant: "error",
        });
      }
    }
  };

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="initial-scale=1,user-scalable=no,maximum-scale=1,width=device-width"
        />
        <title>LP Finance | TWAMM</title>
      </Head>
      {isLogged ? (
        <IndexPage />
      ) : (
        <AnonPage handleInputValue={handleInputValue} ref={ref} />
      )}
    </>
  );
};

export default Home;
