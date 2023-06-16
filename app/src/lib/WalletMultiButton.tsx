import { useWallet } from "@solana/wallet-adapter-react";
import type { FC } from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import type { ButtonProps } from "./Button";
import { Button } from "./Button";
import { useWalletModal } from "./useWalletModal";
import { WalletConnectButton } from "./WalletConnectButton";
import { WalletIcon } from "./WalletIcon";
import { WalletModalButton } from "./WalletModalButton";
import CopyIcon from "../assets/icons/copy-icon";
import DisconnectIcon from "../assets/icons/disconnect-icon";
import SwapIcon from "../assets/icons/swap-icon";

export const WalletMultiButton: FC<ButtonProps> = ({ children, ...props }) => {
  const { publicKey, wallet, disconnect } = useWallet();
  const { setVisible, theme } = useWalletModal();
  const [copied, setCopied] = useState(false);
  const [active, setActive] = useState(false);
  const ref = useRef<HTMLUListElement>(null);

  const base58 = useMemo(() => publicKey?.toBase58(), [publicKey]);
  const content = useMemo(() => {
    if (children) return children;
    if (!wallet || !base58) return null;
    return `${base58.slice(0, 4)}..${base58.slice(-4)}`;
  }, [children, wallet, base58]);

  const copyAddress = useCallback(async () => {
    if (base58) {
      await navigator.clipboard.writeText(base58);
      setCopied(true);
      setTimeout(() => setCopied(false), 400);
    }
  }, [base58]);

  const openDropdown = useCallback(() => {
    setActive(true);
  }, []);

  const closeDropdown = useCallback(() => {
    setActive(false);
  }, []);

  const openModal = useCallback(() => {
    setVisible(true);
    closeDropdown();
  }, [setVisible, closeDropdown]);

  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      const node = ref.current;

      // Do nothing if clicking dropdown or its descendants
      if (!node || node.contains(event.target as Node)) return;

      closeDropdown();
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, closeDropdown]);

  if (!wallet)
    // eslint-disable-next-line react/jsx-props-no-spreading
    return <WalletModalButton {...props}>{children}</WalletModalButton>;
  if (!base58)
    // eslint-disable-next-line react/jsx-props-no-spreading
    return <WalletConnectButton {...props}>{children}</WalletConnectButton>;

  return (
    <div className="wallet-adapter-dropdown">
      <Button
        aria-expanded={active}
        className="wallet-adapter-button-trigger"
        style={{ pointerEvents: active ? "none" : "auto", ...props.style }}
        onClick={openDropdown}
        startIcon={<WalletIcon wallet={wallet} />}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...props}
      >
        {content}
      </Button>
      <ul
        aria-label="dropdown-list"
        className={`${
          theme === "dark" ? null : "ewallet-adapter-dropdown-list"
        } wallet-adapter-dropdown-list ${
          active && "wallet-adapter-dropdown-list-active"
        }`}
        ref={ref}
        role="menu"
      >
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
        <li
          onClick={copyAddress}
          className={`${
            theme === "dark" ? null : "ewallet-adapter-dropdown-list-item"
          } wallet-adapter-dropdown-list-item`}
          role="menuitem"
        >
          <CopyIcon color={theme === "dark" ? "#0c0" : "#7620E0"} />
          <span style={{ paddingLeft: "5px" }}>
            {copied ? "Copied" : "Copy address"}
          </span>
        </li>
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
        <li
          onClick={openModal}
          className={`${
            theme === "dark" ? null : "ewallet-adapter-dropdown-list-item"
          } wallet-adapter-dropdown-list-item`}
          role="menuitem"
        >
          <SwapIcon color={theme === "dark" ? "#0c0" : "#7620E0"} />
          <span style={{ paddingLeft: "5px" }}>Change wallet</span>
        </li>
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
        <li
          onClick={disconnect}
          className={`${
            theme === "dark" ? null : "ewallet-adapter-dropdown-list-item"
          } wallet-adapter-dropdown-list-item`}
          role="menuitem"
        >
          <DisconnectIcon color={theme === "dark" ? "#0c0" : "#7620E0"} />
          <span style={{ paddingLeft: "5px" }}>Disconnect</span>
        </li>
      </ul>
    </div>
  );
};
