import Grid from "@mui/material/Grid";
import M from "easy-maybe/lib";
import * as Styled from "./in-token-field.styled";
import i18n from "../i18n";
import TokenField from "../atoms/token-field";
import TokenSelect from "../atoms/token-select";
import useBalance from "../hooks/use-balance";
import { add, keepPrevious, refreshEach } from "../swr-options";

export interface Props {
  address?: string;
  name?: string;
  onChange: Parameters<typeof TokenField>[0]["onChange"];
  onSelect: Parameters<typeof TokenSelect>[0]["onClick"];
  src?: string;
}

export default ({ address, name, onChange, onSelect, src }: Props) => {
  const balance = useBalance(address, add([keepPrevious(), refreshEach()]));

  const displayName = M.withDefault("", M.of(name));
  const displayBalance = M.withDefault<string | number>(
    "...",
    M.of(balance.data)
  );

  return (
    <Styled.TokenField>
      <Grid container direction="row" alignItems="center">
        <Grid item xs={12} sm={3}>
          <TokenSelect
            alt={displayName}
            image={src}
            label={displayName}
            onClick={onSelect}
          />
        </Grid>
        <Grid item xs={12} sm={9}>
          <TokenField
            maxAmount={balance.data}
            address={address}
            onChange={onChange}
          />
        </Grid>
      </Grid>
      {/* <Styled.TokenTotal>
        {i18n.TokenUserBalance}: {displayBalance} {displayName}
      </Styled.TokenTotal> */}
    </Styled.TokenField>
  );
};
