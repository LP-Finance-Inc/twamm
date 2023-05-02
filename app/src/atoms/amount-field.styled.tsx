import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { NumericFormat } from "react-number-format";
import { styled } from "@mui/material/styles";

export const TokenIcon = styled(Avatar)`
  width: 60px;
  height: 60px;
`;

export const SecondaryControls = styled(Stack)`
  justify-content: space-between;
  align-items: center;
  margin: 0px 5px 0px 0px;
`;

export const TokenAmountTextField = styled(NumericFormat)`
  border: none;
  width: 100%;
  outline: transparent;
  background: transparent;
  padding: 5px 12px;
  font-size: 1.5rem;
  font-weight: 400;
  color: ${(p) => p.theme.palette.text.primary};
  &:disabled {
    color: ${(p) => p.theme.palette.text.secondary};
  }
`;

export const InputRoot = styled(Box)`
  box-shadow: inset -4px -4px 5px rgba(87, 87, 87, 0.2),
    inset 4px 4px 5px rgba(9, 9, 14, 0.5);
  border: 0.5px solid rgba(255, 255, 255, 0.01);
  border-radius: 16px !important;
  height: 76px;
`;

export const TokenAmountMaxButton = styled(Button)`
  border-radius: ${(p) => p.theme.shape.borderRadius};
  color: #0c0;
  border: 1px solid rgba(255, 255, 255, 0.1);
  margin-right: 10px;
`;

export const TokenName = styled("span")``;

export const TokenAmountInUSD = styled(Box)`
  color: ${({ theme }) => theme.palette.text.secondary};
  padding: 0 12px;
  font-size: 16px;
  font-weight: 500;
`;
