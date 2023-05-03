import type { NextPage } from "next";
import Head from "next/head";
import { useState, useRef } from "react";

import IndexPage from "../src/pages/index-page";
import AnonPage from "../src/pages/anon-page";
import { useSnackbar } from "../src/contexts/notification-context";

const Home: NextPage = () => {
  const { enqueueSnackbar } = useSnackbar();

  const [isLogged, setIsLogged] = useState<boolean>(false);
  const ref = useRef<any>(null);

  const handleInputValue = (event: any) => {
    if (event.key === "Enter") {
      const value = ref.current.getInputValue();
      const twammPassword = localStorage.getItem("twamm-access");
      if (twammPassword) {
        if (value === twammPassword) {
          setIsLogged(true);
          enqueueSnackbar("Welcome our twamm app", {
            variant: "success",
          });
        } else {
          enqueueSnackbar("Password not matched!", {
            variant: "error",
          });
        }
      } else {
        localStorage.setItem("twamm-access", value);
        setIsLogged(true);
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
