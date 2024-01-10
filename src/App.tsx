import {
  Box,
  FormControl,
  Grid,
  IconButton,
  Input,
  InputAdornment,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";

// import components
import HoldersTable from "./sections/HoldersTable";

// import constants
import { chainsIds } from "./constants/chains";

type HolderAddress = {
  amount: number;
  usd_value: number;
  wallet_address: string;
};

function App() {
  const [selectedChain, setSelectedChain] = useState("1");
  const [inputValue, setInputValue] = useState("");
  const [tokenHolders, setTokenHolders] = useState<HolderAddress[]>([]);

  const handleChainChange = (event: SelectChangeEvent) => {
    setSelectedChain(event.target.value);
  };

  const handleAddress = (event: any) => {
    setInputValue(event.target.value);
  };

  const sendTokenToApi = () => {
    fetch(
      `https://api.chainbase.online/v1/token/top-holders?chain_id=${selectedChain}&contract_address=${inputValue}&page=1&limit=100`,
      {
        method: "GET",
        headers: {
          "x-api-key": "2ajP2MBTYZlQA7f6RSXWc6Pk1gU",
          accept: "application/json",
        },
      }
    )
      .then((response) => response.json())

      .then((data) => setTokenHolders(data.data))

      .catch((error) => console.error(error));
  };

  return (
    <>
      <Grid container sx={{ mt: 10 }}>
        <Stack
          sx={{ width: "200vh" }}
          direction={"row"}
          justifyContent={"space-around"}
        >
          <Stack direction={"column"} spacing={2}>
            <Typography variant="h6">Choose chain:</Typography>
            <FormControl fullWidth>
              <Select
                labelId="chose-chain"
                value={selectedChain}
                onChange={handleChainChange}
                sx={{ width: "160px", borderRadius: "25px" }}
              >
                {chainsIds.map((item) => (
                  <MenuItem key={`chain-id-${item.id}`} value={item.id}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>

          <Stack direction={"column"} spacing={2} sx={{ width: "45vh" }}>
            <Typography variant="h6">Paste address</Typography>
            <FormControl fullWidth sx={{ m: 1 }} variant="filled">
              <Input
                id="standard-adornment-amount"
                fullWidth
                onChange={handleAddress}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={sendTokenToApi}
                    >
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
          </Stack>
        </Stack>
      </Grid>
      <Grid container sx={{ justifyContent: "center", alignItems: "center" }}>
        <Box
          sx={{
            mt: 10,
            width: "1200px",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <HoldersTable holders={tokenHolders} />
        </Box>
      </Grid>
    </>
  );
}

export default App;
