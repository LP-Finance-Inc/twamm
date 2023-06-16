import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { styled } from "@mui/material/styles";

import { WalletMultiButton } from "../lib";

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
  display: flex;
  justify-content: center;
  transition: all 0.3s;

  &.wallet-adapter-button {
    background: ${({ theme }) => theme.palette.background.default};
    white-space: nowrap;
    height: 48px;
    color: ${({ theme }) => theme.palette.text.secondary};
    box-shadow: ${({ theme }) => theme.shadows[1]};
    font-weight: 600;
  }

  &.wallet-adapter-button:focus {
    box-shadow: ${({ theme }) => theme.shadows[2]};
  }

  &.wallet-adapter-button:not([disabled]):hover,
  &.wallet-adapter-button:focus,
  &.wallet-adapter-button:active {
    background-color: rgba(255, 255, 255, 0.04);
  }
`;
