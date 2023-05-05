import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import SyncAltIcon from "@mui/icons-material/SyncAlt";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Typography from "@mui/material/Typography";
import * as Styled from "./exchange-pair-form.styled";
import AmountField from "../atoms/amount-field";
import i18n from "../i18n";
import InTokenField from "../molecules/in-token-field";
import TokenSelect from "../atoms/token-select";
import TradeIntervals from "../molecules/trade-intervals";
import type { IntervalVariant } from "../domain/interval.d";
import useIndexedTIFs from "../contexts/tif-context";
import usePrice from "../hooks/use-price";

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
  const [isPending, setPending] = useState<boolean>(false);

  const { tifs: intervalTifs, selected } = useIndexedTIFs();

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

  const handleChangeAmount = (value: number) => {
    onChangeAmount(value);
  };
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
        ).toFixed(0); // order per crank epoch
      } else {
        tifPeriod = 1;
        epochs = 1;
        tifAccountedTokenAFormattedAmount = tokenAFormattedAmount;
      }

      fetch(
        `https://quote-api.jup.ag/v4/quote?inputMint=${tokenA}&outputMint=${tokenB}&amount=${tifAccountedTokenAFormattedAmount}`
      )
        .then((res) => res.json())
        .then((data) => {
          const bestRoute = data.data[0];
          const { outAmount } = bestRoute;

          const tifAccountedAmount = outAmount * epochs;
          if (tokenBDecimals) {
            const OutAmount = tifAccountedAmount / 10 ** tokenBDecimals;

            outRef.current = OutAmount;
            outValueRef.current = Number(
              (OutAmount * price.data)
                ?.toFixed(10)
                ?.match(/^-?\d*\.?0*\d{0,2}/)?.[0]
            );
            setPending(false);
          } else {
            outRef.current = 0;
            outValueRef.current = 0;
            setPending(false);
          }
        })
        .catch(() => {
          outRef.current = 0;
          outValueRef.current = 0;
          setPending(false);
        });
    }

    const debounceTime = setTimeout(() => {
      getOutAmount();
    }, 300);

    return () => clearTimeout(debounceTime);
  }, [amount, a, b, selected, price.data]);

  return (
    <form onSubmit={onSubmit} id="exchange-form">
      <Styled.TokenLabelBox>{i18n.TradeOrderYouPay}</Styled.TokenLabelBox>
      <InTokenField
        address={a?.address}
        name={a?.symbol}
        onChange={handleChangeAmount}
        onSelect={handleInputSelect}
        src={a?.logoURI}
      />
      <Styled.OperationImage>
        <Styled.OperationButton disabled={!a || !b} onClick={handleSwap}>
          <SyncAltIcon />
        </Styled.OperationButton>
      </Styled.OperationImage>
      <Styled.TokenLabelBox>
        {i18n.TradeOrderYouReceive}
        {selected?.tif ? (
          <>
            {" "}
            (
            <a
              href="http://docs.lp.finance/twamm/order-receive-amount-calculation"
              target="_blank"
              rel="noreferrer"
            >
              <u>Simulated</u>
            </a>
            )
          </>
        ) : null}
      </Styled.TokenLabelBox>
      <Box pb={2}>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={4}>
            <TokenSelect
              alt={b?.symbol}
              disabled={!a}
              image={b?.logoURI}
              label={b?.symbol}
              onClick={handleOutputSelect}
            />
          </Grid>
          <Grid item xs={12} sm={8}>
            <AmountField
              disabled
              amount={amount ? outRef.current : 0}
              outValue={amount ? outValueRef.current : 0}
              isPending={isPending}
            />
          </Grid>
        </Grid>
      </Box>
      {amount != null &&
        selected &&
        amount > 0 &&
        selected.tif > 0 &&
        sellRate && (
          <Box>
            <Typography
              textAlign="left"
              variant="body2"
              sx={{ color: "#FF69B4" }}
            >
              Sell Rate: {sellRate} {a?.symbol} (≈$
              {(sellRate * priceA.data).toFixed(3)}) / minute
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
      {/* <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <Typography variant="overline">
          <Link
            href="https://docs.lp.finance/twamm/order-receive-amount-calculation"
            target="_blank"
            style={{ color: "#00FF00", textDecoration: "underline" }}
          >
            {i18n.TwapCalculationDocs}
          </Link>
        </Typography>
      </div> */}
    </form>
  );
};
