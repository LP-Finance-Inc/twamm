import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

export const ActionButton = styled(Button)`
  border-radius: 40px;
  display: flex;
  height: 48px;
  justify-content: center;
  text-transform: capitalize;
  width: 100%;
  color: ${({ theme }) => theme.palette.text.secondary};
  box-shadow: ${({ theme }) => theme.shadows[1]};
  font-size: 1.01rem;

  &.Mui-disabled {
    color: ${(p) => p.theme.palette.success.dark};
  }

  &.MuiButton-root:focus {
    box-shadow: ${({ theme }) => theme.shadows[2]};
  }
  &.MuiButton-root:hover,
  &.MuiButton-root:focus,
  &.MuiButton-root:active {
    background-color: rgba(255, 255, 255, 0.03);
  }
`;
