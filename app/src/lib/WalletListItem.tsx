import { WalletReadyState } from "@solana/wallet-adapter-base";
import type { Wallet } from "@solana/wallet-adapter-react";
import type { FC, MouseEventHandler } from "react";

import { Button } from "./Button";
import { WalletIcon } from "./WalletIcon";

export interface WalletListItemProps {
  handleClick: MouseEventHandler<HTMLButtonElement>;
  tabIndex?: number;
  wallet: Wallet;
  theme: string;
}

export const WalletListItem: FC<WalletListItemProps> = ({
  handleClick,
  tabIndex,
  wallet,
  theme,
}) => (
  <li>
    <Button
      onClick={handleClick}
      startIcon={<WalletIcon wallet={wallet} />}
      tabIndex={tabIndex}
      theme={theme}
    >
      {wallet.adapter.name}
      {wallet.readyState === WalletReadyState.Installed && (
        <span>Detected</span>
      )}
    </Button>
  </li>
);
