// import dependencies
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Theme,
  Checkbox,
} from "@mui/material";
import { HolderAddress, TokenData } from "../types/types";
import { useState } from "react";
import TableRowCheckbox from "./TableRowCheckbox";

interface HoldersTableProps {
  holders: HolderAddress[];
  selectedChain: string;
  inputValue: string;
  tokenData: TokenData | null | undefined;
}

const HoldersTable = ({
  holders,
  selectedChain,
  inputValue,
  tokenData,
}: HoldersTableProps) => {
  return (
    <TableContainer
      sx={{ minWidth: 650, borderRadius: "25px" }}
      component={Paper}
      elevation={0}
    >
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ color: "whitesmoke", fontSize: 18, width: 20 }}>
              Number
            </TableCell>
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
            holders.map((holder: HolderAddress, index) => (
              <TableRowCheckbox
                key={holder.wallet_address}
                index={index}
                holder={holder}
                selectedChain={selectedChain}
                inputValue={inputValue}
                tokenData={tokenData}
              />
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default HoldersTable;
