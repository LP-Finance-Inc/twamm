import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import SyncAltIcon from "@mui/icons-material/SyncAlt";
import M from "easy-maybe/lib";
import Typography from "@mui/material/Typography";

import * as Styled from "./exchange-pair-form.styled";
import AmountField from "../atoms/amount-field";
import i18n from "../i18n";
import TokenSelect from "../atoms/token-select";
import TradeIntervals from "../molecules/trade-intervals";
import type { IntervalVariant } from "../domain/interval.d";
import useIndexedTIFs from "../contexts/tif-context";
import usePrice from "../hooks/use-price";
import useBalance from "../hooks/use-balance";
import { add, keepPrevious, refreshEach } from "../swr-options";
import api from "../api";

export default ({
  amount,
  primary,
  onABSwap,
  onASelect,
  onBSelect,
  onChangeAmount,
  onIntervalSelect,
  onSubmit,
  secondary,
  submitting,
}: {
  amount?: number;
  primary?: JupToken;
  onABSwap: () => void;
  onASelect: () => void;
  onBSelect: () => void;
  onChangeAmount: (arg0: number) => void;
  onIntervalSelect: (a: IntervalVariant, b: boolean) => void;
  onSubmit: () => void;
  secondary?: JupToken;
  submitting: boolean;
}) => {
  const [a, b] = [primary, secondary];
  const outRef = useRef<number>(0);
  const outValueRef = useRef<number>(0);
  const savedUsdRef = useRef<number>(0);
  const savedPercentageRef = useRef<number>(0);
  const [pairAmount, setPairAmount] = useState<number>(0);
  const [isPending, setPending] = useState<boolean>(false);
  const balance = useBalance(a?.address, add([keepPrevious(), refreshEach()]));
  const { tifs: intervalTifs, selected } = useIndexedTIFs();
  const pairPrice: any = usePrice(a?.address ? { id: a?.address } : undefined);

  const onChange = useCallback(
    (next: number) => {
      setPairAmount(next);
      onChangeAmount(next);
    },
    [onChangeAmount, setPairAmount]
  );

  const onMaxClick = useCallback(() => {
    M.andMap(onChange, M.of(balance.data));
  }, [onChange, balance.data]);

  const displayBalance = M.withDefault<string | number>(
    "0",
    M.of(balance.data)
  );

  const sellRate = useMemo(() => {
    try {
      if (amount && amount > 0 && selected.tif) {
        const sRate = amount / (selected.tif / 60);
        const sRateFormatted = sRate
          ?.toFixed(10)
          ?.match(/^-?\d*\.?0*\d{0,3}/)?.[0];
        return Number(sRateFormatted);
      }
      return 0;
    } catch (error) {
      return 0;
    }
  }, [amount, selected]);

  const handleSwap = () => {
    onABSwap();
  };
  const handleInputSelect = () => {
    onASelect();
  };

  const handleOutputSelect = () => {
    onBSelect();
  };

  const handleIntervalSelect = useCallback(
    (indexed: IntervalVariant, schedule: boolean) => {
      onIntervalSelect(indexed, schedule);
    },
    [onIntervalSelect]
  );

  const price = usePrice({
    id: b?.address as string,
  });

  const priceA = usePrice({
    id: a?.address as string,
  });

  useEffect(() => {
    setPending(true);
    function getOutAmount() {
      const tokenA = a?.address;
      const tokenB = b?.address;
      const tokenBDecimals = b?.decimals;
      const tokenAFormattedAmount = Math.floor(
        (amount ?? 0) * 10 ** (a?.decimals ?? 0)
      );
      // Calculate with TIF intervals
      let tifPeriod;
      let epochs: number;
      let tifAccountedTokenAFormattedAmount;
      const crankInterval = 10; // 10 seconds
      if (selected?.tif) {
        tifPeriod = selected?.tif;
        epochs = tifPeriod / crankInterval;
        tifAccountedTokenAFormattedAmount = (
          tokenAFormattedAmount / epochs
        ).toFixed(0);
      } else {
        tifPeriod = 1;
        epochs = 1;
        tifAccountedTokenAFormattedAmount = tokenAFormattedAmount;
      }
      Promise.all([
        fetch(
          `${api.quoteJup}?inputMint=${tokenA}&outputMint=${tokenB}&amount=${tifAccountedTokenAFormattedAmount}&onlyDirectRoutes=true`
        ),
        fetch(
          `${api.quoteJup}?inputMint=${tokenA}&outputMint=${tokenB}&amount=${tokenAFormattedAmount}&onlyDirectRoutes=true`
        ),
      ])
        .then(([res1, res2]) => Promise.all([res1.json(), res2.json()]))
        .then(([data1, data2]) => {
          const bestRoute = data1.data[0];
          const { outAmount } = bestRoute;
          const tifAccountedAmount = outAmount * epochs;

          const noTwapBestAmount = data2.data[0].outAmount;

          if (tokenBDecimals) {
            const OutAmount = tifAccountedAmount / 10 ** tokenBDecimals;
            const savedUsd =
              ((tifAccountedAmount - noTwapBestAmount) / 10 ** tokenBDecimals) *
              price.data;
            const savedPercentage =
              ((tifAccountedAmount - noTwapBestAmount) / noTwapBestAmount) * 100;

            savedUsdRef.current = Number(
              savedUsd?.toFixed(10)?.match(/^-?\d*\.?0*\d{0,3}/)?.[0]
            );
            savedPercentageRef.current = Number(
              savedPercentage?.toFixed(10)?.match(/^-?\d*\.?0*\d{0,3}/)?.[0]
            );
            outRef.current = OutAmount;
            outValueRef.current = Number(
              (OutAmount * price.data)
                ?.toFixed(10)
                ?.match(/^-?\d*\.?0*\d{0,2}/)?.[0]
            );
            setPending(false);
          } else {
            savedUsdRef.current = 0;
            savedPercentageRef.current = 0;
            outRef.current = 0;
            outValueRef.current = 0;
            setPending(false);
          }
        })
        .catch(() => {
          savedUsdRef.current = 0;
          savedPercentageRef.current = 0;
          outRef.current = 0;
          outValueRef.current = 0;
          setPending(false);
        });
    }

    const debounceTime = setTimeout(() => {
      getOutAmount();
    }, 500);

    return () => clearTimeout(debounceTime);
  }, [amount, a, b, selected, price.data]);

  return (
    <form onSubmit={onSubmit} id="exchange-form">
      <Styled.TokenLabelBox>
        {i18n.TradeOrderYouPay}
        <Styled.TokenTotal>
          {i18n.TokenUserBalance}: {displayBalance} {a?.symbol}
          <Styled.TokenAmountMaxButton
            onClick={onMaxClick}
            size="small"
            disabled={!balance.data || false}
          >
            max
          </Styled.TokenAmountMaxButton>
        </Styled.TokenTotal>
      </Styled.TokenLabelBox>
      <Styled.TokenField>
        <Grid container direction="row" alignItems="center">
          <Grid item xs={5} sm={4} md={4}>
            <TokenSelect
              alt={a?.symbol}
              disabled={!a}
              image={a?.logoURI}
              label={a?.symbol}
              onClick={handleInputSelect}
            />
          </Grid>
          <Grid item xs={7} sm={8} md={8}>
            <AmountField
              amount={pairAmount}
              disabled={false}
              onChange={onChange}
              price={pairPrice.data}
              isPending={false}
            />
          </Grid>
        </Grid>
      </Styled.TokenField>
      <Styled.OperationImage>
        <Styled.OperationButton disabled={!a || !b} onClick={handleSwap}>
          <SyncAltIcon />
        </Styled.OperationButton>
      </Styled.OperationImage>
      <Styled.TokenLabel>
        {i18n.TradeOrderYouReceive}{" "}
        {selected?.tif ? (
          <Link
            href="http://docs.lp.finance/twamm/order-receive-amount-calculation"
            target="_blank"
            rel="noopener noreferrer"
          >
            <u>(Simulated)</u>
          </Link>
        ) : null}
      </Styled.TokenLabel>
      <Styled.TokenField>
        <Grid container direction="row" alignItems="center">
          <Grid item xs={5} sm={4} md={4}>
            <TokenSelect
              alt={b?.symbol}
              disabled={!a}
              image={b?.logoURI}
              label={b?.symbol}
              onClick={handleOutputSelect}
            />
          </Grid>
          <Grid item xs={7} sm={8} md={8}>
            <AmountField
              disabled
              amount={amount ? outRef.current : 0}
              outValue={amount ? outValueRef.current : 0}
              isPending={isPending}
            />
          </Grid>
        </Grid>
      </Styled.TokenField>
      {amount != null &&
        selected &&
        amount > 0 &&
        selected.tif > 0 &&
        sellRate && (
          <Box>
            <Typography
              textAlign="center"
              variant="body2"
              sx={{ color: "#FF69B4" }}
            >
              Sell Rate: {sellRate} {a?.symbol} (≈$
              {(sellRate * priceA.data).toFixed(3)}) / minute
            </Typography>
            <Typography
              textAlign="center"
              variant="body2"
              sx={{ color: "#00FF00" }}
            >
              Saving ${savedUsdRef.current} ({savedPercentageRef.current}%) from
              price impact!
            </Typography>
          </Box>
        )}
      <Box py={2}>
        <TradeIntervals
          disabled={submitting}
          indexedTifs={intervalTifs}
          onSelect={handleIntervalSelect}
          selected={selected}
        />
      </Box>
    </form>
  );
};
