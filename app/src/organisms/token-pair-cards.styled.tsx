import { styled } from "@mui/material/styles";
import TableContainer from "@mui/material/TableContainer";
import TableCell from "@mui/material/TableCell";
import Box from "@mui/material/Box";
import TableHead from "@mui/material/TableHead";

export const TableRoot = styled(TableContainer)`
  background: none;
  padding: 0.5rem;
`;

export const HeaderCover = styled(Box)`
  max-width: 100vw;
  box-shadow: 5px 5px 7px rgba(9, 9, 14, 0.3),
    -5px -5px 7px rgba(87, 87, 87, 0.1);
  border-radius: 0.8rem;
  margin-bottom: 15px;
`;

export const TableCellBox = styled(TableCell)`
  border: none;
  padding: 0.7rem;
`;

export const TableHeadBox = styled(TableHead)`
  //   max-width: 100vw;
`;
