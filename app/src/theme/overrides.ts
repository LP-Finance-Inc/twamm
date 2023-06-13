import type { Theme } from "@mui/material/styles";
import { lensPath, view } from "ramda";

import { darkPalette } from "./external-theme";

export const lensMode = lensPath(["palette", "mode"]);

export const muiPaperCustomVariant = {
  background:
    "linear-gradient(110.5deg, rgba(26, 31, 46) 3.75%, rgba(36, 41, 57) 117.62%)",
  border: "0.5px solid rgba(255, 255, 255, 0.16)",
  boxShadow: "0px 8px 32px rgba(0, 0, 0, 0.08)",
  borderRadius: "8px",
};

export const light = {
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          padding: "4px",
          border: "1px solid rgba(255, 255, 255, 0.1)",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {},
      },
    },
  },
};

export const dark = {
  components: {
    MuiBackdrop: {
      styleOverrides: {
        root: {
          "& > .MuiPaper-root": muiPaperCustomVariant,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          background: "rgba(255, 255, 255, 0.04)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
        },
      },
    },
    MuiDataGrid: {
      styleOverrides: {
        root: {
          color: "#fff",
        },
        overlay: {
          color: "#fff",
          position: "relative",
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        input: {
          color: "#0c0",
        },
      },
    },
    MuiModal: {
      variants: [
        {
          props: { variant: "custom" },
          style: {
            "& > .MuiPaper-root": {
              background: darkPalette.background.paper,
              border: muiPaperCustomVariant.border,
              boxShadow: muiPaperCustomVariant.boxShadow,
              borderRadius: muiPaperCustomVariant.borderRadius,
            },
            "& .MuiCard-root": {
              background: "transparent",
              border: 0,
              boxShadow: "none",
            },
          },
        },
      ],
    },
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
          borderColor: "#0c0",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          color: "rgba(255, 255, 255, 0.6)",
          background:
            "linear-gradient(110.5deg, rgba(26, 31, 46, 0.4) 3.75%, rgba(36, 41, 57, 0.4) 117.62%)",
        },
      },
    },
    MuiSkeleton: {
      styleOverrides: {
        root: {
          backgroundColor: "rgba(255, 255, 255, 0.04)",
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          color: darkPalette.text.primary,
        },
      },
    },
  },
};

export default (theme: Theme) =>
  view(lensMode, theme) === "light"
    ? { ...theme, ...light }
    : { ...theme, ...dark };
