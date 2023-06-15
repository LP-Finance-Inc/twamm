import type { FC } from "react";

const DiscordIcon: FC<{ width?: number; height?: number; color: string }> = ({
  width = 32,
  height = 32,
  color,
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 24 24"
  >
    <g
      fill="none"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    >
      <path d="M5.5 16c5 2.5 8 2.5 13 0" />
      <path d="m15.5 17.5l1 2s4.171-1.328 5.5-3.5c0-1 .53-8.147-3-10.5c-1.5-1-4-1.5-4-1.5l-1 2h-2" />
      <path d="m8.528 17.5l-1 2s-4.171-1.328-5.5-3.5c0-1-.53-8.147 3-10.5c1.5-1 4-1.5 4-1.5l1 2h2" />
      <path
        d="M8.5 14c-.828 0-1.5-.895-1.5-2s.672-2 1.5-2s1.5.895 1.5 2s-.672 2-1.5 2Zm7 0c-.828 
      0-1.5-.895-1.5-2s.672-2 1.5-2s1.5.895 1.5 2s-.672 2-1.5 2Z"
      />
    </g>
  </svg>
);

export default DiscordIcon;
