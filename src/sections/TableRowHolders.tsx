// import dependecies
import { Button, TableCell, TableRow, Typography } from "@mui/material";
import { useSnackbar } from "notistack";

// import services
import {
  getLastTransactionBscScan,
  getLastTransactionEtherscan,
} from "../api/services/thirdParty";
import { addToWatchlist } from "../api/services/backend";

// import types
import { HolderAddress, TokenData } from "../types/types";

interface TableRowHoldersProps {
  holder: HolderAddress;
  index: number;
  selectedChain: string;
  inputValue: string;
  tokenData: TokenData | null | undefined;
  setLocalWatchlistAddresses: React.Dispatch<React.SetStateAction<string[]>>;
  localWatchlistAddresses: string[];
  handleWatchlist: () => Promise<void>;
}
const TableRowHolders = ({
  holder,
  index,
  selectedChain,
  inputValue,
  tokenData,
  localWatchlistAddresses,
  handleWatchlist,
}: TableRowHoldersProps) => {
  const { enqueueSnackbar } = useSnackbar();
  const handleAddToWatchlist = async () => {
    if (localWatchlistAddresses.includes(holder.wallet_address)) {
      enqueueSnackbar("Address is already on watchlist!", { variant: "error" });
    } else {
      switch (selectedChain) {
        case "1":
          try {
            const lastTransaction = await getLastTransactionEtherscan(
              inputValue,
              holder.wallet_address
            );
            if (tokenData) {
              await addToWatchlist(
                holder.wallet_address,
                lastTransaction.tokenSymbol,
                lastTransaction.value,
                lastTransaction.timeStamp,
                tokenData?.decimals,
                "Ethereum"
              );
              handleWatchlist();
              enqueueSnackbar("Address added!", { variant: "success" });
            }
          } catch (error) {}
          break;

        case "56":
          try {
            const lastTransaction = await getLastTransactionBscScan(
              inputValue,
              holder.wallet_address
            );
            if (tokenData) {
              await addToWatchlist(
                holder.wallet_address,
                lastTransaction.tokenSymbol,
                lastTransaction.value,
                lastTransaction.timeStamp,
                tokenData?.decimals,
                "Binance Smart Chain"
              );
              handleWatchlist();
              enqueueSnackbar("Address added!", { variant: "success" });
            }
          } catch (error) {}
          break;
      }
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
      <TableCell align="left">
        <Typography variant="body1"> {index + 1}</Typography>
      </TableCell>
      <TableCell align="left">
        <Typography variant="body1">{holder.wallet_address}</Typography>
      </TableCell>
      <TableCell align="left">
        <Typography variant="body1">
          {Math.trunc(holder.amount).toLocaleString("fi-FI")}
        </Typography>
      </TableCell>
      <TableCell align="left">
        <Typography variant="body1">
          ${Math.trunc(holder.usd_value).toLocaleString("fi-FI")}
        </Typography>
      </TableCell>
      <TableCell align="right">
        <Typography variant="body1">
          <Button color={"primary"} onClick={handleAddToWatchlist}>
            Add
          </Button>
        </Typography>
      </TableCell>
    </TableRow>
  );
};

export default TableRowHolders;
