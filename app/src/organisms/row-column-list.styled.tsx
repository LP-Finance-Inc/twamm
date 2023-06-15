import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import ListItem from "@mui/material/ListItem";
import { styled } from "@mui/material/styles";

export const HeaderRow = styled(ListItem)`
  background: ${({ theme }) => theme.palette.background.default};
  border-radius: ${(p) => 2 * p.theme.shape.borderRadius}px;
  padding: ${(p) => p.theme.spacing(2)};
  padding-top: 24px;
  box-shadow: ${({ theme }) => theme.shadows[1]};
`;

export const Columns = styled(Grid)`
  text-align: left;
`;

export const Column = styled(Grid)`
  font-weight: 500;
  flex-direction: row;
  display: flex;
  font-size: 15px;
`;

export const ColumnInner = styled(Box)`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-weight: 600;
`;

export const Row = styled(ListItem)`
  background: ${({ theme }) => theme.palette.background.default};
  border-radius: ${(p) => p.theme.shape.borderRadius}px;
  cursor: pointer;
  font-size: 15px;
  padding: ${(p) => p.theme.spacing(2)};
  box-shadow: ${({ theme }) => theme.shadows[1]};

  & + & {
    margin-top: ${(p) => p.theme.spacing(2)};
  }
`;

export const RowCells = styled(Grid)`
  align-items: center;
  min-width: 60px;
`;

export const RowCell = styled(Grid)`
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
