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
import Switch, { SwitchProps } from "@mui/material/Switch";

export const MainContainer = styled(Container)`
  @media (max-width: 600px) {
    padding-left: 6px !important;
    padding-right: 6px !important;
  }
`;

export const Root = styled(AppBar)`
  background: ${({ theme }) => theme.palette.background.default} !important;
`;

export const DrawerCard = styled(Box)`
  background: ${({ theme }) => theme.palette.background.default} !important;
  height: 100%;
  width: 100%;
`;

export const DividerLine = styled(Divider)`
  border: 1px solid #0c0;
  margin-top: 8px;
`;

export const Header = styled(Toolbar)`
  justify-content: space-between;
  background-color: ${({ theme }) =>
    theme.palette.background.default} !important;
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
  color: ${({ theme }) => theme.palette.text.primary};
  margin: 0 0.7rem;
  font-weight: 600;

  &:hover {
    color: ${({ theme }) => theme.palette.text.secondary};
  }
`;

export const UtilsControl = styled(Card)`
  cursor: pointer;
  display: flex;
  padding: 4px;
  color: ${({ theme }) => theme.palette.text.secondary};
  background: ${({ theme }) => theme.palette.background.default};
  box-shadow: ${({ theme }) => theme.shadows[1]};
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
    color: ${({ theme }) => theme.palette.text.secondary};
    background: ${({ theme }) => theme.palette.background.default};
    border-radius: 12px;
    box-shadow: ${({ theme }) => theme.shadows[1]};
    font-weight: 600;
  }

  &.wallet-adapter-button:active {
    box-shadow: ${({ theme }) => theme.shadows[2]};
  }

  &.wallet-adapter-button:not([disabled]):hover,
  &.wallet-adapter-button:focus,
  &.wallet-adapter-button:active {
    background-color: ${({ theme }) => theme.palette.background.default};
    color: ${({ theme }) => theme.palette.text.secondary};
  }
`;

export const IOSSwitch = styled((props: SwitchProps) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 50,
  height: 26,
  padding: 0,
  boxShadow: theme.shadows[1],
  borderRadius: 26,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(25px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: theme.palette.mode === "dark" ? "#2ECA45" : "#7620E0",
        opacity: 1,
        border: 0,
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "#33cf4d",
      border: "6px solid #fff",
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color:
        theme.palette.mode === "light"
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 22,
    height: 22,
  },
  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === "light" ? "#7620E0" : "#39393D",
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
  },
}));
