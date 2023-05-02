import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { styled } from "@mui/material/styles";

const styledButton = styled(ToggleButton);

const BORDER_RADIUS = "20px";
const BORDER = "1px solid rgba(255, 255, 255, 0.1)";

export const ModeButtonGroup = styled(ToggleButtonGroup)`
  border-radius: 50px;
  padding: 0.4rem 0.8rem;
  background: #161724;
  box-shadow: 4px 4px 6px rgba(9, 9, 14, 0.5),
    -4px -4px 6px rgba(87, 87, 87, 0.2);

  & .MuiToggleButton-root:hover {
    background-color: transparent;
  }
`;

export const ModeButton = styledButton`
  color: #0c0;
  border-radius: 0.5rem;
  padding: 0.3rem 1rem;
  text-transform: none;
  border: 1px solid transparent;
  font-weight: 600;
  font-size: 0.95rem;
  white-space: nowrap; 

  ${(p) =>
    p?.selected
      ? `
    background-color: #161724 !important;
    border: ${BORDER};
    border-bottom-left-radius: ${BORDER_RADIUS} !important;
    border-bottom-right-radius: ${BORDER_RADIUS} !important;
    border-left: ${BORDER} !important;
    border-top-left-radius: ${BORDER_RADIUS} !important;
    border-top-right-radius: ${BORDER_RADIUS} !important;
    color: #0c0 !important;
    `
      : undefined}
`;
