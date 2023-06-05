import Box from "@mui/material/Box";
import M, { Extra } from "easy-maybe/lib";
import TuneIcon from "@mui/icons-material/Tune";
import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import IconButton from "@mui/material/IconButton";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";

import * as Styled from "./header.styled";
import i18n from "../i18n";
import SettingsModal from "../molecules/settings-modal";
import TransactionRunnerModal from "../molecules/transaction-runner-modal";
import TransactionProgress from "./transaction-progress";
import UniversalPopover, { Ref } from "../molecules/universal-popover";
import useBreakpoints from "../hooks/use-breakpoints";
import useTxRunner from "../contexts/transaction-runner-context";
import DesktopLogo from "../../public/images/lp-logo.png";
import MobileLogo from "../../public/images/lp-logo-mobile.png";

interface Props {
  window?: () => Window;
}

const drawerWidth = 240;
const navItems = [
  {
    id: 1,
    title: "Document",
    link: "https://docs.lp.finance/twamm/time-weighted-average-market-maker",
  },
  {
    id: 2,
    title: "Listing",
    link: "https://docs.lp.finance/twamm-as-a-service/token-listing",
  },
  {
    id: 3,
    title: "Custom Order",
    link: "https://docs.lp.finance/twamm-as-a-service/custom-orders-and-otc",
  },
];

export default (props: Props) => {
  const { window } = props;

  const { isDesktop, isMobile } = useBreakpoints();
  const { active } = useTxRunner();

  const [mobileOpen, setMobileOpen] = useState<boolean>(false);

  const runnerRef = useRef<Ref>();
  const settingsRef = useRef<Ref>();

  useEffect(() => {
    M.andMap(([runner]) => {
      if (!runner.isOpened) runner.open();
    }, Extra.combine2([M.of(runnerRef.current), M.of(!active && undefined)]));

    return () => {};
  }, [active, runnerRef]);

  const onSettingsToggle = useCallback((flag: boolean) => {
    if (flag) settingsRef.current?.open();
    else settingsRef.current?.close();
  }, []);

  const onTxStatusToggle = useCallback((flag: boolean) => {
    if (flag) runnerRef.current?.open();
    else runnerRef.current?.close();
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Styled.DrawerCard onClick={handleDrawerToggle}>
      <Styled.DrawerLogo direction="row">
        <Image
          src={DesktopLogo}
          alt="logo"
          width={90}
          height={50}
          object-fit="cover"
          priority
        />
      </Styled.DrawerLogo>
      <Styled.DividerLine />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.id} disablePadding>
            <ListItemButton sx={{ textAlign: "center" }}>
              <Styled.InfoLink
                key={item.id}
                href={item.link}
                underline="none"
                target="_blank"
                rel="noopener"
              >
                {item.title}
              </Styled.InfoLink>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Styled.DrawerCard>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <>
      <UniversalPopover ariaLabelledBy="tx-runner-modal-title" ref={runnerRef}>
        <TransactionRunnerModal id="tx-runner-modal-title" />
      </UniversalPopover>

      <UniversalPopover ariaLabelledBy="settings-modal-title" ref={settingsRef}>
        <SettingsModal id="settings-modal-title" onToggle={onSettingsToggle} />
      </UniversalPopover>

      <Styled.Root aria-label={i18n.AriaLabelHeader} position="sticky">
        <Styled.MainContainer maxWidth="lg">
          <Styled.Header variant={isDesktop ? "dense" : undefined}>
            <Styled.Logo direction="row">
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ m: 0, p: 0, px: 0.5, display: { md: "none" } }}
              >
                <Styled.DrawerIcon />
              </IconButton>
              <Image
                src={isMobile ? MobileLogo : DesktopLogo}
                alt="logo"
                width={isMobile ? 56 : 117}
                height={isMobile ? 56 : 65}
                object-fit="cover"
                priority
              />
            </Styled.Logo>
            <Styled.Controls direction="row">
              <Box
                sx={{
                  mr: 0.5,
                  display: { xs: "none", sm: "none", md: "block" },
                }}
              >
                {navItems.map((item) => (
                  <Styled.InfoLink
                    key={item.id}
                    href={item.link}
                    underline="none"
                    target="_blank"
                    rel="noopener"
                  >
                    {item.title}
                  </Styled.InfoLink>
                ))}
              </Box>
              <Box px={isMobile ? 1 : 2}>
                <Styled.UtilsControl onClick={() => onSettingsToggle(true)}>
                  <TuneIcon />
                </Styled.UtilsControl>
              </Box>
              <Box pr={isMobile ? 1 : 2}>
                <TransactionProgress setOpen={() => onTxStatusToggle(true)} />
              </Box>
              <Box py={isDesktop ? 1 : 0}>
                <Styled.WalletButton />
              </Box>
            </Styled.Controls>
          </Styled.Header>
        </Styled.MainContainer>
      </Styled.Root>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "block", md: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </>
  );
};
