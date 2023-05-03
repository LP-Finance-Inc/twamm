import type { BoxProps } from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";

interface DisabledBoxProps extends BoxProps {
  disabled?: boolean;
}

export const TokenField = styled(Stack)`
  border-radius: 0.75rem;
  padding: 0.4rem 0.5rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex-grow: 0;
  cursor: pointer;
  background-color: rgba(255, 255, 255, 0.04);
  ${(p: DisabledBoxProps) => (p.disabled ? `cursor: not-allowed;` : undefined)}
`;

export const TokenIcon = styled(Avatar)`
  width: 28px;
  height: 28px;
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
  font-size: 0.9rem;
`;

export const TokenControl = styled("div")`
  color: #0c0;
  margin-left: 4px;
  margin-top: 8px;

  & > * {
    font-size: 1.1rem;
  }
`;
