import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import { Button } from "@mui/material";

export const Root = styled(Card)(({ theme }) => ({
  position: "relative",
  width: "100%",
  minHeight: "160px",
  height: "100%",
  background: theme.palette.background.default,
  boxShadow: theme.shadows[10],
  borderRadius: "17px",
  animation:
    theme.palette.mode === "dark"
      ? "3s darkRotate ease infinite"
      : "3s lightRotate ease infinite",

  "@keyframes lightRotate": {
    to: {
      boxShadow:
        "4px 4px 4px rgba(118, 32, 224, 0.25), -4px -4px 4px rgba(118, 32, 224, 0.25)",
    },
  },

  "@keyframes darkRotate": {
    to: {
      boxShadow:
        "-4px -4px 4px rgba(46, 189, 46, 0.47), 4px 4px 4px rgba(28, 184, 28, 0.47)",
    },
  },
}));

export const ImageGroup = styled(Box)`
  width: 100%;
  min-height: 160px;
  height: 100%;
  background: ${({ theme }) => theme.palette.background.default};
  box-shadow: ${({ theme }) => theme.shadows[10]};
  border-radius: 17px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const Close = styled(IconButton)`
  position: absolute;
  right: 6px;
`;

export const DetailsControls = styled(Box)`
  text-align: start;
  padding: 0.3rem 1rem;
`;

export const PlaceOrder = styled(Button)`
  text-transform: capitalize;
`;
