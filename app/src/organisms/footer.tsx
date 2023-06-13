import Container from "@mui/material/Container";
import Image from "next/image";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";

import * as Styled from "./footer.styled";
import useTheme from "../contexts/theme-context";
import { FooterRegistry } from "../assets/registry";

export default () => {
  const { theme } = useTheme();

  return (
    <>
      {/* <Styled.PowerBox>
      <Link href="https://jup.ag" target="_blank" rel="noreferrer">
        <Styled.JupiterLogo>
          <Image
            src="/images/jupiter.png"
            alt="Powered by jupiter"
            priority
            fill
            style={{
              objectFit: "contain",
            }}
          />
        </Styled.JupiterLogo>
      </Link>
    </Styled.PowerBox> */}
      <Styled.PaperFooter>
        <Container maxWidth="lg">
          <Styled.BorderBox>
            <Grid container>
              <Grid item xs={12} sm={3} md={2}>
                {theme === "dark" ? (
                  <Image
                    src="/images/lp-logo.png"
                    alt="logo"
                    width={110}
                    height={60}
                    priority
                  />
                ) : (
                  <Image
                    src="/images/elp-logo.png"
                    alt="logo"
                    width={110}
                    height={60}
                    priority
                  />
                )}
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Styled.MediaList>
                  {FooterRegistry.map((list) => (
                    <Styled.MediaItem key={list.id}>
                      <Link href={list.url} target="_blank" rel="noreferrer">
                        <Image
                          src={
                            theme === "dark" ? list.darkIcon : list.lightIcon
                          }
                          alt="logo"
                          width={30}
                          height={30}
                          priority
                        />
                      </Link>
                    </Styled.MediaItem>
                  ))}
                </Styled.MediaList>
              </Grid>
            </Grid>
          </Styled.BorderBox>
          <Styled.CopyRight>2023 by LP Finance Labs Inc.</Styled.CopyRight>
        </Container>
      </Styled.PaperFooter>
    </>
  );
};
