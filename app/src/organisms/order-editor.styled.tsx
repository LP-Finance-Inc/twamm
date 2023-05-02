import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";

export const Swap = styled(Box)`
  border: 1px solid ${({ theme }) => theme.palette.action.selected};
  box-shadow: 7px 7px 10px rgba(9, 9, 14, 0.5),
    -7px -7px 10px rgba(87, 87, 87, 0.2);
  border-radius: 20px;
  background: #161724;
`;
