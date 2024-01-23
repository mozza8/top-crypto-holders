// import dependencies
import { useState } from "react";
import {
  Grid,
  Stack,
  Typography,
  FormControl,
  Select,
  MenuItem,
  Input,
  InputAdornment,
  IconButton,
  SelectChangeEvent,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

// import constants
import { chainsIds } from "../constants/chains";
import { apiKeyChainbase } from "../constants/api";

// import types
import { HolderAddress, TokenData } from "../types/types";

interface InputProps {
  setTokenHolders: React.Dispatch<React.SetStateAction<HolderAddress[]>>;
  setTokenData: React.Dispatch<
    React.SetStateAction<TokenData | null | undefined>
  >;
  setSelectedChain: React.Dispatch<React.SetStateAction<string>>;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  selectedChain: string;
  inputValue: string;
}

const Inputs = ({
  setTokenHolders,
  setTokenData,
  setSelectedChain,
  setInputValue,
  selectedChain,
  inputValue,
}: InputProps) => {
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
          "x-api-key": apiKeyChainbase,
          accept: "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => setTokenHolders(data.data))
      .catch((error) => console.error(error));

    fetch(
      `https://api.chainbase.online/v1/token/metadata?chain_id=${selectedChain}&contract_address=${inputValue}`,
      {
        method: "GET",
        headers: {
          "x-api-key": apiKeyChainbase,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => setTokenData(data.data))
      .catch((error) => console.error(error));
  };

  return (
    <Grid container sx={{ mt: 5 }}>
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
              sx={{ width: "190px", height: 40, borderRadius: "25px", pl: 2 }}
              color="primary"
            >
              {chainsIds.map((item) => (
                <MenuItem key={`chain-id-${item.id}`} value={item.id}>
                  {/* <img
                      height={10}
                      width={10}
                      src={item.logo}
                      alt={item.name}
                    /> */}

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
                    color="secondary"
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
  );
};

export default Inputs;
