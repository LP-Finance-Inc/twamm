import type { PublicKey } from "@solana/web3.js";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useMemo } from "react";

import * as Styled from "./pair-card.styled";
import i18n from "../i18n";
import Metric from "./pair-card-metrics";
import PairCardSymbols from "./pair-card-symbols";
import { formatPrice } from "../domain/index";
import { refreshEach } from "../swr-options";
import useTokenPairs from "../hooks/use-token-pairs";

export interface Props {
  aMint: PublicKey;
  bMint: PublicKey;
  orderVolume: number;
  settledVolume: number;
  routedVolume: number;
  list: any;
}

export default ({
  aMint,
  bMint,
  orderVolume,
  settledVolume,
  routedVolume,
  list,
}: Props) => {
  const tokens = useMemo(() => {
    const infoA = list[aMint.toString()];
    const infoB = list[bMint.toString()];
    return [
      {
        contract_address: aMint.toString(),
        imageSmall: infoA.logo,
        name: infoA.name,
        symbol: infoA.symbol,
      },
      {
        contract_address: bMint.toString(),
        imageSmall: infoB.logo,
        name: infoB.name,
        symbol: infoB.symbol,
      },
    ];
  }, [aMint, bMint, list]);

  const itemsList = useTokenPairs(undefined, refreshEach(5 * 60000)).data;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let swapFee = 0;

  itemsList?.map((item) => {
    if (
      (item?.configA.mint.toString() === tokens[0].contract_address &&
        item?.configB.mint.toString() === tokens[1].contract_address) ||
      (item?.configB.mint.toString() === tokens[1].contract_address &&
        item?.configA.mint.toString() === tokens[0].contract_address)
    ) {
      const denominator = item?.feeDenominator.toString();
      const numerator = item?.feeNumerator.toString();
      const calSwapFee = (numerator / denominator) * 100;
      swapFee = calSwapFee;
      return calSwapFee;
    }
    return null;
  });

  return (
    <Styled.Root>
      <Styled.Card>
        <Styled.Fund>
          <Styled.FundName>
            <PairCardSymbols data={tokens} />
          </Styled.FundName>
        </Styled.Fund>
        <Box pt={2}>
          <Typography variant="h6">{i18n.StatsPairsPairVolume}</Typography>
        </Box>
        <Box pt={1}>
          <Styled.FundMetrics>
            <Metric
              formatted
              title={i18n.StatsPairsPairOrderVolume}
              value={orderVolume}
            />
            <Metric
              formatted
              title={i18n.StatsPairsPairRoutedVolume}
              value={routedVolume}
            />
            <Metric
              formatted
              title={i18n.StatsPairsPairSettledVolume}
              value={settledVolume}
            />
          </Styled.FundMetrics>
        </Box>
        <Box pt={2}>
          {i18n.TwammFee}: {swapFee ? `${swapFee}%` : formatPrice(0)}
        </Box>
      </Styled.Card>
    </Styled.Root>
  );
};

export const Blank = () => <Styled.FundSkeleton variant="rectangular" />;
