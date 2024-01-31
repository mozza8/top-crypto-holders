import { Button, TableCell, TableRow, Typography } from "@mui/material";
import { WatchlistAddress } from "../types/types";
import { removeFromWatchlist } from "../api/services/backend";

interface TableRowWatchlistProps {
  holder: WatchlistAddress;
  handleWatchlist: () => Promise<void>;
}
const TableRowWatchlist = ({
  holder,
  handleWatchlist,
}: TableRowWatchlistProps) => {
  const handleRemoveFromWatchlist = async () => {
    try {
      await removeFromWatchlist(holder.address);
    } catch (error) {
      console.log("Error handling remove:", error);
    }
    handleWatchlist();
  };

  const toDate = (timestamp: any) => {
    const date = new Date(timestamp * 1000);
    const stringDate = date.toDateString();
    return stringDate.slice(4);
  };

  console.log("holder.amount_transacted", holder.amount_transacted);

  return (
    <TableRow
      key={holder.address}
      sx={{
        backgroundColor: "secondary",
        borderRadius: "10px",
      }}
    >
      <TableCell align="left">
        <Typography variant="body1">{holder.address}</Typography>
      </TableCell>
      <TableCell align="left">
        <Typography variant="body1">{holder.token}</Typography>
      </TableCell>
      <TableCell align="left">
        <Typography variant="body1">{holder.blockchain}</Typography>
      </TableCell>
      <TableCell align="left">
        <Typography variant="body1">
          {holder.amount_transacted.toString().slice(0, -holder.decimals)}
        </Typography>
      </TableCell>
      <TableCell align="left">
        <Typography variant="body1">{toDate(holder.time)}</Typography>
      </TableCell>
      <TableCell align="right">
        <Typography variant="body1">
          <Button onClick={handleRemoveFromWatchlist}>Remove</Button>
        </Typography>
      </TableCell>
    </TableRow>
  );
};

export default TableRowWatchlist;
