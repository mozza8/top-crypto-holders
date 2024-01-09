import {
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

function App() {
  const [selectedChain, setSelectedChain] = useState("Ethereum");

  const handleChainChange = (event: SelectChangeEvent) => {
    setSelectedChain(event.target.value);
  };

  return (
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
              {/* map through list of chains */}
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </Stack>
      </Grid>
      <Grid item md={3}></Grid>
      <Grid item md={3}>
        <Stack direction={"column"} spacing={2}>
          <Typography>Paste address</Typography>
          <FormControl fullWidth sx={{ m: 1 }} variant="standard">
            <Input id="standard-adornment-amount" />
          </FormControl>
        </Stack>
      </Grid>
      <Grid item md={2}></Grid>
    </Grid>
  );
}

export default App;
