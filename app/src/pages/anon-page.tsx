import { useRef, forwardRef, useImperativeHandle } from "react";
import Image from "next/image";
import NoSsr from "@mui/material/NoSsr";
import Box from "@mui/material/Box";
import OfflineOverlay from "../organisms/offline-overlay";
import styles from "./anon.module.css";
import Logo from "../../public/images/lp-logo.png";
import Wallstreet from "../../public/images/wall.gif";
import MobileWallstreet from "../../public/images/wallstreet.jpeg";
import useBreakpoints from "../hooks/use-breakpoints";

export default forwardRef((props: { handleInputValue: any }, ref) => {
  const inputRef = useRef<any>();

  useImperativeHandle(ref, () => ({
    getInputValue() {
      return inputRef.current.value;
    },
  }));

  const { isMobile } = useBreakpoints();

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
              src={isMobile ? MobileWallstreet : Wallstreet}
              placeholder="blur"
              alt="Wallstreet"
              fill
              style={{
                objectFit: "contain",
              }}
              blurDataURL="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="
            />
          </div>
          <div className={styles.InputBox}>
            <input
              type="text"
              name="password"
              placeholder="Your code here"
              minLength={5}
              maxLength={30}
              className={styles.Input}
              onKeyDown={props.handleInputValue}
              ref={inputRef}
              style={{ textAlign: "center" }}
            />
          </div>
        </NoSsr>
      </div>
    </div>
  );
});
