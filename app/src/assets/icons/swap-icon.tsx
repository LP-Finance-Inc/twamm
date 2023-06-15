import type { FC } from "react";

const SwapIcon: FC<{
  width?: number;
  height?: number;
  color: string;
}> = ({ width = 26, height = 26, color }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 24 24"
  >
    <path
      fill={color}
      d="M12.005 22.003c-5.523 0-10-4.477-10-10s4.477-10 10-10s10 4.477 10 10s-4.477 10-10 10Zm0-2a8 
      8 0 1 0 0-16a8 8 0 0 0 0 16Zm-5-11l3-3.5l3 3.5h-2v4h-2v-4h-2Zm10 6l-3 3.5l-3-3.5h2v-4h2v4h2Z"
    />
  </svg>
);

export default SwapIcon;
