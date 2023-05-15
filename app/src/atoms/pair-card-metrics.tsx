import { useState } from "react";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";
import ClickAwayListener from "@mui/material/ClickAwayListener";

import * as Styled from "./pair-card-metrics.styled";
import { formatPrice } from "../domain/index";

export interface MetricProps {
  value: number;
  formatted?: boolean;
}

export const BootstrapTooltip = styled(
  ({ className, ...props }: TooltipProps) => (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Tooltip {...props} classes={{ popper: className }} />
  )
)(() => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: "#0f0",
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#161724",
    color: "#0f0",
    padding: "0.3rem 0.2rem",
    boxShadow:
      "4px 4px 6px rgba(9, 9, 14, 0.4), -4px -4px 6px rgba(87, 87, 87, 0.1)",
  },
}));

export const formatDeposited = (value: number): string => {
  const RANKS = ["K", "M", "B", "T"];
  const TRESHOLD = 1e3;

  const formatUnranked = (a: number) => (a === 0 ? a : a.toFixed(2));

  let idx = 0;

  // eslint-disable-next-line no-plusplus, no-param-reassign
  while (value >= TRESHOLD && ++idx <= RANKS.length) value /= TRESHOLD;
  // console.log(Number(value));

  return String(
    idx === 0
      ? formatUnranked(Number(value))
      : Number(value)
          .toFixed(1)
          .replace(/\.?0+$/, "") + RANKS[idx - 1]
  );
};

export default ({ formatted = false, value }: MetricProps) => {
  const [open, setOpen] = useState<boolean>(false);

  const onClose = () => {
    setOpen(false);
  };

  const onOpen = () => {
    setOpen(true);
  };

  return (
    <Box>
      <Styled.Metric>
        <ClickAwayListener onClickAway={onClose}>
          <BootstrapTooltip
            arrow
            PopperProps={{ disablePortal: true }}
            open={open}
            onClose={onClose}
            onClick={onOpen}
            title={formatPrice(value)}
          >
            <Styled.FundMetricValue>
              {formatted ? `$${formatDeposited(value)}` : formatPrice(value)}
            </Styled.FundMetricValue>
          </BootstrapTooltip>
        </ClickAwayListener>
      </Styled.Metric>
    </Box>
  );
};
