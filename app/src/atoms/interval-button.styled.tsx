import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

export const ScheduleButton = styled(Button)`
  padding: 3px 0px;
  text-transform: capitalize;
  font-size: 0.9rem;

  &.Mui {
    min-width: 10px;
  }
  &.Mui-disabled {
    color: ${(p) => p.theme.palette.grey.A700};
    border-color: ${(p) => p.theme.palette.grey.A700};
  }
  &.Mui-disabled + * {
    border-left-color: ${(p) => p.theme.palette.grey.A700};
  }

  @media (max-width: 600) {
    padding: 3px 0px;
  }
`;

export const SelectedScheduleButton = styled(Button)`
  padding: 0 4px;
  text-transform: capitalize;
  font-size: 0.9rem;
  white-space: nowrap;

  &.Mui-disabled {
    color: ${(p) => p.theme.palette.success.dark};
    border-color: ${(p) => p.theme.palette.success.dark};
  }
  &.Mui-disabled + * {
    border-left-color: ${(p) => p.theme.palette.success.dark};
  }
  @media (max-width: 600) {
    padding: 0px 0px;
  }
`;

export const MobileScheduleButton = styled(ScheduleButton)`
  padding: 0 2px;
  font-size: 0.8rem;
  text-transform: capitalize;
`;

export const MobileSelectedScheduleButton = styled(SelectedScheduleButton)`
  padding: 0 2px;
  font-size: 0.8rem;
  text-transform: capitalize;

  @media (max-width: 600) {
    padding: 0px 0px;
    font-size: 8px;
  }
`;
