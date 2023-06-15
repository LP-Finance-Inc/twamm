import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { styled } from "@mui/material/styles";

export const RootList = styled(List)`
  padding-top: 0px;
  padding-bottom: 0px;
  position: relative;
`;

export const ListItemStyle = styled(ListItem)`
  cursor: pointer;
  display: block;
  padding: 0 16px;
  position: absolute;
`;

export const CoinItem = styled(ListItem)`
  cursor: pointer;
  padding: 0 16px;
  border-radius: 0.8rem;
  transition: all 0.3s;
  -webkit-transition: all 0.3s;
  -moz-transition: all 0.3s;
  -ms-transition: all 0.3s;
  -o-transition: all 0.3s;
  -webkit-border-radius: 0.8rem;
  -moz-border-radius: 0.8rem;
  -ms-border-radius: 0.8rem;
  -o-border-radius: 0.8rem;

  &:hover,
  &:active,
  &:focus {
    background: ${({ theme }) => theme.palette.text.disabled};
  }
`;
