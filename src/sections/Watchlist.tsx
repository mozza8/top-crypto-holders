// import dependencies
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";

// import components
import TableRowWatchlist from "./TableRowWatchlist";

// import types
import { WatchlistAddress } from "../types/types";

interface WatchlistProps {
  holders: WatchlistAddress[];
  handleWatchlist: () => Promise<void>;
}

const Watchlist = ({ holders, handleWatchlist }: WatchlistProps) => {
  return (
    <TableContainer
      sx={{ minWidth: "1020px", borderRadius: "25px" }}
      component={Paper}
      elevation={1}
    >
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell
              sx={{ color: "whitesmoke", fontSize: 18, width: "440px" }}
              align="left"
            >
              Address
            </TableCell>
            <TableCell
              sx={{ color: "whitesmoke", fontSize: 18, width: "110px" }}
              align="left"
            >
              Token
            </TableCell>
            <TableCell
              sx={{ color: "whitesmoke", fontSize: 18, width: "185px" }}
              align="left"
            >
              Blockchain
            </TableCell>
            <TableCell
              sx={{ color: "whitesmoke", fontSize: 18, width: "240px" }}
              align="left"
            >
              Amount transacted
            </TableCell>
            <TableCell
              sx={{ color: "whitesmoke", fontSize: 18, width: "155px" }}
              align="left"
            >
              Time
            </TableCell>
            <TableCell
              sx={{ color: "whitesmoke", fontSize: 18, width: "290px" }}
              align="right"
            >
              Remove from watchlist
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {holders &&
            holders.map(
              (holder) =>
                holder.amount_transacted && (
                  <TableRowWatchlist
                    key={holder.address}
                    holder={holder}
                    handleWatchlist={handleWatchlist}
                  ></TableRowWatchlist>
                )
            )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Watchlist;
