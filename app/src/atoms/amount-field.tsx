import M from "easy-maybe/lib";
import type { ChangeEvent } from "react";
import { useCallback } from "react";
import Skeleton from "@mui/material/Skeleton";

import * as Styled from "./amount-field.styled";
import { formatPrice } from "../domain/index";

export default ({
  amount,
  disabled,
  maxAmount,
  onChange: handleChange = () => {},
  price,
  isPending,
  outValue,
}: {
  amount: number;
  disabled: boolean;
  maxAmount?: number;
  onChange?: (arg0: number) => void;
  price?: number;
  isPending?: boolean;
  outValue?: number;
}) => {
  const onMaxClick = useCallback(() => {
    M.andMap(handleChange, M.of(maxAmount));
  }, [handleChange, maxAmount]);

  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const next = Number(e.target.value);

      handleChange(next);
    },
    [handleChange]
  );

  const totalAmount = M.andThen<number, number>(
    (p) => (Number.isNaN(amount) ? M.of(undefined) : M.of(p * amount)),
    M.of(price)
  );

  const displayAmount = M.withDefault(
    "",
    M.andMap(
      (a) => (a === 0 ? formatPrice(0) : `~${formatPrice(a)}`),
      totalAmount
    )
  );

  return (
    <>
      {isPending && <Skeleton variant="rounded" animation="wave" height={76} />}
      {!isPending && (
        <Styled.InputRoot>
          <Styled.TokenAmountTextField
            allowNegative={false}
            disabled={disabled}
            value={amount}
            onChange={onChange}
          />
          <Styled.SecondaryControls direction="row" spacing={1}>
            <Styled.TokenAmountInUSD>{displayAmount}</Styled.TokenAmountInUSD>
            {!maxAmount ? null : (
              <Styled.TokenAmountMaxButton onClick={onMaxClick} size="small">
                max
              </Styled.TokenAmountMaxButton>
            )}
          </Styled.SecondaryControls>
          <Styled.SecondaryControls direction="row" spacing={1}>
            {!outValue ? null : (
              <Styled.TokenAmountInUSD>
                ~{formatPrice(outValue)}
              </Styled.TokenAmountInUSD>
            )}
          </Styled.SecondaryControls>
        </Styled.InputRoot>
      )}
    </>
  );
};
