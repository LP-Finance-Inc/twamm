import Container from "@mui/material/Container";
import Image from "next/image";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";

import { useMemo } from "react";
import * as Styled from "./footer.styled";
import useTheme from "../contexts/theme-context";
import GithubIcon from "../assets/icons/github-icon";
import TelegramIcon from "../assets/icons/telegram-icon";
import LinkedinIcon from "../assets/icons/linkedin-icon";
import TwitterIcon from "../assets/icons/twitter-icon";
import MediumIcon from "../assets/icons/medium-icon";
import DiscordIcon from "../assets/icons/discord-icon";

export default () => {
  const { theme } = useTheme();

  const FooterRegistry = useMemo(() => {
    const color = theme === "dark" ? "#0c0" : "#7620E0";
    const registry = [
      {
        id: 1,
        name: "twitter",
        icon: <TwitterIcon color={color} />,
        url: "https://twitter.com/LPFinance_",
      },
      {
        id: 2,
        name: "telegram",
        icon: <TelegramIcon color={color} />,
        url: "https://t.me/LP_Defi_Official_group",
      },
      {
        id: 3,
        name: "medium",
        icon: <MediumIcon color={color} />,
        url: "https://medium.com/@LP_Finance",
      },
      {
        id: 4,
        name: "linkedin",
        icon: <LinkedinIcon color={color} />,
        url: "https://www.linkedin.com/company/lpdefi/",
      },
      {
        id: 5,
        name: "github",
        icon: <GithubIcon color={color} />,
        url: "https://github.com/LP-Finance-Inc",
      },
      {
        id: 6,
        name: "discord",
        icon: <DiscordIcon color={color} />,
        url: "https://discord.gg/ug7mstrHNW",
      },
    ];
    return registry;
  }, [theme]);

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
                        {list.icon}
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
