import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

export const TokenField = styled(Box)`
  background: ${({ theme }) => theme.palette.background.default};
  padding: 0.8rem 0.8rem;
  border-radius: 0.75rem;
  box-shadow: ${({ theme }) => theme.shadows[6]};
`;

export const TokenLabelBox = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${({ theme }) => theme.palette.text.primary};
  padding-bottom: ${({ theme }) => theme.spacing(1)};
  font-size: 0.9rem;
  font-weight: 600;
`;

export const TokenLabel = styled(Box)`
  display: flex;
  gap: 3px;
  align-items: center;
  color: ${({ theme }) => theme.palette.text.primary};
  padding-bottom: ${({ theme }) => theme.spacing(1)};
  font-size: 0.9rem;
  font-weight: 600;
`;

export const OperationImage = styled(Box)`
  color: ${({ theme }) => theme.palette.text.primary};
  display: flex;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing(1)};
`;

export const OperationButton = styled(IconButton)`
  box-shadow: ${({ theme }) => theme.shadows[6]};
  background: ${({ theme }) => theme.palette.background.default};

  & > * {
    border-radius: 50px;
    color: ${({ theme }) => theme.palette.text.secondary};
    transform: rotate(90deg);
    font-size: 1.5rem;
  }
`;

export const TokenTotal = styled(Box)`
  display: flex;
  align-items: center;
  gap: 0 1rem;
  color: ${(p) => p.theme.palette.text.primary};
  font-size: 13px;
  font-weight: 600;

  @media (max-width: 600px) {
    gap: 0 0.5rem;
  }
`;

export const TokenAmountMaxButton = styled(Button)`
  border-radius: ${(p) => p.theme.shape.borderRadius};
  color: ${({ theme }) => theme.palette.text.secondary} !important;
  box-shadow: ${({ theme }) => theme.shadows[1]};
`;

export const PriceImpactText = styled(Typography)`
  color: ${({ theme }) => theme.palette.text.secondary};
`;
