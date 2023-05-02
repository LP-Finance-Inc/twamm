import { useCallback, useState } from "react";
import AmountField from "./amount-field";
import usePrice from "../hooks/use-price";

export default ({
  defaultValue = 0,
  disabled = false,
  maxAmount,
  address,
  onChange: handleChange,
}: {
  defaultValue?: number;
  disabled?: boolean;
  maxAmount?: number;
  address?: string;
  onChange: (arg0: number) => void;
}) => {
  const [amount, setAmount] = useState<number>(defaultValue);

  const price = usePrice(address ? { id: address } : undefined);

  const onChange = useCallback(
    (next: number) => {
      setAmount(next);
      handleChange(next);
    },
    [handleChange, setAmount]
  );

  return (
    <AmountField
      amount={amount}
      disabled={disabled}
      maxAmount={maxAmount}
      onChange={onChange}
      price={price.data}
      isPending={false}
    />
  );
};
