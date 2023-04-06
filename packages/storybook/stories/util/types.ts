export type ChainListType = {
  chainName: string;
  label: string;
  value: string;
  symbol: string;
  icon?: {
    png?: string;
    jpeg?: string;
    svg?: string;
  };
  ibc?: {
    source_channel?: string;
    source_denom?: string;
    dst_channel?: string;
  };
  address: string;
  denom: string;
  amount: string;
  dollarValue: string;
};

export type UserDeviceInfoType = {
  browser: string;
  device: string;
  os: string;
};