// import dependencies
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Checkbox,
} from "@mui/material";
import { HolderAddress } from "../types/types";

interface WatchlistProps {
  holders: HolderAddress[];
}

const Watchlist = ({ holders }: WatchlistProps) => {
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
            <TableCell sx={{ color: "whitesmoke", fontSize: 18 }} align="right">
              Add to watchlist
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
                <TableCell align="right">
                  <Checkbox
                  // checked={checked}
                  // onChange={handleWatchlistClick}
                  // inputProps={{ "aria-label": "controlled" }}
                  />
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Watchlist;
