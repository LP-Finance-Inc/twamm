import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";

export const PaperFooter = styled(Paper)`
  background: ${({ theme }) => theme.palette.background.default};
  border-radius: 0;
  padding: 1rem 0rem 0rem 0rem;
  box-shadow: -0px -1px 5px rgba(100, 116, 139, 0.12);
`;

export const BorderBox = styled(Box)`
  padding: 0.5rem 1rem;
  border-top: 1px solid ${({ theme }) => theme.palette.text.secondary};
  border-bottom: 1px solid ${({ theme }) => theme.palette.text.secondary};

  @media (max-width: 600px) {
    text-align: center;
  }
`;

export const MediaList = styled(List)`
  display: flex;
  gap: 0rem;
`;
export const MediaItem = styled(ListItem)`
  padding: 0.3rem 0;
`;

export const CopyRight = styled(Box)`
  padding: 0.8rem 0rem 0.5rem 1rem;
  font-weight: 600;
  color: ${({ theme }) => theme.palette.text.primary};
  font-size: 0.9rem;

  @media (max-width: 600px) {
    text-align: center;
  }
`;

export const PowerBox = styled(Box)`
  display: flex;
  justify-content: center;
  padding: 2rem 0;
`;

export const JupiterLogo = styled(Box)`
  position: relative;
  width: 200px;
  height: 50px;
`;
