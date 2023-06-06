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
  box-shadow: 2px 2px 3px rgba(9, 9, 14, 0.2),
    -2px -2px 3px rgba(87, 87, 87, 0.1);
  cursor: pointer;
  background-color: rgba(255, 255, 255, 0.04);
  ${(p: DisabledBoxProps) => (p.disabled ? `cursor: not-allowed;` : undefined)}
  transition: all 0.3s;
  transform: scale(1);

  &:hover {
    background-color: rgba(255, 255, 255, 0.06);
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
  color: #0c0;
  font-size: 0.95rem;
`;

export const TokenControl = styled("div")`
  color: #0c0;
  margin-left: 4px;
  margin-top: 8px;

  & > * {
    font-size: 1.1rem;
  }
`;
