import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import M, { Extra } from "easy-maybe/lib";
import TuneIcon from "@mui/icons-material/Tune";
import { useCallback, useEffect, useRef } from "react";
import Image from "next/image";

import * as Styled from "./header.styled";
import i18n from "../i18n";
import SettingsModal from "../molecules/settings-modal";
import TransactionRunnerModal from "../molecules/transaction-runner-modal";
import TransactionProgress from "./transaction-progress";
import UniversalPopover, { Ref } from "../molecules/universal-popover";
import useBreakpoints from "../hooks/use-breakpoints";
import useTxRunner from "../contexts/transaction-runner-context";

export default () => {
  const { isDesktop, isMobile } = useBreakpoints();
  const { active } = useTxRunner();

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

  return (
    <>
      <UniversalPopover ariaLabelledBy="tx-runner-modal-title" ref={runnerRef}>
        <TransactionRunnerModal id="tx-runner-modal-title" />
      </UniversalPopover>

      <UniversalPopover ariaLabelledBy="settings-modal-title" ref={settingsRef}>
        <SettingsModal id="settings-modal-title" onToggle={onSettingsToggle} />
      </UniversalPopover>

      <Styled.Root aria-label={i18n.AriaLabelHeader} position="sticky">
        <Container maxWidth="lg">
          <Styled.Header variant={isDesktop ? "dense" : undefined}>
            <Styled.Logo direction="row">
              <Image
                src={
                  isMobile
                    ? "/images/lp-logo-mobile.png"
                    : "/images/lp-logo.png"
                }
                alt="logo"
                width={isMobile ? 60 : 117}
                height={isMobile ? 60 : 65}
                object-fit="cover"
                priority
              />
            </Styled.Logo>

            <Styled.Controls direction="row">
              <Box px={2}>
                <Styled.UtilsControl onClick={() => onSettingsToggle(true)}>
                  <TuneIcon />
                </Styled.UtilsControl>
              </Box>
              <Box pr={2}>
                <TransactionProgress setOpen={() => onTxStatusToggle(true)} />
              </Box>
              <Box py={isDesktop ? 1 : 0}>
                <Styled.WalletButton />
              </Box>
            </Styled.Controls>
          </Styled.Header>
        </Container>
      </Styled.Root>
    </>
  );
};
