import type { FC, ReactNode } from "react";
import { useMemo, useState } from "react";

import { WalletModalContext } from "./useWalletModal";
import type { WalletModalProps } from "./WalletModal";
import { WalletModal } from "./WalletModal";

export interface WalletModalProviderProps extends WalletModalProps {
  children: ReactNode;
  theme: string;
}

export const WalletModalProvider: FC<WalletModalProviderProps> = ({
  children,
  theme,
}) => {
  const [visible, setVisible] = useState(false);

  const ContextValue = useMemo(
    () => ({
      visible,
      setVisible,
      theme,
    }),
    [visible, setVisible, theme]
  );

  return (
    <WalletModalContext.Provider value={ContextValue}>
      {children}

      {visible && <WalletModal />}
    </WalletModalContext.Provider>
  );
};
