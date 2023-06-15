import type { ReactNode } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import useTxRunner from "../contexts/transaction-runner-context";

export default ({
  label,
  onClose,
  theme,
}: {
  label: string;
  onClose?: () => void;
  theme: string;
}) => {
  const { explorer, explorers, setExplorer } = useTxRunner();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleChange = (event: SelectChangeEvent<unknown>, _: ReactNode) => {
    setExplorer(event.target.value as string);

    if (onClose) onClose();
  };

  const menuProps = {
    sx: {
      "& > .MuiPaper-root": {
        background: theme === "dark" ? "#161724" : "#DDE7F4",
        border: "0.5px solid rgba(255, 255, 255, 0.16)",
        boxShadow: "0px 8px 32px rgba(0, 0, 0, 0.08)",
        borderRadius: "8px",
      },
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
        value={explorer}
        sx={{ width: 110 }}
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
