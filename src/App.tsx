import { Box, Grid, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";

// import components
import HoldersTable from "./sections/HoldersTable";

// import constants

// import types
import { HolderAddress, TokenData } from "./types/types";
import { theme } from "./theme/theme";
import Inputs from "./sections/Inputs";

function App() {
  const [tokenHolders, setTokenHolders] = useState<HolderAddress[]>([]);
  const [tokenData, setTokenData] = useState<TokenData | null>();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline enableColorScheme />
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
      <Inputs setTokenHolders={setTokenHolders} setTokenData={setTokenData} />
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
            {tokenHolders.length ? (
              <HoldersTable holders={tokenHolders} theme={theme} />
            ) : null}
          </Box>
        </Stack>
      </Grid>
    </ThemeProvider>
  );
}

export default App;
