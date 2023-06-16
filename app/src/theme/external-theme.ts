import { createTheme } from "@mui/material";

declare module "@mui/material/styles" {
  interface BreakpointOverrides {
    xs: true;
    sm: true;
    md: true;
    lg: true;
    xl: true;
    mobile: true;
    tablet: true;
    laptop: true;
    desktop: true;
  }
  interface ColorOverrides {
    white: {
      600: true;
    };
  }
  interface PaletteOptions {
    neutral: {
      100: string;
      200: string;
      300: string;
      400: string;
      500: string;
      600: string;
      700: string;
      800: string;
      900: string;
    };
  }
}

// ===================================================================
// COMMON THEME SETUP
// ===================================================================

export const commanTheme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 1000,
      lg: 1200,
      xl: 1920,
      mobile: 0,
      tablet: 640,
      laptop: 1024,
      desktop: 1200,
    },
  },
  shape: {
    borderRadius: 8,
  },
  typography: {
    button: {
      fontWeight: 600,
    },
    fontFamily: "SF Mono Medium",
    body1: {
      fontSize: "1rem",
      fontWeight: 400,
      lineHeight: 1.5,
    },
    body2: {
      fontSize: "0.875rem",
      fontWeight: 600,
      lineHeight: 1.57,
    },
    subtitle1: {
      fontSize: "1rem",
      fontWeight: 500,
      lineHeight: 1.75,
    },
    subtitle2: {
      fontSize: "0.875rem",
      fontWeight: 500,
    },
    overline: {
      fontSize: "0.75rem",
      fontWeight: 600,
      letterSpacing: "0.5px",
      lineHeight: 2.5,
      textTransform: "uppercase",
    },
    caption: {
      fontSize: "0.75rem",
      fontWeight: 400,
      lineHeight: 1.66,
    },
    h1: {
      fontWeight: 700,
      fontSize: "3.5rem",
      lineHeight: 1.375,
    },
    h2: {
      fontWeight: 700,
      fontSize: "3rem",
      lineHeight: 1.375,
    },
    h3: {
      fontWeight: 700,
      fontSize: "2.25rem",
      lineHeight: 1.375,
    },
    h4: {
      fontWeight: 500,
      fontSize: "1.6rem",
      lineHeight: 1,
    },
    h5: {
      fontWeight: 600,
      fontSize: "1.5rem",
      lineHeight: 1.375,
    },
    h6: {
      fontWeight: 800,
      fontSize: "0.83rem",
      lineHeight: 1.375,
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          textTransform: "none",
        },
        sizeSmall: {
          padding: "6px 16px",
        },
        sizeMedium: {
          padding: "8px 20px",
        },
        sizeLarge: {
          padding: "11px 24px",
        },
        textSizeSmall: {
          padding: "7px 12px",
        },
        textSizeMedium: {
          padding: "9px 16px",
        },
        textSizeLarge: {
          padding: "12px 16px",
        },
      },
    },
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: "32px 24px",
          "&:last-child": {
            paddingBottom: "32px",
          },
        },
      },
    },
    MuiCardHeader: {
      defaultProps: {
        titleTypographyProps: {
          variant: "h6",
        },
        subheaderTypographyProps: {
          variant: "body2",
        },
      },
      styleOverrides: {
        root: {
          padding: "32px 24px",
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        "*": {
          boxSizing: "border-box",
          margin: 0,
          padding: 0,
        },
        html: {
          MozOsxFontSmoothing: "grayscale",
          WebkitFontSmoothing: "antialiased",
          display: "flex",
          flexDirection: "column",
          minHeight: "100%",
          width: "100%",
        },
        body: {
          display: "flex",
          flex: "1 1 auto",
          flexDirection: "column",
          minHeight: "100%",
          width: "100%",
        },
        "#__next": {
          display: "flex",
          flex: "1 1 auto",
          flexDirection: "column",
          height: "100%",
          width: "100%",
        },
      },
    },
  },
});

// ===================================================================
// LIGHT THEME SETUP
// ===================================================================

export const lightPalette = {
  neutral: {
    100: "#F3F4F6",
    200: "#E5E7EB",
    300: "#D1D5DB",
    400: "#9CA3AF",
    500: "#6B7280",
    600: "#4B5563",
    700: "#374151",
    800: "#1F2937",
    900: "#111827",
  },
  action: {
    active: "#7620E0",
    focus: "rgba(55, 65, 81, 0.12)",
    hover: "rgba(55, 65, 81, 0.04)",
    selected: "rgba(55, 65, 81, 0.08)",
    disabledBackground: "rgba(55, 65, 81, 0.12)",
    disabled: "rgba(55, 65, 81, 0.26)",
  },
  background: {
    default: "#DDE7F4",
    paper: "#FFFFFF",
  },
  divider: "#E6E8F0",
  primary: {
    main: "rgb(51, 51, 51)",
    light: "#828DF8",
    dark: "#3832A0",
    contrastText: "#FFFFFF",
  },
  secondary: {
    main: "#10B981",
    light: "#3FC79A",
    dark: "#0B815A",
    contrastText: "#FFFFFF",
  },
  success: {
    main: "#14B8A6",
    light: "#43C6B7",
    dark: "rgb(51, 51, 51)",
    contrastText: "#FFFFFF",
  },
  info: {
    main: "#2196F3",
    light: "#64B6F7",
    dark: "#0B79D0",
    contrastText: "#FFFFFF",
  },
  warning: {
    main: "#FFB020",
    light: "#FFBF4C",
    dark: "#B27B16",
    contrastText: "#FFFFFF",
  },
  error: {
    main: "#D14343",
    light: "#DA6868",
    dark: "#922E2E",
    contrastText: "#FFFFFF",
  },
  text: {
    primary: "rgb(51, 51, 51)",
    secondary: "#7620E0",
    disabled: "rgba(55, 65, 81, 0.48)",
  },
};

export const lightTheme = createTheme({
  breakpoints: commanTheme.breakpoints,
  typography: commanTheme.typography,
  shape: commanTheme.shape,
  components: {
    ...commanTheme.components,
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
          borderColor: "#E6E8F0",
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: "#F3F4F6",
          ".MuiTableCell-root": {
            color: "#374151",
          },
          borderBottom: "none",
          "& .MuiTableCell-root": {
            borderBottom: "none",
            fontSize: "12px",
            fontWeight: 600,
            lineHeight: 1,
            letterSpacing: 0.5,
            textTransform: "uppercase",
          },
          "& .MuiTableCell-paddingCheckbox": {
            paddingTop: 4,
            paddingBottom: 4,
          },
        },
      },
    },
  },
  palette: lightPalette,
  shadows: [
    "none",
    "3px 3px 6px #bec8e4, -3px -3px 6px #fff",
    "inset -2px -2px 5px  #fff,inset 2px 2px 5px #bec8e4",
    "3px 3px 6px #bec8e4, -3px -3px 6px #fff",
    "0px 1px 5px rgba(100, 116, 139, 0.12)",
    "3px 3px 6px #bec8e4, -3px -3px 6px #fff",
    "inset -2px -2px 5px  #fff,inset 2px 2px 5px #bec8e4",
    "2px 2px 3px #bec8e4, -2px -2px 3px #fff",
    "3px 3px 6px #bec8e4, -3px -3px 6px #fff",
    "3px 3px 6px #bec8e4, -3px -3px 6px #fff",
    "0px 5px 14px rgba(100, 116, 139, 0.12)",
    "0px 5px 15px rgba(100, 116, 139, 0.12)",
    "0px 6px 15px rgba(100, 116, 139, 0.12)",
    "0px 7px 15px rgba(100, 116, 139, 0.12)",
    "0px 8px 15px rgba(100, 116, 139, 0.12)",
    "0px 9px 15px rgba(100, 116, 139, 0.12)",
    "0px 10px 15px rgba(100, 116, 139, 0.12)",
    "0px 12px 22px -8px rgba(100, 116, 139, 0.25)",
    "0px 13px 22px -8px rgba(100, 116, 139, 0.25)",
    "0px 14px 24px -8px rgba(100, 116, 139, 0.25)",
    "0px 10px 10px rgba(31, 41, 55, 0.04), 0px 20px 25px rgba(31, 41, 55, 0.1)",
    "0px 25px 50px rgba(100, 116, 139, 0.25)",
    "0px 25px 50px rgba(100, 116, 139, 0.25)",
    "0px 25px 50px rgba(100, 116, 139, 0.25)",
    "0px 25px 50px rgba(100, 116, 139, 0.25)",
  ],
});

// ===================================================================
// DARK THEME SETUP
// ===================================================================

export const darkPalette = {
  neutral: {
    100: "#F3F4F6",
    200: "#E5E7EB",
    300: "#D1D5DB",
    400: "#9CA3AF",
    500: "#6B7280",
    600: "#4B5563",
    700: "#374151",
    800: "#1F2937",
    900: "#111827",
  },
  action: {
    active: "#0f0",
    focus: "rgba(55, 65, 81, 0.12)",
    hover: "rgba(55, 65, 81, 0.04)",
    selected: "rgba(55, 65, 81, 0.08)",
    disabledBackground: "rgba(55, 65, 81, 0.12)",
    disabled: "rgba(55, 65, 81, 0.26)",
  },
  background: {
    default: "#161724",
    paper: "#FFFFFF",
  },
  divider: "#E6E8F0",
  primary: {
    main: "#0f0",
    light: "#828DF8",
    dark: "#3832A0",
    contrastText: "#FFFFFF",
  },
  secondary: {
    main: "#10B981",
    light: "#3FC79A",
    dark: "#0B815A",
    contrastText: "#FFFFFF",
  },
  success: {
    main: "#14B8A6",
    light: "#43C6B7",
    dark: "#0c0",
    contrastText: "#FFFFFF",
  },
  info: {
    main: "#2196F3",
    light: "#64B6F7",
    dark: "#0B79D0",
    contrastText: "#FFFFFF",
  },
  warning: {
    main: "#FFB020",
    light: "#FFBF4C",
    dark: "#B27B16",
    contrastText: "#FFFFFF",
  },
  error: {
    main: "#D14343",
    light: "#DA6868",
    dark: "#922E2E",
    contrastText: "#FFFFFF",
  },
  text: {
    primary: "#0c0",
    secondary: "#0c0",
    disabled: "rgba(55, 65, 81, 0.48)",
  },
};

export const darkTheme = createTheme({
  breakpoints: commanTheme.breakpoints,
  typography: commanTheme.typography,
  shape: commanTheme.shape,
  components: {
    ...commanTheme.components,
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
          borderColor: "#E6E8F0",
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: "#F3F4F6",
          ".MuiTableCell-root": {
            color: "#374151",
          },
          borderBottom: "none",
          "& .MuiTableCell-root": {
            borderBottom: "none",
            fontSize: "12px",
            fontWeight: 600,
            lineHeight: 1,
            letterSpacing: 0.5,
            textTransform: "uppercase",
          },
          "& .MuiTableCell-paddingCheckbox": {
            paddingTop: 4,
            paddingBottom: 4,
          },
        },
      },
    },
  },
  palette: darkPalette,
  shadows: [
    "none",
    "5px 5px 6px rgba(9, 9, 14, 0.5), -5px -5px 6px rgba(87, 87, 87, 0.2)",
    "inset -4px -4px 5px rgba(87, 87, 87, 0.2), inset 4px 4px 5px rgba(9, 9, 14, 0.5)",
    "4px 4px 6px rgba(9, 9, 14, 0.4), -4px -4px 6px rgba(87, 87, 87, 0.1)",
    "0px 1px 5px rgba(100, 116, 139, 0.12)",
    "7px 7px 8px rgba(9, 9, 14, 0.2), -7px -7px 8px rgba(87, 87, 87, 0.1)",
    "inset -4px -4px 5px rgba(87, 87, 87, 0.1), inset 4px 4px 5px rgba(9, 9, 14, 0.3)",
    "2px 2px 3px rgba(9, 9, 14, 0.05), -2px -2px 3px rgba(87, 87, 87, 0.1)",
    "5px 5px 6px rgba(9, 9, 14, 0.5), -5px -5px 6px rgba(87, 87, 87, 0.2)",
    "-4px -4px 4px rgba(46, 189, 46, 0.47), 4px 4px 4px rgba(28, 184, 28, 0.47)",
    "0px 5px 14px rgba(100, 116, 139, 0.12)",
    "0px 5px 15px rgba(100, 116, 139, 0.12)",
    "0px 6px 15px rgba(100, 116, 139, 0.12)",
    "0px 7px 15px rgba(100, 116, 139, 0.12)",
    "0px 8px 15px rgba(100, 116, 139, 0.12)",
    "0px 9px 15px rgba(100, 116, 139, 0.12)",
    "0px 10px 15px rgba(100, 116, 139, 0.12)",
    "0px 12px 22px -8px rgba(100, 116, 139, 0.25)",
    "0px 13px 22px -8px rgba(100, 116, 139, 0.25)",
    "0px 14px 24px -8px rgba(100, 116, 139, 0.25)",
    "0px 10px 10px rgba(31, 41, 55, 0.04), 0px 20px 25px rgba(31, 41, 55, 0.1)",
    "0px 25px 50px rgba(100, 116, 139, 0.25)",
    "0px 25px 50px rgba(100, 116, 139, 0.25)",
    "0px 25px 50px rgba(100, 116, 139, 0.25)",
    "0px 25px 50px rgba(100, 116, 139, 0.25)",
  ],
});
