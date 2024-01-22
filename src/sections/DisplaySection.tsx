import { Box, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import Watchlist from "./Watchlist";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { theme } from "../theme/theme";
import HoldersTable from "./HoldersTable";
import { HolderAddress } from "../types/types";

interface DisplaySectionProps {
  holders: HolderAddress[];
}

const DisplaySection = ({ holders }: DisplaySectionProps) => {
  const [value, setValue] = useState("1");
  const [watchlistAddresses, setWatchlistAddresses] = useState([]);

  const changeTable = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const getWallets = () => {
    fetch(`http://localhost:5000/get-wallets`, {
      method: "GET",
      headers: {
        accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => setWatchlistAddresses(data))
      .catch((error) => console.error(error));
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
          <Tab key="Tab two" onClick={getWallets} label="Watchlist" value="2" />
        </TabList>
        <TabPanel value="1">
          {holders.length ? <HoldersTable holders={holders} /> : null}
        </TabPanel>
        <TabPanel value="2">
          <Watchlist holders={watchlistAddresses} />
        </TabPanel>
      </TabContext>
    </Box>
  );
};

export default DisplaySection;
