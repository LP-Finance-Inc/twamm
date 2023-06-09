import type { TokenPair } from "@twamm/types";
import Alert from "@mui/material/Alert";
import { useMemo, useState } from "react";
import useSWR from "swr";
import TablePagination from "@mui/material/TablePagination";

import PairCard from "../atoms/pair-card";
import api from "../api";
import i18n from "../i18n";
import * as Styled from "./token-pair-cards.styled";
import { lpfinanceOracleTokens } from "../oracle-type";

const Headers = [
  {
    id: 1,
    head: "#",
  },
  {
    id: 2,
    head: "Name",
  },
  {
    id: 3,
    head: i18n.StatsPairsPairOrderVolume,
  },
  {
    id: 4,
    head: i18n.TwammFee,
  },
  {
    id: 5,
    head: i18n.OracleType,
  },
];

const fetcher = async (url: string) => fetch(url).then((res) => res.json());

export default ({ info }: { info?: TokenPair[] }) => {
  const { data, isLoading } = useSWR(api.tokenList, fetcher);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(15);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const tokenPairs = useMemo(() => {
    const processedInfo = [];
    if (info) {
      for (let i = 0; i < (info?.length ?? 0); i += 1) {
        const { statsA } = info[i];
        const { statsB } = info[i];
        // const decimalA = 10 ** info[i].configA.decimals;
        const decimalB = 1000000;
        const aMint = info[i].configA.mint;
        const bMint = info[i].configB.mint;

        const orderVolume =
          Number(statsA.orderVolumeUsd) / decimalB +
          Number(statsB.orderVolumeUsd) / decimalB;

        const routedVolume =
          Number(statsA.routedVolumeUsd) / decimalB +
          Number(statsB.routedVolumeUsd) / decimalB;

        const settledVolume =
          Number(statsA.settledVolumeUsd) / decimalB +
          Number(statsB.settledVolumeUsd) / decimalB;

        const fee =
          Number(statsA.feesCollected) / decimalB +
          Number(statsB.feesCollected) / decimalB;

        const oracleType = lpfinanceOracleTokens.includes(
          info[i].configA.mint.toString()
        )
          ? "LP Finance"
          : "Pyth";
        processedInfo.push({
          aMint,
          bMint,
          fee,
          id: `${aMint}-${bMint}`,
          orderVolume,
          routedVolume,
          settledVolume,
          oracleType,
        });
      }
    }
    return processedInfo;
  }, [info]);

  if (!tokenPairs.length || isLoading)
    return <Alert severity="info">No Pairs Present</Alert>;

  return (
    <>
      <Styled.TableRoot>
        <Styled.TableBodyMain size="small" aria-label="customized table">
          <Styled.TableHeadBox>
            <Styled.TableRowBox>
              {Headers.map((item) => (
                <Styled.TableCellBox key={item.id} align="left">
                  {item.head}
                </Styled.TableCellBox>
              ))}
            </Styled.TableRowBox>
          </Styled.TableHeadBox>

          <Styled.TableBodyCover>
            {tokenPairs
              .sort((a, b) => b.orderVolume - a.orderVolume)
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((tokenPair, index) => (
                <PairCard
                  key={tokenPair.id}
                  list={data}
                  itemNum={index + rowsPerPage * page}
                  aMint={tokenPair.aMint}
                  bMint={tokenPair.bMint}
                  orderVolume={tokenPair.orderVolume}
                  oracleType={tokenPair.oracleType}
                />
              ))}
          </Styled.TableBodyCover>
        </Styled.TableBodyMain>
      </Styled.TableRoot>
      <TablePagination
        rowsPerPageOptions={[15, 30, 50]}
        component="div"
        count={tokenPairs.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
};
