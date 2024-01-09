import {
  Box,
  FormControl,
  Grid,
  Input,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { chainsIds } from "./constants/chains";
import HoldersTable from "./sections/HoldersTable";

type HolderAddress = {
  amount: number;
  usd_value: number;
  wallet_address: string;
};

function App() {
  const [selectedChain, setSelectedChain] = useState("1");
  const [selectedToken, setSelectedToken] = useState(
    "0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0"
  );
  const [tokenHolders, setTokenHolders] = useState<HolderAddress[]>([]);

  const handleChainChange = (event: SelectChangeEvent) => {
    setSelectedChain(event.target.value);
  };

  const handleAddress = (event: any) => {
    setSelectedToken(event.target.value);
  };

  fetch(
    `https://api.chainbase.online/v1/token/top-holders?chain_id=${selectedChain}&contract_address=${selectedToken}&page=1&limit=100`,
    {
      method: "GET",
      headers: {
        "x-api-key": "2ajP2MBTYZlQA7f6RSXWc6Pk1gU", // Replace the field with your API key.
        accept: "application/json",
      },
    }
  )
    .then((response) => response.json())

    .then((data) => setTokenHolders(data.data))

    .catch((error) => console.error(error));

  // console.log(data);

  return (
    <>
      <Grid container sx={{ mt: 10 }}>
        <Grid item md={2}></Grid>
        <Grid item md={3}>
          <Stack direction={"column"} spacing={2}>
            <Typography>Choose chain:</Typography>
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
                {/* map through list of chains */}
                {/* <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem> */}
              </Select>
            </FormControl>
          </Stack>
        </Grid>
        <Grid item md={3}></Grid>
        <Grid item md={3}>
          <Stack direction={"column"} spacing={2}>
            <Typography>Paste address</Typography>
            <FormControl fullWidth sx={{ m: 1 }} variant="standard">
              <Input id="standard-adornment-amount" onChange={handleAddress} />
            </FormControl>
          </Stack>
        </Grid>
        <Grid item md={2}></Grid>
      </Grid>
      <Box
        sx={{
          ml: 20,
          mt: 10,
          width: "1500px",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <HoldersTable holders={tokenHolders} />
      </Box>
    </>
  );
}

export default App;
