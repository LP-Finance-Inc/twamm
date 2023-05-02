import type { ReactNode } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import useTxRunner from "../contexts/transaction-runner-context";
import { muiPaperCustomVariant } from "../theme/overrides";

export default ({
  label,
  onClose,
}: {
  label: string;
  onClose?: () => void;
}) => {
  const { explorer, explorers, setExplorer } = useTxRunner();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleChange = (event: SelectChangeEvent<unknown>, _: ReactNode) => {
    setExplorer(event.target.value as string);

    if (onClose) onClose();
  };

  const menuProps = {
    sx: {
      "& > .MuiPaper-root": muiPaperCustomVariant,
    },
  };

  return (
    <FormControl size="small">
      <InputLabel id="select-explorer-label">{label}</InputLabel>
      <Select
        id="select-explorer"
        label={label}
        labelId="select-explorer-label"
        MenuProps={menuProps}
        onChange={handleChange}
        sx={{ width: 110, color: "#0c0" }}
        value={explorer}
      >
        <MenuItem value={explorers.explorer.uri}>
          {explorers.explorer.label}
        </MenuItem>
        <MenuItem value={explorers.solanafm.uri}>
          {explorers.solanafm.label}
        </MenuItem>
        <MenuItem value={explorers.xray.uri}>{explorers.xray.label}</MenuItem>
      </Select>
    </FormControl>
  );
};
