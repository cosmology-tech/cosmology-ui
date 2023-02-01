import { IconType } from 'react-icons';

export enum WalletStatus {
  Disconnected = 'Disconnected',
  Connecting = 'Connecting',
  Connected = 'Connected',
  NotExist = 'NotExist',
  Rejected = 'Rejected',
  Error = 'Error'
}

export type DownloadInfo = {
  browser?: string;
  os?: string;
  icon?: IconType;
  link: string;
};
