import type { Theme } from "@mui/material/styles";
import { lensPath, view } from "ramda";

export const lensMode = lensPath(["palette", "mode"]);

export const muiPaperCustomVariant = {
  background: "#161724",
  border: "0.5px solid rgba(255, 255, 255, 0.16)",
  boxShadow: "0px 8px 32px rgba(0, 0, 0, 0.08)",
  borderRadius: "8px",
};

export const muiPaperCustomVariantLight = {
  background: "#DDE7F4",
  border: "0.5px solid rgba(255, 255, 255, 0.16)",
  boxShadow: "0px 8px 32px rgba(0, 0, 0, 0.08)",
  borderRadius: "8px",
};

export const muiPaperCustomVariantDark = {
  background: "#161724",
  border: "0.5px solid rgba(255, 255, 255, 0.16)",
  boxShadow: "0px 8px 32px rgba(0, 0, 0, 0.08)",
  borderRadius: "8px",
};

export const light = {
  components: {},
};

export const dark = {
  components: {},
};

export default (theme: Theme) =>
  view(lensMode, theme) === "light"
    ? { ...theme, ...light }
    : { ...theme, ...dark };
