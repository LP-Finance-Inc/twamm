import { styled } from "@mui/material/styles";
import TableContainer from "@mui/material/TableContainer";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import Table from "@mui/material/Table";

export const TableRoot = styled(TableContainer)`
  border-collapse: separate;
  border-spacing: 0 1em;
  padding: 0 0.3rem;
`;

export const TableBodyMain = styled(Table)`
  border-collapse: separate;
  border-spacing: 0 1em;
`;

export const TableCellBox = styled(TableCell)`
  border: none;
  padding: 0.9rem 1rem;
  font-size: 0.85rem;
  font-weight: 600;
`;

export const TableHeadBox = styled(TableHead)`
  max-width: 100vw;
  box-shadow: 5px 5px 7px rgba(9, 9, 14, 0.3),
    -5px -5px 7px rgba(87, 87, 87, 0.1);
  border-radius: 0.8rem;
  margin-bottom: 15px;
`;

export const TableRowBox = styled(TableRow)`
  margin: 1rem;
`;

export const TableBodyCover = styled(TableBody)`
  margin-top: 1rem;
`;
