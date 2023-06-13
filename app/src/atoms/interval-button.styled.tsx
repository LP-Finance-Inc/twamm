import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

export const ScheduleButton = styled(Button)`
  padding: 3px 3px;
  text-transform: capitalize;
  font-size: 0.9rem;
  white-space: nowrap;
  color: ${(p) => p.theme.palette.text.primary};

  &.Mui {
    min-width: 10px;
  }
  &.Mui-disabled {
    color: ${(p) => p.theme.palette.text.primary};
    border-color: ${(p) => p.theme.palette.text.primary};
  }
  &.Mui-disabled + * {
    border-left-color: ${(p) => p.theme.palette.text.primary};
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
  animation: 0.5s rotate ease infinite;
  color: ${(p) => p.theme.palette.text.secondary};

  @keyframes rotate {
    to {
      box-shadow: ${({ theme }) => theme.shadows[8]};
    }
  }

  &.Mui-disabled {
    color: ${(p) => p.theme.palette.text.secondary};
    border-color: ${(p) => p.theme.palette.text.secondary};
  }
  &.Mui-disabled + * {
    border-left-color: ${(p) => p.theme.palette.text.secondary};
  }
`;

export const MobileScheduleButton = styled(ScheduleButton)`
  font-size: 0.8rem;
`;

export const MobileSelectedScheduleButton = styled(SelectedScheduleButton)`
  font-size: 0.8rem;
`;
