import { useCallback, useEffect, useMemo, useRef } from "react";
import { OrderSide } from "@twamm/types/lib";

import M, { Extra } from "easy-maybe/lib";
import OrderEditor from "./order-editor";
import useAddressPairs from "../hooks/use-address-pairs";
import useJupTokensByMint from "../hooks/use-jup-tokens-by-mint";
import useTokenExchange, { action as A } from "../hooks/use-token-exchange";
import { Provider as TIFProvider } from "../contexts/tif-context";
import useTxRunner from "../contexts/transaction-runner-context";
import NotificationModel from "../molecules/notification-model";
import NotificationPopover from "../molecules/notification-popover";

export type TradeStruct = {
  amount: number;
  pair: AddressPair;
  type: OrderSide;
};

export interface NotifyRef {
  open: () => void;
  close: () => void;
  isOpened: boolean;
}

export default (props: {
  onTradeChange: (arg0: TradeStruct) => void;
  trade: TradeStruct;
}) => {
  const { explorer } = useTxRunner();
  const tokenPairs = useAddressPairs();
  const tokenPair = useJupTokensByMint(props.trade.pair);
  const [state, dispatch] = useTokenExchange();
  const notifyRef = useRef<NotifyRef>();

  useEffect(() => {
    M.andMap(([pairs, pair, type]) => {
      dispatch(A.init({ pairs, pair, type }));
    }, Extra.combine3([M.of(tokenPairs.data), M.of(tokenPair.data), M.of(props.trade.type)]));
    return () => {};
  }, [dispatch, props.trade, tokenPairs.data, tokenPair.data]);

  const onSelectA = useCallback(
    (token: TokenInfo) => {
      dispatch(A.selectA({ token }));
    },
    [dispatch]
  );

  const onSelectB = useCallback(
    (token: TokenInfo) => {
      dispatch(A.selectB({ token }));
    },
    [dispatch]
  );

  const onSwap = useCallback(
    (price: number | undefined) => {
      dispatch(A.swap({ price }));
    },
    [dispatch]
  );

  const onNotifyToggle = useCallback((flag: boolean) => {
    if (flag) notifyRef.current?.open();
    else notifyRef.current?.close();
  }, []);

  const onTradeChange = useCallback(
    (next: TradeStruct) => {
      const prev = props.trade;

      if (
        prev.pair[0] !== next.pair[0] ||
        prev.pair[1] !== next.pair[1] ||
        prev.type !== next.type
      ) {
        props.onTradeChange(next);
      }
    },
    [props]
  );

  const explorerUrl = useMemo(() => {
    if (explorer === "https://solscan.io/tx") {
      return "https://solscan.io/account";
    }
    if (explorer === "https://solana.fm/tx") {
      return "https://solana.fm/account";
    }
    if (explorer === "https://xray.helius.xyz/tx") {
      return "https://xray.helius.xyz/account";
    }
    return "https://solscan.io/account";
  }, [explorer]);

  return (
    <TIFProvider>
      <NotificationPopover ref={notifyRef}>
        <NotificationModel onToggle={onNotifyToggle} />
      </NotificationPopover>
      <OrderEditor
        a={state.data?.a}
        all={state.data?.all}
        available={state.data?.available}
        b={state.data?.b}
        onSelectA={onSelectA}
        onSelectB={onSelectB}
        onSwap={onSwap}
        onTradeChange={onTradeChange}
        tokenPair={tokenPair.data}
        tokenPairs={tokenPairs.data}
        tradeSide={state.data?.type}
        explorerUrl={explorerUrl}
      />
    </TIFProvider>
  );
};
