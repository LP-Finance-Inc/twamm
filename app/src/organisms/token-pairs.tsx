import Box from "@mui/material/Box";
import useSWR from "swr";
import Typography from "@mui/material/Typography";
import { useMemo, useState } from "react";

import BlankTokenPairs from "../atoms/token-pair-cards-blank";
import TokenPairsChart from "./token-pairs-chart";
import i18n from "../i18n";
import TokenPairCards from "./token-pair-cards";
import useTokenPairs from "../hooks/use-token-pairs";
import { refreshEach } from "../swr-options";
import { NEXT_PUBLIC_SUPPORTED_TOKEN } from "../env";
import useBreakpoints from "../hooks/use-breakpoints";
import api from "../api";

const fetcher = async (url: string) => fetch(url).then((res) => res.json());

export default () => {
  const tokenPairs = useTokenPairs(undefined, refreshEach(5 * 60000));
  const { isMobile } = useBreakpoints();
  const [day] = useState<number>(1);

  const { data, isLoading } = useSWR(`${api.volume}?day=${day}`, fetcher);

  const content = useMemo(() => {
    if (!tokenPairs.data) {
      return <BlankTokenPairs />;
    }

    type TokenPair = typeof tokenPairs.data[0];

    function presentPair(t: TokenPair): t is NonNullable<TokenPair> {
      return t !== null;
    }

    const ADDRESSES = NEXT_PUBLIC_SUPPORTED_TOKEN.split(",");
    const fullPair = tokenPairs.data;
    let pairs = [];

    for (let i = 0; i < fullPair.length; i += 1) {
      if (ADDRESSES.includes(fullPair[i]?.configA.mint.toString())) {
        pairs.push(fullPair[i]);
      }
    }

    pairs = pairs.filter(presentPair);

    return <TokenPairCards info={pairs} />;
  }, [tokenPairs]);

  return (
    <Box pb={2}>
      <Typography pb={2} variant="h4" align={isMobile ? "center" : "left"}>
        {i18n.StatsPairs}
      </Typography>
      {content}
      <TokenPairsChart {...{ data, isLoading }} />
    </Box>
  );
};
