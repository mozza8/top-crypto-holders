import { Box, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import Watchlist from "./Watchlist";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { theme } from "../theme/theme";
import HoldersTable from "./HoldersTable";
import { HolderAddress, TokenData } from "../types/types";
import { getWatchlist } from "../api/services/backend";

interface DisplaySectionProps {
  holders: HolderAddress[];
  selectedChain: string;
  tokenData: TokenData | null | undefined;
  inputValue: string;
}

const DisplaySection = ({
  holders,
  selectedChain,
  inputValue,
  tokenData,
}: DisplaySectionProps) => {
  const [value, setValue] = useState("1");
  const [watchlistAddresses, setWatchlistAddresses] = useState([]);

  const changeTable = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const handleWatchlist = async () => {
    try {
      const watchlistData = await getWatchlist();
      setWatchlistAddresses(watchlistData);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <Box
      sx={{
        mt: 10,
        width: "1200px",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <TabContext value={value}>
        <TabList onChange={changeTable} aria-label="basic tabs example">
          <Tab key="Tab one" label="Holders" value="1" />
          <Tab
            key="Tab two"
            onClick={handleWatchlist}
            label="Watchlist"
            value="2"
          />
        </TabList>
        <TabPanel value="1">
          <HoldersTable
            holders={holders}
            selectedChain={selectedChain}
            inputValue={inputValue}
            tokenData={tokenData}
          />
        </TabPanel>
        <TabPanel value="2">
          <Watchlist
            holders={watchlistAddresses}
            handleWatchlist={handleWatchlist}
          />
        </TabPanel>
      </TabContext>
    </Box>
  );
};

export default DisplaySection;
