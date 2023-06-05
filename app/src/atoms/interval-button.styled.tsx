import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

export const ScheduleButton = styled(Button)`
  padding: 3px 0px;
  text-transform: capitalize;
  font-size: 0.9rem;
  white-space: nowrap;

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
  box-shadow: -2px -2px 4px rgba(0, 204, 0, 0.07),
    2px 2px 4px rgba(0, 255, 0, 0.07);
  animation: 0.5s rotate ease infinite;
  border-radius: 4px;

  @keyframes rotate {
    to {
      box-shadow: -4px -4px 4px rgba(46, 189, 46, 0.47),
        4px 4px 4px rgba(28, 184, 28, 0.47);
    }
  }

  &.Mui-disabled {
    color: ${(p) => p.theme.palette.success.dark};
    border-color: ${(p) => p.theme.palette.success.dark};
  }
  &.Mui-disabled + * {
    border-left-color: ${(p) => p.theme.palette.success.dark};
  }
`;

export const MobileScheduleButton = styled(ScheduleButton)`
  font-size: 0.8rem;
`;

export const MobileSelectedScheduleButton = styled(SelectedScheduleButton)`
  font-size: 0.8rem;
`;
