import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import useSWR from "swr";

import AccountOrdersList from "./account-orders-list";
import useOrderRecords from "../hooks/use-order-records";
import { ConnectWalletGuard } from "./wallet-guard";
import { add, keepPrevious, refreshEach } from "../swr-options";
import api from "../api";

const REFRESH_INTERVAL = 10000;

const fetcher = async (url: string) => fetch(url).then((res) => res.json());

export default () => {
  const { data, isLoading } = useSWR(api.tokenList, fetcher);

  const orders = useOrderRecords(
    undefined,
    add([keepPrevious(), refreshEach(REFRESH_INTERVAL)])
  );

  return (
    <Box pb={2}>
      <Typography pb={2} variant="h4">
        Orders
      </Typography>
      <AccountOrdersList
        tokenList={data}
        isLoading={isLoading}
        data={orders.data}
        error={orders.error}
        loading={orders.isLoading}
        updating={orders.isValidating}
        updatingInterval={REFRESH_INTERVAL}
      />
      <Box mt={3} mb={2}>
        <ConnectWalletGuard />
      </Box>
    </Box>
  );
};
