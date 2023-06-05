import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";

export const Root = styled(Card)`
  position: relative;
  width: 100%;
  min-height: 160px;
  height: 100%;
  background: #161724;
  box-shadow: -2px -2px 4px rgba(0, 204, 0, 0.07),
    2px 2px 4px rgba(0, 255, 0, 0.07);
  border-radius: 17px;
  animation: 3s rotate ease infinite;

  @keyframes rotate {
    to {
      box-shadow: -4px -4px 4px rgba(46, 189, 46, 0.47),
        4px 4px 4px rgba(28, 184, 28, 0.47);
    }
  }
`;

export const ImageGroup = styled(Box)`
  width: 100%;
  min-height: 160px;
  height: 100%;
  background: #161724;
  box-shadow: -2px -2px 4px rgba(0, 204, 0, 0.07),
    2px 2px 4px rgba(0, 255, 0, 0.07);
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
  padding: 1rem;
`;
