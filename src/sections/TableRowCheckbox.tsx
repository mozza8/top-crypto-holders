import { Button, Checkbox, TableCell, TableRow } from "@mui/material";
import { useState } from "react";
import { HolderAddress } from "../types/types";
import { apiKeyEtherscan } from "../constants/api";

type ScanResponse = {
  tokenSymbol: string;
  value: number;
  timeStamp: number;
};

interface TableRowCheckboxProps {
  holder: HolderAddress;
  selectedChain: string;
  inputValue: string;
}
const TableRowCheckbox = ({
  holder,
  selectedChain,
  inputValue,
}: TableRowCheckboxProps) => {
  const [addressChainResult, setAddressChainResult] =
    useState<ScanResponse | null>(null);

  const addToWatchlist = () => {
    fetch(
      `https://api.etherscan.io/api?module=account&action=tokentx&contractaddress=${inputValue}&address=${holder.wallet_address}&page=1&offset=1&startblock=0&endblock=27025780&sort=desc&apikey=${apiKeyEtherscan}
      `,
      {
        method: "GET",
        headers: {
          accept: "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setAddressChainResult(data.result[0]);
        console.log("data", data);
        fetch(
          `http://localhost:5000/add-wallet-address?address=${holder.wallet_address}&token=${data.result[0].tokenSymbol}&value=${data.result[0].value}&time=${data.result[0].timeStamp}`,

          {
            method: "GET",
            headers: {
              accept: "application/json",
            },
          }
        )
          .then((response) => {
            console.log("Raw response", response);
            response.json();
          })
          .then((data) => console.log(data))
          .catch((error) => console.error(error));
      })
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
        <Button onClick={addToWatchlist}>Add</Button>
      </TableCell>
    </TableRow>
  );
};

export default TableRowCheckbox;
