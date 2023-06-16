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

export const SelectedScheduleButton = styled(Button)(({ theme }) => ({
  padding: "0 4px",
  textTransform: "capitalize",
  fontSize: "0.9rem",
  whiteSpace: "nowrap",
  color: theme.palette.text.secondary,
  boxShadow: theme.shadows[9],

  "&.Mui-disabled": {
    color: theme.palette.text.secondary,
    borderColor: theme.palette.text.secondary,
  },
  "&.Mui-disabled + *": {
    borderLeftColor: theme.palette.text.secondary,
  },
}));

export const MobileScheduleButton = styled(ScheduleButton)`
  font-size: 0.8rem;
`;

export const MobileSelectedScheduleButton = styled(SelectedScheduleButton)`
  font-size: 0.8rem;
`;
