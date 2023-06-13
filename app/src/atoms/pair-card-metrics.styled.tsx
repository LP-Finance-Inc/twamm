import { styled } from "@mui/material/styles";

const div = styled("div");

export const Metric = div``;

export const FundMetricValue = div`
  cursor: pointer;
  color: ${({ theme }) => theme.palette.text.primary} !important;
`;
