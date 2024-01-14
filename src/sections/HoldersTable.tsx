import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Theme,
} from "@mui/material";

interface HolderAddress {
  amount: number;
  usd_value: number;
  wallet_address: string | number;
}

interface HoldersTableProps {
  holders: HolderAddress[];
  theme: Theme;
}

const HoldersTable = ({ holders, theme }: HoldersTableProps) => {
  return (
    <TableContainer
      sx={{ minWidth: 650, borderRadius: "25px" }}
      component={Paper}
      elevation={0}
    >
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ color: "whitesmoke", fontSize: 18 }}>
              Address
            </TableCell>
            <TableCell sx={{ color: "whitesmoke", fontSize: 18 }} align="right">
              Token Amount
            </TableCell>
            <TableCell sx={{ color: "whitesmoke", fontSize: 18 }} align="right">
              Usd value
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {holders &&
            holders.map((holder) => (
              <TableRow
                key={holder.wallet_address}
                sx={{
                  backgroundColor: "secondary",
                  borderRadius: "10px",
                }}
              >
                <TableCell component="th" scope="row">
                  {holder.wallet_address}
                </TableCell>
                <TableCell align="right">
                  {Math.trunc(holder.amount).toLocaleString("fi-FI")}
                </TableCell>
                <TableCell align="right">
                  ${Math.trunc(holder.usd_value).toLocaleString("fi-FI")}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default HoldersTable;
