import type { TokenPair } from "@twamm/types";
import Alert from "@mui/material/Alert";
import { useMemo } from "react";
import useSWR from "swr";

import PairCard from "../atoms/pair-card";
import api from "../api";
import i18n from "../i18n";
import * as Styled from "./token-pair-cards.styled";

const Headers = [
  {
    id: 1,
    head: "#",
  },
  {
    id: 2,
    head: "Name",
  },
  {
    id: 3,
    head: i18n.StatsPairsPairOrderVolume,
  },
  {
    id: 4,
    head: i18n.TwammFee,
  },
];

const fetcher = async (url: string) => fetch(url).then((res) => res.json());

export default ({ info }: { info?: TokenPair[] }) => {
  const { data, isLoading } = useSWR(api.tokenList, fetcher);

  const tokenPairs = useMemo(() => {
    const processedInfo = [];
    if (info) {
      for (let i = 0; i < (info?.length ?? 0); i += 1) {
        const { statsA } = info[i];
        const { statsB } = info[i];
        const decimalA = 10 ** info[i].configA.decimals;
        const decimalB = 10 ** info[i].configB.decimals;
        const aMint = info[i].configA.mint;
        const bMint = info[i].configB.mint;

        const orderVolume =
          Number(statsA.orderVolumeUsd) / decimalA +
          Number(statsB.orderVolumeUsd) / decimalB;

        const routedVolume =
          Number(statsA.routedVolumeUsd) / decimalA +
          Number(statsB.routedVolumeUsd) / decimalB;

        const settledVolume =
          Number(statsA.settledVolumeUsd) / decimalA +
          Number(statsB.settledVolumeUsd) / decimalB;

        const fee =
          Number(statsA.feesCollected) / decimalA +
          Number(statsB.feesCollected) / decimalB;

        processedInfo.push({
          aMint,
          bMint,
          fee,
          id: `${aMint}-${bMint}`,
          orderVolume,
          routedVolume,
          settledVolume,
        });
      }
    }
    return processedInfo;
  }, [info]);

  if (!tokenPairs.length || isLoading)
    return <Alert severity="info">No Pairs Present</Alert>;

  return (
    <Styled.TableRoot>
      <Styled.TableBodyMain size="small" aria-label="customized table">
        <Styled.TableHeadBox>
          <Styled.TableRowBox>
            {Headers.map((item) => (
              <Styled.TableCellBox key={item.id} align="left">
                {item.head}
              </Styled.TableCellBox>
            ))}
          </Styled.TableRowBox>
        </Styled.TableHeadBox>

        <Styled.TableBodyCover>
          {tokenPairs
            .sort((a, b) => b.orderVolume - a.orderVolume)
            .map((tokenPair, index) => (
              <PairCard
                key={tokenPair.id}
                list={data}
                itemNum={index}
                aMint={tokenPair.aMint}
                bMint={tokenPair.bMint}
                orderVolume={tokenPair.orderVolume}
              />
            ))}
        </Styled.TableBodyCover>
      </Styled.TableBodyMain>
    </Styled.TableRoot>
  );
};
