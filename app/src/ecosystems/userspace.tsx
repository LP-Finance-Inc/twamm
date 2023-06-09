import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { address } from "@twamm/client.js";
import { ErrorBoundary } from "react-error-boundary";
import { OrderSide } from "@twamm/types/lib";
import { useCallback, useMemo, useState } from "react";

import * as Styled from "./userspace.styled";
import ErrorFallback from "../atoms/error-fallback";
import ModeToggle, { modes } from "../atoms/mode-toggle";
import TokenPairs from "../organisms/token-pairs";
import AccountOrders from "../organisms/account-orders";
import TokenExchange, { TradeStruct } from "../organisms/token-exchange";

const DEFAULT_MODE = modes.get("exchange") as string;

const DEFAULT_TRADE = {
  amount: 0,
  pair: [
    address.NATIVE_TOKEN_ADDRESS,
    "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
  ] as AddressPair,
  type: OrderSide.buy,
};

export default () => {
  const [mode, setMode] = useState<string>(DEFAULT_MODE);
  const [trade, setTrade] = useState<TradeStruct>(DEFAULT_TRADE);

  const onModeChange = useCallback(
    (nextMode: string) => {
      setMode(nextMode);
    },
    [setMode]
  );

  const onTradeChange = useCallback((next: TradeStruct) => {
    setTrade(next);
  }, []);

  const component = useMemo(() => {
    if (mode === modes.get("pools")) return <TokenPairs />;

    if (mode === modes.get("orders")) return <AccountOrders />;

    if (mode === modes.get("exchange"))
      return <TokenExchange trade={trade} onTradeChange={onTradeChange} />;

    return null;
  }, [mode, onTradeChange, trade]);

  const maxWidth = useMemo(
    () => (mode === modes.get("exchange") ? "sm" : "lg"),
    [mode]
  );

  return (
    <Styled.MainContainer maxWidth={maxWidth}>
      <Box pt={4} px={{ xs: 0, sm: 2, md: 4 }}>
        <Styled.TitleControls>
          <Typography pb={1} variant="h4">
            LP Finance TWAMM
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Permissionless TWAP Order Execution
          </Typography>
        </Styled.TitleControls>
        <Styled.Controls py={1}>
          <ModeToggle mode={mode} onChange={onModeChange} />
        </Styled.Controls>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          {component}
        </ErrorBoundary>
      </Box>
    </Styled.MainContainer>
  );
};
