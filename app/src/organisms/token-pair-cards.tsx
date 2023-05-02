import type { TokenPair } from "@twamm/types";
import Alert from "@mui/material/Alert";
import { useMemo } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import useSWR from "swr";

import PairCard from "../atoms/pair-card";
import api from "../api";

const fetcher = async (url: string) => fetch(url).then((res) => res.json());

export default ({ info }: { info?: TokenPair[] }) => {
  const { data, isLoading } = useSWR(api.tokenList, fetcher);

  // const tokenPairs = useMemo(
  //   () =>
  //     M.withDefault(
  //       [],
  //       M.andMap<TokenPair[], ReturnType<typeof populate>[]>(
  //         (pairs) => pairs.map(populate),
  //         M.of(info)
  //       )
  //     ),
  //   [info]
  // );
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
    <Box mt={2}>
      <Grid container spacing={3}>
        {tokenPairs
          .sort((a, b) => b.orderVolume - a.orderVolume)
          .map((tokenPair) => (
            <Grid item xs={12} sm={6} md={4} key={tokenPair.id}>
              <PairCard
                list={data}
                aMint={tokenPair.aMint}
                bMint={tokenPair.bMint}
                orderVolume={tokenPair.orderVolume}
                routedVolume={tokenPair.routedVolume}
                settledVolume={tokenPair.settledVolume}
              />
            </Grid>
          ))}
      </Grid>
    </Box>
  );
};
