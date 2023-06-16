import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { styled } from "@mui/material/styles";

const styledButton = styled(ToggleButton);

export const ModeButtonGroup = styled(ToggleButtonGroup)`
  border-radius: 50px;
  padding: 0.4rem 0.8rem;
  background: ${({ theme }) => theme.palette.background.default};
  box-shadow: ${({ theme }) => theme.shadows[3]};

  & .MuiToggleButton-root:hover {
    background-color: transparent;
  }
`;

export const ModeButton = styledButton`
  color: ${({ theme }) => theme.palette.text.primary};
  border-radius: 0.5rem;
  padding: 0.3rem 0.8rem;
  text-transform: none;
  border: 1px solid transparent;
  font-weight: 600;
  font-size: 0.95rem;
  white-space: nowrap; 

  ${(p) =>
    p?.selected
      ? `
    background-color: ${p.theme.palette.background.default} !important;
    color: ${p.theme.palette.action.active} !important;
    `
      : undefined}
`;
