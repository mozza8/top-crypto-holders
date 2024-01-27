import { Button, Checkbox, TableCell, TableRow } from "@mui/material";
import { useState } from "react";
import { HolderAddress, TokenData, WatchlistAddress } from "../types/types";
import { getWatchlist, removeFromWatchlist } from "../api/services/backend";

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

  console.log("holder value", holder.value);
  return (
    <TableRow
      key={holder.address}
      sx={{
        backgroundColor: "secondary",
        borderRadius: "10px",
      }}
    >
      <TableCell scope="row">{holder.address}</TableCell>
      <TableCell scope="row">{holder.token}</TableCell>
      <TableCell align="right">
        {holder.value.toString().slice(0, -holder.decimals)}
      </TableCell>
      <TableCell align="right">{toDate(holder.time)}</TableCell>
      <TableCell align="right">
        <Button onClick={handleRemoveFromWatchlist}>Remove</Button>
      </TableCell>
    </TableRow>
  );
};

export default TableRowWatchlist;
