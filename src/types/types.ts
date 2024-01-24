export type HolderAddress = {
  amount: number;
  usd_value: number;
  wallet_address: string;
};

export type TokenData = {
  current_usd_price: number;
  name: string;
  symbol: string;
  total_supply: string;
  logos: Logo[];
};

export type Logo = {
  height: number;
  uri: string;
  width: number;
};

export type WatchlistAddress = {
  address: string;
  time: number;
  token: string;
  value: number;
};
