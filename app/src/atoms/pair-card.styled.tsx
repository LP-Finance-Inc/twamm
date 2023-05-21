import Skeleton from "@mui/material/Skeleton";
import { styled } from "@mui/material/styles";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

const styledSkeleton = styled(Skeleton);

export const FundSkeleton = styledSkeleton`
  border-radius: 20px;
  width: 100%;
  height: 100%;
  background: linear-gradient(110.5deg, rgba(26, 31, 46, 0.4) 3.75%, rgba(36, 41, 57, 0.4) 117.62%);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 4px 4px 6px rgba(9, 9, 14, 0.4),
    -4px -4px 6px rgba(87, 87, 87, 0.1);
`;

export const TableRowBox = styled(TableRow)`
  box-shadow: 3px 3px 5px rgba(9, 9, 14, 0.4),
    -3px -3px 5px rgba(87, 87, 87, 0.1);
  border-radius: 0.8rem;
`;

export const TableCellBox = styled(TableCell)`
  border: none;
  padding: 0.8rem 1rem;
`;

export const TableCellBoxPyth = styled(TableCell)`
  border: none;
  padding: 0.8rem 1rem;
  color: #bf00ff;
`;
