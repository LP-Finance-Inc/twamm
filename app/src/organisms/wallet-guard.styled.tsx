import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { styled } from "@mui/material/styles";

export const Container = styled(Card)`
  background: transparent;
  border: 0;
  margin: 0 auto;
`;

export const Inner = styled(CardContent)`
  max-width: var(--min-width);
`;

export const ConnectBox = styled(Box)`
  & .wallet-adapter-dropdown {
    width: 100%;
  }
`;

export const ConnectButton = styled(WalletMultiButton)`
  border-radius: 50px;
  width: 100%;
  color: #0c0;
  display: flex;
  justify-content: center;
  transition: all 0.3s;

  &.wallet-adapter-button {
    background: #161724;
    white-space: nowrap;
    height: 48px;
    box-shadow: 4px 4px 6px rgba(9, 9, 14, 0.4),
      -4px -4px 6px rgba(87, 87, 87, 0.1);
  }

  &.wallet-adapter-button:focus {
    box-shadow: inset -4px -4px 6px rgba(87, 87, 87, 0.2),
      inset 4px 4px 6px rgba(9, 9, 14, 0.4);
  }

  &.wallet-adapter-button:not([disabled]):hover,
  &.wallet-adapter-button:focus,
  &.wallet-adapter-button:active {
    background-color: rgba(255, 255, 255, 0.04);
  }
`;
