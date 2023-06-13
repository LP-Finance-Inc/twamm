import type { ReactElement } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import {
  createTheme,
  experimental_extendTheme as extendTheme,
  Experimental_CssVarsProvider as CssVarsProvider,
  ThemeProvider as Provider,
} from "@mui/material/styles";
import {
  createContext,
  useContext,
  memo,
  useCallback,
  useMemo,
  useState,
} from "react";

import { enhanceTheme } from "../theme";
import { darkTheme, lightTheme } from "../theme/external-theme";

const BaselineMemo = memo(() => <CssBaseline enableColorScheme />);

export interface Props {
  children: ReactElement;
}

export type ThemeProviderProps = {
  readonly theme: string;
  readonly handleTheme: () => void;
};

export const ThemeContext = createContext<ThemeProviderProps | undefined>(
  undefined
);

export const ThemeProvider = ({ children }: Props) => {
  const [preferredMode, setPreferredMode] = useState(true);

  const handleTheme = useCallback(() => {
    setPreferredMode(!preferredMode);
  }, [preferredMode]);

  const theme = useMemo(() => {
    const t = createTheme(
      preferredMode
        ? enhanceTheme({
            ...darkTheme,
            palette: {
              ...darkTheme.palette,
              mode: "dark",
            },
          })
        : enhanceTheme({
            ...lightTheme,
            palette: {
              ...lightTheme.palette,
              mode: "light",
            },
          })
    );

    return t;
  }, [preferredMode]);

  const cssVarTheme = useMemo(() => extendTheme(theme), [theme]);

  const ContextValue = useMemo(
    () => ({
      theme: theme.palette.mode,
      handleTheme,
    }),
    [theme, handleTheme]
  );

  return (
    <ThemeContext.Provider value={ContextValue}>
      <CssVarsProvider theme={cssVarTheme} />
      <Provider theme={theme}>
        <BaselineMemo />
        {children}
      </Provider>
    </ThemeContext.Provider>
  );
};

export default () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("Jupiter connection context required");
  }

  return context;
};
