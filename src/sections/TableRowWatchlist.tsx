import { Button, Checkbox, TableCell, TableRow } from "@mui/material";
import { useState } from "react";
import { HolderAddress } from "../types/types";

interface TableRowWatchlistProps {
  holder: HolderAddress;
}
const TableRowWatchlist = ({ holder }: TableRowWatchlistProps) => {
  const removeFromWatchlist = () => {
    fetch(
      `http://localhost:5000/remove-wallet-address?address=${holder.wallet_address}`,
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
  };

  return (
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
        <Button onClick={removeFromWatchlist}>Remove</Button>
      </TableCell>
    </TableRow>
  );
};

export default TableRowWatchlist;
