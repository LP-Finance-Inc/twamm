import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import { NumericFormat } from "react-number-format";
import { styled } from "@mui/material/styles";
import Skeleton from "@mui/material/Skeleton";

export const TokenIcon = styled(Avatar)`
  width: 60px;
  height: 60px;
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
    color: ${(p) => p.theme.palette.text.primary};
  }
`;

export const InputRoot = styled(Box)`
  margin-top: 0px;
`;

export const TokenAmountInUSD = styled(Box)`
  text-align: right;
  color: ${({ theme }) => theme.palette.text.primary};
  font-size: 0.85rem;
  font-weight: 500;
`;

export const LoaderBox = styled(Box)`
  position: relative;
  right: 0;
  width: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  flex-direction: column;
  gap: 2px;
`;

export const SkeletonBox = styled(Skeleton)`
  width: 100px !important;
  display: flex;
  justify-content: flex-end;
`;
