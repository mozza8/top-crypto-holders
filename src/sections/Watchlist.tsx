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
import { WatchlistAddress } from "../types/types";
import TableRowWatchlist from "./TableRowWatchlist";

interface WatchlistProps {
  holders: WatchlistAddress[];
  getWallets: () => void;
}

const Watchlist = ({ holders, getWallets }: WatchlistProps) => {
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
              Token
            </TableCell>
            <TableCell sx={{ color: "whitesmoke", fontSize: 18 }} align="right">
              Amount transacted
            </TableCell>
            <TableCell sx={{ color: "whitesmoke", fontSize: 18 }} align="right">
              Time
            </TableCell>
            <TableCell sx={{ color: "whitesmoke", fontSize: 18 }} align="right">
              Remove from watchlist
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {holders &&
            holders.map((holder) => (
              <TableRowWatchlist
                key={holder.address}
                holder={holder}
                getWallets={getWallets}
              ></TableRowWatchlist>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Watchlist;
