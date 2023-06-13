import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";

export const Swap = styled(Box)`
  border-radius: 1.5rem;
  background: ${({ theme }) => theme.palette.background.default};
  box-shadow: ${({ theme }) => theme.shadows[5]};
`;
