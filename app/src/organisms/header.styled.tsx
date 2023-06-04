import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { styled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";

export const MainContainer = styled(Container)`
  @media (max-width: 600px) {
    padding-left: 6px !important;
    padding-right: 6px !important;
  }
`;

export const Root = styled(AppBar)`
  background: #161724 !important;
`;

export const DrawerCard = styled(Box)`
  background: #161724 !important;
  height: 100%;
  width: 100%;
`;
export const DividerLine = styled(Divider)`
  border: 1px solid #0c0;
  margin-top: 8px;
`;

export const Header = styled(Toolbar)`
  justify-content: space-between;
  background-color: #161724 !important;
  padding: 0.2rem 0rem !important;

  @media (max-width: 600px) {
    padding: 0.4rem 0rem;
  }
`;

export const Logo = styled(Stack)`
  display: flex;
  gap: 0 2px;
  align-items: center;
`;

export const DrawerLogo = styled(Stack)`
  margin-left: 10px;
  margin-top: 5px;
`;

export const Controls = styled(Stack)`
  flex-grow: 0;
  align-items: center;
`;

export const DrawerIcon = styled(MenuIcon)`
  color: #0f0 !important;
`;

export const InfoLink = styled(Link)`
  color: #0c0;
  margin: 0 1rem;
`;

export const UtilsControl = styled(Card)`
  cursor: pointer;
  display: flex;
  padding: 4px;
  color: #0c0;
  background: #161724;
  box-shadow: 4px 4px 6px rgba(9, 9, 14, 0.4),
    -4px -4px 6px rgba(87, 87, 87, 0.1);
  border: none;
`;

export const WalletButton = styled(WalletMultiButton)`
  border-radius: 40px;
  width: 100%;
  color: #0c0;
  display: flex;
  justify-content: center;

  &.wallet-adapter-button {
    white-space: nowrap;
    color: #0c0;
    background: #161724;
    border-radius: 12px;
    box-shadow: 4px 4px 6px rgba(9, 9, 14, 0.4),
      -4px -4px 6px rgba(87, 87, 87, 0.1);
  }

  &.wallet-adapter-button:active {
    box-shadow: inset -4px -4px 5px rgba(87, 87, 87, 0.2),
      inset 4px 4px 5px rgba(9, 9, 14, 0.5);
  }

  &.wallet-adapter-button:not([disabled]):hover,
  &.wallet-adapter-button:focus,
  &.wallet-adapter-button:active {
    background-color: #161724;
    color: #0c0;
  }
`;
