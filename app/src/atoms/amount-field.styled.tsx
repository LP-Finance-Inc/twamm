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
  text-align: right;
  display: flex;
  align-items: flex-start;
  direction: ltr;
  font-size: 1.2rem;
  font-weight: 400;
  color: ${(p) => p.theme.palette.text.primary};

  &:disabled {
    color: ${(p) => p.theme.palette.text.secondary};
  }
`;

export const InputRoot = styled(Box)`
  position: relative;
`;

export const TokenAmountMaxButton = styled(Button)`
  border-radius: ${(p) => p.theme.shape.borderRadius};
  color: #0c0;
  border: 1px solid rgba(255, 255, 255, 0.1);
  margin-right: 10px;
`;

export const TokenName = styled("span")``;

export const TokenAmountInUSD = styled(Box)`
  text-align: right;
  color: ${({ theme }) => theme.palette.text.secondary};
  font-size: 0.85rem;
  font-weight: 500;
`;

export const SkeletonBox = styled(Box)`
  display: flex;
  justify-content: center;
  text-align: right;
`;
