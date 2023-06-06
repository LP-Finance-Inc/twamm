// import TextField from "@mui/material/TextField";
import type { ChangeEvent, MouseEvent } from "react";
import type { PublicKey } from "@solana/web3.js";
import Typography from "@mui/material/Typography";
import { useCallback, useMemo, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";

import CoinSelect from "../molecules/coin-select";
import i18n from "../i18n";
import Loading from "../atoms/loading";
import TokenTags from "../atoms/token-tags";
import useJupTokensByMint from "../hooks/use-jup-tokens-by-mint";
import * as Styled from "./coin-select.styled";
import { STARRED_COINS } from "../env";

const populateTokenRecords = (data?: JupToken[]) => {
  if (!data) return {};

  const records: Record<string, TokenInfo> = {};
  data.forEach((token) => {
    try {
      records[token.symbol.toLowerCase()] = {
        ...token,
        image: token.logoURI,
      };
      // eslint-disable-next-line no-empty
    } catch (error) {}
  });

  return records;
};

export default ({
  id,
  onDelete,
  onSelect,
  selected,
  tokens,
}: {
  id?: string;
  onDelete: (arg0: string) => void;
  onSelect: (arg0: TokenInfo) => void;
  selected?: PublicKey[];
  tokens?: PublicKey[];
}) => {
  const [search, setSearch] = useState<string>();

  const { data, isLoading } = useJupTokensByMint(tokens);
  const { data: selectedData } = useJupTokensByMint(selected);
  const { publicKey } = useWallet();

  const coinRecords = useMemo(() => populateTokenRecords(data), [data]);
  const selectedRecords = useMemo(
    () => populateTokenRecords(selectedData),
    [selectedData]
  );

  const starredTokens = STARRED_COINS.map(
    (symbol) => coinRecords[symbol]
  ).filter((c) => c);

  const onCoinSelect = useCallback(
    (_: MouseEvent, symbol: string) => {
      onSelect(coinRecords[symbol.toLowerCase()]);
    },
    [coinRecords, onSelect]
  );

  const onCoinDelete = useCallback(
    (_: MouseEvent, symbol: string) => {
      onDelete(symbol);
    },
    [onDelete]
  );

  const onSearch = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setSearch(value.toLowerCase());
  }, []);

  const searchIconSx = useMemo(
    () => ({ color: "action.active", mr: 1, my: 0.5 }),
    []
  );

  return (
    <Styled.Container>
      {isLoading && <Loading />}
      <Styled.SearchBox>
        <Styled.InputField
          type="text"
          placeholder={i18n.CoinSelectorSearch}
          onChange={onSearch}
        />
        <Styled.SearchIconBox sx={searchIconSx} />
      </Styled.SearchBox>
      <Typography id={id} px={2} pt={2} variant="h6">
        {i18n.CoinSelectorStarred}
      </Typography>
      <Styled.Tags px={2} pb={1}>
        <TokenTags
          coins={Object.values(selectedRecords)}
          onClick={onCoinDelete}
          deletable
        />
        <TokenTags coins={starredTokens} onClick={onCoinSelect} />
      </Styled.Tags>
      <Styled.Line />
      <Typography id={id} p={2} variant="h6">
        {i18n.CoinSelector}
      </Typography>
      <CoinSelect
        data={coinRecords}
        filterValue={search}
        onClick={onCoinSelect}
        publicKey={publicKey}
      />
    </Styled.Container>
  );
};
