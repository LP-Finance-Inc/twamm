import { useRef, forwardRef, useImperativeHandle } from "react";
import Image from "next/image";
import NoSsr from "@mui/material/NoSsr";
import Box from "@mui/material/Box";

import OfflineOverlay from "../organisms/offline-overlay";
import styles from "./anon.module.css";
import Logo from "../../public/images/lp-logo.png";
import Wallstreet from "../../public/images/wallstreet.png";

export default forwardRef((props: { handleInputValue: any }, ref) => {
  const inputRef = useRef<any>();

  useImperativeHandle(ref, () => ({
    getInputValue() {
      return inputRef.current.value;
    },
  }));

  return (
    <div className={styles.root}>
      <OfflineOverlay />
      <div className={styles.main}>
        <NoSsr>
          <div className={styles.box}>
            <Image
              src={Logo}
              placeholder="blur"
              alt="Twamm official logo"
              fill
              style={{
                objectFit: "contain",
              }}
            />
          </div>
          <Box mt={2}>
            <p className={styles.heading}>
              Welcome Anon, meet your on-chain broker TWAMM
            </p>
          </Box>
          <div className={styles.unlockImg}>
            <Image
              src={Wallstreet}
              placeholder="blur"
              alt="Wallstreet"
              fill
              style={{
                objectFit: "contain",
              }}
            />
          </div>
          <div className={styles.InputBox}>
            <input
              type="text"
              name="password"
              placeholder="Your code here…"
              minLength={5}
              maxLength={30}
              autoComplete="none"
              className={styles.Input}
              onKeyDown={props.handleInputValue}
              ref={inputRef}
            />
          </div>
        </NoSsr>
      </div>
    </div>
  );
});
