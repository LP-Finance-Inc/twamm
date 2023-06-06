import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";

export const TokenField = styled(Box)`
  background: #161724;
  padding: 0.8rem 0.8rem;
  border-radius: 0.75rem;
  box-shadow: inset -4px -4px 5px rgba(87, 87, 87, 0.1),
    inset 4px 4px 5px rgba(9, 9, 14, 0.3);
`;

export const TokenLabelBox = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${({ theme }) => theme.palette.text.secondary};
  padding-bottom: ${({ theme }) => theme.spacing(1)};
  font-size: 0.9rem;
  font-weight: 600;
`;

export const TokenLabel = styled(Box)`
  display: flex;
  gap: 3px;
  align-items: center;
  color: ${({ theme }) => theme.palette.text.secondary};
  padding-bottom: ${({ theme }) => theme.spacing(1)};
  font-size: 0.9rem;
  font-weight: 600;
`;

export const OperationImage = styled(Box)`
  color: ${({ theme }) => theme.palette.text.secondary};
  display: flex;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing(1)};
`;

export const OperationButton = styled(IconButton)`
  box-shadow: inset -4px -4px 5px rgba(87, 87, 87, 0.1),
    inset 4px 4px 5px rgba(9, 9, 14, 0.3);
  background: #161724;

  & > * {
    border-radius: 50px;
    color: #0f0;
    transform: rotate(90deg);
    font-size: 1.5rem;
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

export const TokenTotal = styled(Box)`
  display: flex;
  align-items: center;
  gap: 0 1rem;
  color: ${(p) => p.theme.palette.text.secondary};
  font-size: 13px;
  font-weight: 600;

  @media (max-width: 600px) {
    gap: 0 0.5rem;
  }
`;

export const SecondaryControls = styled(Stack)`
  justify-content: space-between;
  align-items: center;
`;

export const TokenAmountMaxButton = styled(Button)`
  border-radius: ${(p) => p.theme.shape.borderRadius};
  color: #0c0 !important;
  box-shadow: 4px 4px 6px rgba(9, 9, 14, 0.4),
    -4px -4px 6px rgba(87, 87, 87, 0.1);
`;
