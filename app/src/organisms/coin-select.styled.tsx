import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Divider from "@mui/material/Divider";
import SearchIcon from "@mui/icons-material/Search";

export const Container = styled(Box)`
  max-width: 100%;
  width: 590px;

  @media (max-width: 600px) {
    width: 100%;
  }
`;

export const Tags = styled(Box)`
  display: flex;
`;

export const Line = styled(Divider)`
  border: 1px solid ${({ theme }) => theme.palette.text.primary};
`;

export const SearchBox = styled(Box)`
  margin-top: 35px;
  position: relative;
`;

export const InputField = styled("input")`
  width: 100%;
  border: none;
  outline: none;
  background: ${({ theme }) => theme.palette.background.default};
  color: ${({ theme }) => theme.palette.text.primary};
  font-size: 1rem;
  padding: 1rem 0.8rem;
  border-radius: 0.75rem;
  box-shadow: ${({ theme }) => theme.shadows[6]};
  text-align: left;
  direction: ltr;

  &::placeholder {
    opacity: 0.6;
    color: ${({ theme }) => theme.palette.text.primary};
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
