import type { TokenPair } from "@twamm/types";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import M, { Extra } from "easy-maybe/lib";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { OrderSide } from "@twamm/types/lib";
import { useState, useMemo } from "react";

import * as Styled from "./price-info.styled";
import i18n from "../i18n";
import IntervalProgress from "../atoms/interval-progress";
import PairCardSymbols from "../atoms/pair-card-symbols";
import useBreakpoints from "../hooks/use-breakpoints";
import usePrice from "../hooks/use-price";
import { populatePairByType } from "../domain/index";
import { refreshEach } from "../swr-options";
import useTokenPairs from "../hooks/use-token-pairs";

const REFRESH_INTERVAL = 0.5 * 60000;

export default (props: {
  a?: JupToken;
  b?: JupToken;
  tokenPair?: Pick<TokenPair, "configA" | "configB" | "statsA" | "statsB">;
  type?: OrderSide;
  url?: string;
}) => {
  const tokenPairs = useTokenPairs(undefined, refreshEach(5 * 60000));
  const { isMobile } = useBreakpoints();
  const [open] = useState<boolean>(true);

  const getSwapFee = useMemo(() => {
    const info = tokenPairs;
    const itemsList = info.data;
    let swapFee = 0;

    itemsList?.map((item) => {
      if (
        (item?.configA.mint.toString() === props.a?.address &&
          item?.configB.mint.toString() === props.b?.address) ||
        (item?.configB.mint.toString() === props.a?.address &&
          item?.configA.mint.toString() === props.b?.address)
      ) {
        const denominator = item?.feeDenominator.toString();
        const numerator = item?.feeNumerator.toString();
        const calSwapFee = (numerator / denominator) * 100;
        swapFee = calSwapFee;
        return calSwapFee;
      }
      return null;
    });

    return swapFee;
  }, [props.a?.address, props.b?.address, tokenPairs]);

  const populatePair = (a: JupToken, b: JupToken, t: OrderSide) =>
    populatePairByType<JupToken>(a, b, t);

  const pair = M.andMap(
    ([c, d, e]) => populatePair(c, d, e),
    Extra.combine3([M.of(props.a), M.of(props.b), M.of(props.type)])
  );

  const tokenPairPrice = usePrice(
    M.withDefault(
      undefined,
      M.andMap(
        ([p]) => ({ id: p[0].address, vsToken: p[1].address }),
        Extra.combine2([pair, M.of(open ? true : undefined)]) // Nothing unless open
      )
    ),
    refreshEach(REFRESH_INTERVAL)
  );

  const mints = M.withDefault(
    undefined,
    M.andMap(
      ([c, d]) => [
        {
          contract_address: c.address,
          symbol: c.symbol,
          name: c.name,
          imageSmall: c.logoURI,
        },
        {
          contract_address: d.address,
          symbol: d.symbol,
          name: d.name,
          imageSmall: d.logoURI,
        },
      ],
      pair
    )
  );
  const price = M.withDefault(undefined, M.of(tokenPairPrice.data));

  const priceInfo = M.withDefault(
    undefined,
    M.andMap((p) => `${p[1].symbol} per ${p[0].symbol}`, pair)
  );

  const checkSymbol = (mint: String) => {
    if (props.a?.address === mint) {
      return props.a?.symbol;
    }
    return props.b?.symbol;
  };

  return (
    <>
      <Styled.Info pt={2} mb={!open && isMobile ? "56px" : undefined}>
        <Stack direction="row" spacing="1">
          <Box mr={1} mt={0.25}>
            <IntervalProgress
              interval={open ? REFRESH_INTERVAL : 0}
              refresh={tokenPairPrice.isValidating}
            />
          </Box>
          <Styled.IntervalTitle>{i18n.TradeTokenInfo}</Styled.IntervalTitle>
        </Stack>
      </Styled.Info>
      {!open ? null : (
        <Box pt={2}>
          <Grid container spacing={1}>
            <Styled.DetailsGridItem item>
              <Styled.DetailsPair direction="row" spacing={2}>
                <PairCardSymbols data={mints} />
                <Typography variant="body2">
                  {!price
                    ? "-"
                    : `${
                        price.toFixed(10).match(/^-?\d*\.?0*\d{0,3}/)[0]
                      } ${priceInfo}`}
                </Typography>
              </Styled.DetailsPair>
            </Styled.DetailsGridItem>
          </Grid>
          <List>
            <Styled.DetailsItem>
              <Typography variant="h6">TWAMM Fee</Typography>
              <Typography variant="h6">{getSwapFee}%</Typography>
            </Styled.DetailsItem>
            <Styled.DetailsItem>
              <Typography variant="h6">
                {checkSymbol(props.tokenPair?.configA.mint.toString())} address
              </Typography>
              <Styled.LinkOverflow
                href={`${
                  props.url
                }/${props.tokenPair?.configA.mint.toString()}`}
                target="_blank"
                rel="noreferrer"
                underline="hover"
              >
                <Typography variant="h6">
                  {props.tokenPair?.configA.mint.toString()}
                </Typography>
              </Styled.LinkOverflow>
            </Styled.DetailsItem>
            <Styled.DetailsItem>
              <Typography variant="h6">
                {checkSymbol(props.tokenPair?.configB.mint.toString())} address
              </Typography>
              <Styled.LinkOverflow
                href={`${
                  props.url
                }/${props.tokenPair?.configB.mint.toString()}`}
                target="_blank"
                rel="noreferrer"
                underline="hover"
              >
                <Typography variant="h6">
                  {props.tokenPair?.configB.mint.toString()}
                </Typography>
              </Styled.LinkOverflow>
            </Styled.DetailsItem>
            <Styled.DetailsItem>
              <Styled.BoltText variant="h6">
                {checkSymbol(props.tokenPair?.configA.mint.toString())} oracle
              </Styled.BoltText>
              <Styled.LinkOverflow
                href={`${
                  props.url
                }/${props.tokenPair?.configA.oracleAccount.toString()}`}
                target="_blank"
                rel="noreferrer"
                underline="hover"
              >
                <Styled.BoltText variant="h6">
                  {props.tokenPair?.configA.oracleAccount.toString()}
                </Styled.BoltText>
              </Styled.LinkOverflow>
            </Styled.DetailsItem>
            <Styled.DetailsItem>
              <Styled.BoltText variant="h6">
                {checkSymbol(props.tokenPair?.configB.mint.toString())} oracle
              </Styled.BoltText>
              <Styled.LinkOverflow
                href={`${
                  props.url
                }/${props.tokenPair?.configB.oracleAccount.toString()}`}
                target="_blank"
                rel="noreferrer"
                underline="hover"
              >
                <Styled.BoltText variant="h6">
                  {props.tokenPair?.configB.oracleAccount.toString()}
                </Styled.BoltText>
              </Styled.LinkOverflow>
            </Styled.DetailsItem>
          </List>
        </Box>
      )}
    </>
  );
};
