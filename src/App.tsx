import {
  Box,
  FormControl,
  GlobalStyles,
  Grid,
  IconButton,
  Input,
  InputAdornment,
  ListItemIcon,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

// import components
import HoldersTable from "./sections/HoldersTable";

// import constants
import { chainsIds } from "./constants/chains";
import { apiKey } from "./constants/api";

// import types
import { HolderAddress, TokenData } from "./types/types";
import { theme } from "./theme/theme";
import { blue } from "@mui/material/colors";

function App() {
  const [selectedChain, setSelectedChain] = useState("1");
  const [inputValue, setInputValue] = useState("");
  const [tokenHolders, setTokenHolders] = useState<HolderAddress[]>([]);
  const [tokenData, setTokenData] = useState<TokenData | null>();

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
          "x-api-key": apiKey,
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
          "x-api-key": apiKey,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => setTokenData(data.data))
      .catch((error) => console.error(error));
  };
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline enableColorScheme />
      <GlobalStyles
        styles={{
          body: { backgroundColor: "background.default" },
        }}
      />
      <Grid
        container
        justifyContent={"center"}
        alignItems={"center"}
        marginTop={2}
      >
        <Typography variant="h4" color="primary">
          TOP TOKEN HOLDERS
        </Typography>
      </Grid>
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
      <Grid
        container
        sx={{ justifyContent: "center", alignItems: "center", mt: 3 }}
      >
        <Stack
          direction={"column"}
          spacing={2}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Typography variant="h6">
            Token:{" "}
            {tokenData && (
              <img height={16} width={16} src={tokenData?.logos[0].uri} />
            )}{" "}
            {tokenData?.symbol}
          </Typography>

          <Box
            sx={{
              mt: 10,
              width: "1200px",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <HoldersTable holders={tokenHolders} theme={theme} />
          </Box>
        </Stack>
      </Grid>
    </ThemeProvider>
  );
}

export default App;
