import { useMemo } from "react";
import M from "easy-maybe/lib";
import Alert from "@mui/material/Alert";
import Avatar from "@mui/material/Avatar";

import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import type { ListChildComponentProps } from "react-window";
import type { MouseEvent } from "react";
import { FixedSizeList } from "react-window";
import { PublicKey } from "@solana/web3.js";

import * as Styled from "./coin-select.styled";
import useBreakpoints from "../hooks/use-breakpoints";
import { add, keepPrevious, refreshEach } from "../swr-options";
import useBalance from "../hooks/use-balance";
import { formatNumber } from "../utils";

export interface CoinBalanceProps {
  address: string;
  publicKey: PublicKey | null;
  coin: string;
}

export const CoinBalance = ({ address, publicKey, coin }: CoinBalanceProps) => {
  const balance = useBalance(address, add([keepPrevious(), refreshEach()]));

  const displayBalance = M.withDefault<number>(0, M.of(balance.data));

  if (!publicKey) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: "0.4rem",
        }}
      >
        <Typography variant="subtitle2" gutterBottom>
          {formatNumber.format(0, 6)}
        </Typography>
        <Typography variant="subtitle2" gutterBottom>
          {coin}
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        gap: "0.4rem",
      }}
    >
      <Typography variant="subtitle2" gutterBottom>
        {formatNumber.format(displayBalance, 6)}
      </Typography>
      <Typography variant="subtitle2" gutterBottom>
        {coin}
      </Typography>
    </Box>
  );
};

export default ({
  data,
  filterValue,
  onClick = () => {},
  publicKey,
}: {
  data: Record<
    string,
    { symbol: string; image: string; name: string; address: string }
  >;
  filterValue?: string;
  onClick: (arg0: MouseEvent, arg1: string) => void;
  publicKey: PublicKey | null;
}) => {
  const { isMobile } = useBreakpoints();

  const coins = useMemo(() => data, [data]);

  const coinRecords = useMemo(() => {
    const values = Object.values(coins);

    if (!filterValue) return values;

    return values.filter((coin) => {
      const name = coin.name.toLowerCase();
      const symbol = coin.symbol.toLowerCase();
      return (
        name.startsWith(filterValue) ||
        name.includes(filterValue) ||
        symbol.startsWith(filterValue)
      );
    });
  }, [coins, filterValue]);

  return (
    <Styled.RootList dense={isMobile}>
      {coinRecords.length === 0 && (
        <Styled.ListItemStyle disablePadding>
          <Alert severity="info">No results</Alert>
        </Styled.ListItemStyle>
      )}
      <FixedSizeList
        height={200}
        width="100%"
        itemSize={56}
        itemCount={coinRecords.length}
        overscanCount={5}
      >
        {({ index, style }: ListChildComponentProps) => (
          <Styled.CoinItem
            disablePadding
            key={index}
            onClick={(e: MouseEvent) => onClick(e, coinRecords[index].symbol)}
            style={style}
          >
            <ListItemIcon>
              <Avatar
                alt={coinRecords[index].symbol}
                src={coinRecords[index].image}
              >
                T
              </Avatar>
            </ListItemIcon>
            <ListItemText
              disableTypography
              primary={
                <Typography variant="body2">
                  {coinRecords[index].symbol.toUpperCase()}
                </Typography>
              }
              secondary={
                <Typography variant="body2">
                  {coinRecords[index].name}
                </Typography>
              }
            />
            <CoinBalance
              address={coinRecords[index].address}
              publicKey={publicKey}
              coin={coinRecords[index].symbol}
            />
          </Styled.CoinItem>
        )}
      </FixedSizeList>
    </Styled.RootList>
  );
};
