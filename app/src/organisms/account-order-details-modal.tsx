import type { BN } from "@project-serum/anchor";
import type { PublicKey } from "@solana/web3.js";
import type { TokenPair } from "@twamm/types";
import Box from "@mui/material/Box";
import DoneIcon from "@mui/icons-material/Done";
import M from "easy-maybe/lib";
import ScheduleIcon from "@mui/icons-material/Schedule";
import Stack from "@mui/material/Stack";
import { useCallback, useMemo } from "react";

import type {
  CancelOrderData,
  OrderRecord,
  PoolDetails,
} from "../types/decl.d";
import * as Styled from "./account-order-details-modal.styled";
import Control from "../atoms/account-orders-details-control";
import Loading from "../atoms/loading";
import PairCardSymbols from "../atoms/pair-card-symbols";
import Stats from "../atoms/account-orders-details-stats";
import useBreakpoints from "../hooks/use-breakpoints";
import usePoolDetails from "../hooks/use-pool-details";
import useTokenPairByPool from "../hooks/use-token-pair-by-pool";

const Content = ({
  details,
  filledQuantity,
  onCancelOrder,
  quantity,
  timeInForce,
  tokens,
}: {
  details: PoolDetails;
  filledQuantity: number;
  onCancelOrder: () => void;
  quantity: number;
  timeInForce: number;
  tokens?: any;
}) => (
  <Stack direction="column" spacing={2}>
    <Styled.ContentHeader>
      <Stack alignItems="baseline" direction="row" spacing={1}>
        <PairCardSymbols data={tokens} displayDirection side={details.side} />
        {!details.expired ? <ScheduleIcon /> : <DoneIcon />}
      </Stack>
    </Styled.ContentHeader>
    <Stats
      details={details}
      filledQuantity={filledQuantity}
      quantity={quantity}
      timeInForce={timeInForce}
    />
    <Control
      expired={details.expired}
      inactive={details.inactive}
      onClick={onCancelOrder}
    />
  </Stack>
);

export default ({
  filledQuantity,
  onCancel,
  order,
  poolAddress,
  quantity,
  side,
  supply,
  timeInForce,
  data,
  isLoading,
}: {
  filledQuantity: number;
  onCancel: (arg0: CancelOrderData) => void;
  order: OrderRecord["order"];
  poolAddress: PublicKey;
  quantity: number;
  side: OrderTypeStruct;
  supply: BN;
  timeInForce: number;
  data?: any;
  isLoading: boolean;
}) => {
  const details = usePoolDetails(poolAddress, order);
  const tokenPair = useTokenPairByPool(poolAddress);

  const pairMints = M.withDefault(
    undefined,
    M.andMap<TokenPair, [PublicKey, PublicKey]>(
      (pair) => [pair.configA.mint, pair.configB.mint],
      M.of(tokenPair.data)
    )
  );
  // const tokens = useTokensByMint(pairMints);

  const tokens = useMemo(() => {
    if (pairMints && !isLoading) {
      const mintA = pairMints[0].toString();
      const mintB = pairMints[1].toString();
      const infoA = data[mintA];
      const infoB = data[mintB];

      return [
        {
          contract_address: mintA,
          imageSmall: infoA.logo,
          name: infoA.name,
          symbol: infoA.symbol,
        },
        {
          contract_address: mintB,
          imageSmall: infoB.logo,
          name: infoB.name,
          symbol: infoB.symbol,
        },
      ];
    }
    return null;
  }, [pairMints, isLoading, data]);

  const { isMobile } = useBreakpoints();

  const onCancelOrder = useCallback(() => {
    M.tap((d) => {
      const { aAddress, bAddress, expired, inactive, poolAddress: a } = d;

      onCancel({
        a: aAddress,
        b: bAddress,
        expired,
        inactive,
        orderAddress: order.address,
        poolAddress: a,
        side,
        supply,
      });
    }, M.of(details.data));
  }, [details, onCancel, order, side, supply]);

  if (details.isLoading || !details.data)
    return (
      <Box p={2}>
        <Loading size={20} />
      </Box>
    );

  const orderDetails = details.data as NonNullable<typeof details.data>;

  if (isMobile)
    return (
      <Styled.MobileContainer>
        <Content
          details={orderDetails}
          filledQuantity={filledQuantity}
          onCancelOrder={onCancelOrder}
          quantity={quantity}
          timeInForce={timeInForce}
          tokens={tokens}
        />
      </Styled.MobileContainer>
    );

  return (
    <Styled.Container>
      <Content
        details={orderDetails}
        filledQuantity={filledQuantity}
        onCancelOrder={onCancelOrder}
        quantity={quantity}
        timeInForce={timeInForce}
        tokens={tokens}
      />
    </Styled.Container>
  );
};
