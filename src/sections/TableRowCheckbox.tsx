import { Checkbox, TableCell, TableRow } from "@mui/material";
import { useState } from "react";
import { HolderAddress } from "../types/types";

interface TableRowCheckboxProps {
  holder: HolderAddress;
}
const TableRowCheckbox = ({ holder }: TableRowCheckboxProps) => {
  const [isChecked, setChecked] = useState(false);

  const handleCheckboxChange = () => {
    if (isChecked) {
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
    } else {
      fetch(
        `http://localhost:5000/add-wallet-address?address=${holder.wallet_address}`,
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
    }
    setChecked(!isChecked);
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
        <Checkbox
          checked={isChecked}
          onChange={handleCheckboxChange}
          key={holder.wallet_address}
          // inputProps={{ "aria-label": "controlled" }}
        />
      </TableCell>
    </TableRow>
  );
};

export default TableRowCheckbox;
