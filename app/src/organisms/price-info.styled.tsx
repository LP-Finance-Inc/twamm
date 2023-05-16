import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import ListItem from "@mui/material/ListItem";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import Link from "@mui/material/Link";

export const Info = styled(Box)`
  display: flex;
  justify-content: center;
`;

export const DetailsItem = styled(ListItem)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-left: 0;
  padding-right: 0;
  font-size: 0.8rem;
  overflow-wrap: anywhere;
`;

export const LinkOverflow = styled(Link)`
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;

  @media (max-width: 600px) {
    width: 180px;
  }
`;

export const Toggle = styled(IconButton)`
  padding: 0 ${(p) => p.theme.spacing(1)};
  color: #0c0;
`;

export const DetailsPair = styled(Stack)`
  align-items: center;
  justify-content: space-between;
`;

export const DetailsGridItem = styled(Grid)`
  width: 100%;
`;
