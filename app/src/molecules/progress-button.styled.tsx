import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

export const ActionButton = styled(Button)`
  border-radius: 40px;
  color: #0c0;
  display: flex;
  height: 48px;
  justify-content: center;
  text-transform: capitalize;
  width: 100%;
  box-shadow: 4px 4px 5px rgba(9, 9, 14, 0.5),
    -4px -4px 5px rgba(87, 87, 87, 0.2);

  &.Mui-disabled {
    color: ${(p) => p.theme.palette.success.dark};
  }

  &.MuiButton-root:focus {
    box-shadow: inset -4px -4px 5px rgba(87, 87, 87, 0.2),
      inset 4px 4px 5px rgba(9, 9, 14, 0.5);
  }
  &.MuiButton-root:hover,
  &.MuiButton-root:focus,
  &.MuiButton-root:active {
    background-color: rgba(255, 255, 255, 0.03);
  }
`;
