import { useMemo } from "react";
import type { PublicKey } from "@solana/web3.js";

import * as Styled from "./pair-card.styled";
import Metric from "./pair-card-metrics";
import PairCardSymbols from "./pair-card-symbols";
import { formatPrice } from "../domain/index";
import { refreshEach } from "../swr-options";
import useTokenPairs from "../hooks/use-token-pairs";

export interface Props {
  aMint: PublicKey;
  bMint: PublicKey;
  orderVolume: number;
  list: any;
  itemNum: number;
}

export default ({ aMint, bMint, orderVolume, list, itemNum }: Props) => {
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
    <Styled.TableRowBox>
      <Styled.TableCellBox align="left">{itemNum + 1}</Styled.TableCellBox>
      <Styled.TableCellBox component="th" scope="row">
        <PairCardSymbols data={tokens} />
      </Styled.TableCellBox>
      <Styled.TableCellBox align="left">
        <Metric formatted value={orderVolume} />
      </Styled.TableCellBox>
      <Styled.TableCellBox align="left">
        {swapFee ? `${swapFee}%` : formatPrice(0)}
      </Styled.TableCellBox>
    </Styled.TableRowBox>
  );
};

export const Blank = () => <Styled.FundSkeleton variant="rectangular" />;
