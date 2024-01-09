import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";

interface HolderAddress {
  amount: number;
  usd_value: number;
  wallet_address: string | number;
}

interface HoldersTableProps {
  holders: HolderAddress[];
}

const HoldersTable = ({ holders }: HoldersTableProps) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Address</TableCell>
            <TableCell align="right">Token Amount</TableCell>
            <TableCell align="right">Usd value</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {holders.map((holder) => (
            <TableRow
              key={holder.wallet_address}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {holder.wallet_address}
              </TableCell>
              <TableCell align="right">{Math.trunc(holder.amount)}</TableCell>
              <TableCell align="right">
                ${Math.trunc(holder.usd_value)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default HoldersTable;
