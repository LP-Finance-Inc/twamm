import type { FC } from "react";

const LinkedinIcon: FC<{ width?: number; height?: number; color: string }> = ({
  width = 35,
  height = 35,
  color,
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 16 17"
  >
    <path
      fill={color}
      d="M3.44 4.89c.8 0 1.44-.65 1.44-1.44s-.65-1.44-1.44-1.44S2 2.66 2 3.45s.65 
      1.44 1.44 1.44Zm2.81 1.09V14h2.48v-3.96c0-1.05.2-2.06 1.49-2.06s1.29 1.2 1.29
       2.12V14H14V9.6c0-2.16-.46-3.82-2.98-3.82c-1.21 0-2.02.66-2.35 1.29h-.03v-1.1H6.26Zm-4.05 0h2.49V14H2.2V5.98Z"
    />
  </svg>
);

export default LinkedinIcon;
