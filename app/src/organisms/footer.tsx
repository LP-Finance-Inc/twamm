import Container from "@mui/material/Container";
import Image from "next/image";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

import * as Styled from "./footer.styled";

export const FooterRegistry = [
  {
    id: 1,
    name: "twitter",
    icon: "/images/media/twitter.png",
    url: "https://twitter.com/LPFinance_",
  },
  {
    id: 2,
    name: "telegram",
    icon: "/images/media/telegram.png",
    url: "https://t.me/LP_Defi_Official_group",
  },
  {
    id: 3,
    name: "medium",
    icon: "/images/media/medium.png",
    url: "https://medium.com/@LP_Finance",
  },
  {
    id: 4,
    name: "linkedin",
    icon: "/images/media/linkedin.png",
    url: "https://www.linkedin.com/company/lpdefi/",
  },
  {
    id: 5,
    name: "github",
    icon: "/images/media/github.png",
    url: "https://github.com/LP-Finance-Inc",
  },
  {
    id: 6,
    name: "discord",
    icon: "/images/media/discord.png",
    url: "https://discord.gg/ug7mstrHNW",
  },
];

export default () => (
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
              <Image
                src="/images/lp-logo.png"
                alt="logo"
                width={110}
                height={60}
                priority
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Styled.MediaList>
                {FooterRegistry.map((list) => (
                  <Styled.MediaItem key={list.id}>
                    <Link href={list.url} target="_blank" rel="noreferrer">
                      <Image
                        src={list.icon}
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
        <Styled.CopyRight>
          <Typography variant="subtitle2" gutterBottom>
            2023 by LP Finance Labs Inc.
          </Typography>
        </Styled.CopyRight>
      </Container>
    </Styled.PaperFooter>
  </>
);
