import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";

export const TokenLabelBox = styled(Box)`
  color: ${({ theme }) => theme.palette.text.secondary};
  padding-bottom: ${({ theme }) => theme.spacing(1)};
  font-size: 14px;
  font-weight: 600;
`;

export const OperationImage = styled(Box)`
  color: ${({ theme }) => theme.palette.text.secondary};
  display: flex;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing(2)};
`;

export const OperationButton = styled(IconButton)`
  width: 47px;
  height: 47px;
  box-shadow: inset -4px -4px 5px rgba(87, 87, 87, 0.2),
    inset 4px 4px 5px rgba(9, 9, 14, 0.5);

  & > * {
    border-radius: 100%;
    padding: 1px;
    transform: rotate(90deg);
    color: #0c0;
  }
`;

export const ConnectBox = styled(Box)`
  & .wallet-adapter-dropdown {
    width: 100%;
  }
`;

export const ConnectButton = styled(Button)`
  background-color: #4bbeff;
  border-radius: 40px;
  width: 100%;
  display: flex;
  justify-content: center;
  color: #000;
  &:hover,
  &:focus,
  &:active {
    color: #fff;
  }
`;
