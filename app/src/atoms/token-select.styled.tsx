import type { BoxProps } from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";

interface DisabledBoxProps extends BoxProps {
  disabled?: boolean;
}

export const TokenField = styled(Stack)`
  border-radius: 0.75rem;
  padding: 0.7rem 0.5rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex-grow: 0;
  box-shadow: ${({ theme }) => theme.shadows[7]};
  cursor: pointer;
  background-color: rgba(255, 255, 255, 0.02);
  ${(p: DisabledBoxProps) => (p.disabled ? `cursor: not-allowed;` : undefined)}
  transition: all 0.3s;
  transform: scale(1);

  &:hover {
    background-color: rgba(255, 255, 255, 0.04);
  }

  &:active {
    transform: scale(0.9);
  }
`;

export const TokenIcon = styled(Avatar)`
  width: 30px;
  height: 30px;
  margin-right: 10px;
`;

export const MobileTokenIcon = styled(Avatar)`
  width: 28px;
  height: 28px;
  margin-right: 4px;
`;

export const TokenName = styled("span")`
  text-transform: uppercase;
  color: ${({ theme }) => theme.palette.text.primary};
  font-size: 0.95rem;
  font-weight: 600;
`;

export const TokenControl = styled("div")`
  color: ${({ theme }) => theme.palette.text.primary};
  margin-left: 4px;
  margin-top: 8px;

  & > * {
    font-size: 1.1rem;
  }
`;
