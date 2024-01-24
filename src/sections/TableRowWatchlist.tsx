import { Button, Checkbox, TableCell, TableRow } from "@mui/material";
import { useState } from "react";
import { HolderAddress, WatchlistAddress } from "../types/types";

interface TableRowWatchlistProps {
  holder: WatchlistAddress;
  getWallets: () => void;
}
const TableRowWatchlist = ({ holder, getWallets }: TableRowWatchlistProps) => {
  const removeFromWatchlist = () => {
    fetch(
      `http://localhost:5000/remove-wallet-address?address=${holder.address}`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));

    getWallets();
  };

  const toDate = (timestamp: any) => {
    const date = new Date(timestamp * 1000);
    const stringDate = date.toDateString();
    return stringDate;
  };

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
        {holder.value.toString().slice(0, -18)}
      </TableCell>
      <TableCell align="right">{toDate(holder.time)}</TableCell>
      <TableCell align="right">
        <Button onClick={removeFromWatchlist}>Remove</Button>
      </TableCell>
    </TableRow>
  );
};

export default TableRowWatchlist;
