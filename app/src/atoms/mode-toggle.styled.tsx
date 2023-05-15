import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { styled } from "@mui/material/styles";

const styledButton = styled(ToggleButton);

export const ModeButtonGroup = styled(ToggleButtonGroup)`
  border-radius: 50px;
  padding: 0.4rem 0.8rem;
  background: #161724;
  box-shadow: 4px 4px 6px rgba(9, 9, 14, 0.4),
    -4px -4px 6px rgba(87, 87, 87, 0.1);

  & .MuiToggleButton-root:hover {
    background-color: transparent;
  }
`;

export const ModeButton = styledButton`
  color: #0c0;
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
    background-color: #161724 !important;
    color: #0f0 !important;
    `
      : undefined}
`;
