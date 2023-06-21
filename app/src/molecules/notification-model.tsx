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
                  src="https://lptokenbucket.s3.amazonaws.com/lpfi.png"
                  alt="lpfi-token"
                  height={50}
                  width={50}
                />
              </Link>
              <Link href="http://" target="_blank" rel="noopener noreferrer">
                <Image
                  src="https://lptokenbucket.s3.amazonaws.com/bonk.png"
                  alt="bonk-token"
                  height={50}
                  width={50}
                  style={{
                    position: "relative",
                    bottom: "5px",
                  }}
                />
              </Link>
            </Styled.ImageGroup>
          </Grid>
          <Grid item xs={9}>
            <Styled.DetailsControls>
              <Typography pb={2} variant="subtitle1" marginTop={2}>
                BONK Trading Competition is Live!
              </Typography>
              <Typography variant="subtitle2" gutterBottom>
                Place BONK TWAP buy order to earn pool of 950M BONK rewards
                every 2 weeks!
              </Typography>
              <Link
                href="http://twitter.com/LPFinance_"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Styled.PlaceOrder>Learn More</Styled.PlaceOrder>
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
