import { Button, Checkbox, TableCell, TableRow } from "@mui/material";
import { useState } from "react";
import { HolderAddress, TokenData } from "../types/types";
import { apiKeyEtherscan } from "../constants/api";
import {
  getLastTransactionEtherscan,
  getTokenData,
} from "../api/services/thirdParty";
import { addToWatchlist } from "../api/services/backend";

type ScanResponse = {
  tokenSymbol: string;
  value: number;
  timeStamp: number;
};

interface TableRowCheckboxProps {
  holder: HolderAddress;
  index: number;
  selectedChain: string;
  inputValue: string;
  tokenData: TokenData | null | undefined;
}
const TableRowCheckbox = ({
  holder,
  index,
  selectedChain,
  inputValue,
  tokenData,
}: TableRowCheckboxProps) => {
  const handleAddToWatchlist = async () => {
    try {
      const lastTransaction = await getLastTransactionEtherscan(
        inputValue,
        holder.wallet_address
      );
      console.log("lastTransaction.value", lastTransaction.value);
      if (tokenData) {
        await addToWatchlist(
          holder.wallet_address,
          lastTransaction.tokenSymbol,
          lastTransaction.value,
          lastTransaction.timeStamp,
          tokenData?.decimals
        );
      }
    } catch (error) {
      console.log("Some error", error);
    }
  };

  return (
    <TableRow
      key={holder.wallet_address}
      sx={{
        backgroundColor: "secondary",
        borderRadius: "10px",
      }}
    >
      <TableCell scope="row">{index + 1}</TableCell>
      <TableCell scope="row">{holder.wallet_address}</TableCell>
      <TableCell align="right">
        {Math.trunc(holder.amount).toLocaleString("fi-FI")}
      </TableCell>
      <TableCell align="right">
        ${Math.trunc(holder.usd_value).toLocaleString("fi-FI")}
      </TableCell>
      <TableCell align="right">
        <Button onClick={handleAddToWatchlist}>Add</Button>
      </TableCell>
    </TableRow>
  );
};

export default TableRowCheckbox;
