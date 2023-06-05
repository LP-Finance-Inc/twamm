import Image from "next/image";
import Link from "next/link";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import * as Styled from "./notification-mode-styled";
import i18n from "../i18n";

export default ({ onToggle }: { onToggle: (arg: boolean) => void }) => {
  const onClose = () => onToggle(false);

  return (
    <Box my={1}>
      <Styled.Root>
        <Grid container>
          <Grid item xs={2}>
            <Styled.ImageGroup>
              <Link href="http://" target="_blank" rel="noopener noreferrer">
                <Image
                  src="https://jup.ag/coins/king-token.svg"
                  alt="king-token"
                  height={50}
                  width={50}
                />
              </Link>
              <Link href="http://" target="_blank" rel="noopener noreferrer">
                <Image
                  src="https://jup.ag/coins/samo-token.svg"
                  alt="samo-token"
                  height={50}
                  width={50}
                  style={{
                    position: "relative",
                    bottom: "15px",
                  }}
                />
              </Link>
            </Styled.ImageGroup>
          </Grid>
          <Grid item xs={9}>
            <Styled.DetailsControls>
              <Typography pb={1} variant="subtitle1">
                Trade onLimit Order with 0% fees
              </Typography>
              <Typography variant="subtitle2" gutterBottom>
                Trading Limit Orders are now free for a limited time only. Also
                stand a chance to win 100k $SAMO and 1M $KING weekly!
              </Typography>
              <Link href="http://" target="_blank" rel="noopener noreferrer">
                <Styled.PlaceOrder>Place an Order Now</Styled.PlaceOrder>
              </Link>
            </Styled.DetailsControls>
          </Grid>
          <Grid item xs={1}>
            <Styled.Close aria-label={i18n.AriaLabelClose} onClick={onClose}>
              <CloseIcon />
            </Styled.Close>
          </Grid>
        </Grid>
      </Styled.Root>
    </Box>
  );
};
