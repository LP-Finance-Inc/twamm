import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";

export const Swap = styled(Box)`
  border: 1px solid ${({ theme }) => theme.palette.action.selected};
  border-radius: 1.5rem;
  background: #161724;
  box-shadow: 7px 7px 8px rgba(9, 9, 14, 0.2),
    -7px -7px 8px rgba(87, 87, 87, 0.1);
`;
