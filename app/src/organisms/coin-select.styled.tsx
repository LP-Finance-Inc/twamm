import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Divider from "@mui/material/Divider";
import SearchIcon from "@mui/icons-material/Search";

export const Container = styled(Box)`
  width: 100%;
`;

export const Tags = styled(Box)`
  display: flex;
`;

export const Line = styled(Divider)`
  border: 1px solid #0c0;
`;

export const SearchBox = styled(Box)`
  margin-top: 35px;
  position: relative;
`;

export const InputField = styled("input")`
  width: 100%;
  border: none;
  outline: none;
  background: #161724;
  color: #0c0;
  font-size: 1rem;
  padding: 1rem 0.8rem;
  border-radius: 0.75rem;
  box-shadow: inset -4px -4px 5px rgba(87, 87, 87, 0.1),
    inset 4px 4px 5px rgba(9, 9, 14, 0.3);
  text-align: left;
  direction: ltr;

  &::placeholder {
    opacity: 0.6;
    color: #0c0;
  }

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

export const SearchIconBox = styled(SearchIcon)`
  position: absolute;
  right: 10px;
  top: 10px;
`;
