import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";

export const TokenField = styled(Box)`
  background: #161724;
  padding: 0.8rem 0.8rem;
  border-radius: 0.75rem;
  box-shadow: inset -4px -4px 5px rgba(87, 87, 87, 0.1),
    inset 4px 4px 5px rgba(9, 9, 14, 0.3);
`;

export const TokenTotal = styled(Box)`
  color: ${(p) => p.theme.palette.text.secondary};
  font-size: 13px;
  font-weight: 600;
  padding-top: 10px;
  text-align: right;
`;
