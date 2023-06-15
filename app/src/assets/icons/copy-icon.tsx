import type { FC } from "react";

const CopyIcon: FC<{ width?: number; height?: number; color: string }> = ({
  width = 26,
  height = 26,
  color,
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 24 24"
  >
    <path
      fill={color}
      d="M9 3.25A5.75 5.75 0 0 0 3.25 9v7.107a.75.75 0 0 0 1.5 0V9A4.25 4.25 0 0 1 9 4.75h7.013a.75.75
       0 0 0 0-1.5H9Z"
    />
    <path
      fill={color}
      fillRule="evenodd"
      d="M18.403 6.793a44.372 44.372 0 0 0-9.806 0a2.011 2.011 0 0 0-1.774 1.76a42.581 42.581 0 0 0
       0 9.893a2.01 2.01 0 0 0 1.774 1.76c3.241.363 6.565.363 9.806 0a2.01 2.01 0 0 0 1.774-1.76a42.579 
       42.579 0 0 0 0-9.893a2.011 2.011 0 0 0-1.774-1.76ZM8.764 8.284c3.13-.35 6.342-.35 9.472 0a.51.51 0 0
        1 .45.444a40.95 40.95 0 0 1 0 9.544a.51.51 0 0 1-.45.444c-3.13.35-6.342.35-9.472 0a.511.511 0 0
         1-.45-.444a40.95 40.95 0 0 1 0-9.544a.511.511 0 0 1 .45-.444Z"
      clipRule="evenodd"
    />
  </svg>
);

export default CopyIcon;
