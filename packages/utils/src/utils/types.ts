import { OptionBase } from 'chakra-react-select';
import React, { MouseEventHandler, ReactNode, RefObject } from 'react';
import { IconType } from 'react-icons';

/* ====================================================== */
/*                      default type                      */
/* ====================================================== */
export enum WalletStatus {
  Disconnected = 'Disconnected',
  Connecting = 'Connecting',
  Connected = 'Connected',
  NotExist = 'NotExist',
  Rejected = 'Rejected',
  Error = 'Error'
}

/* ====================================================== */
/*                  Connect Wallet Button                 */
/* ====================================================== */
export type ConnectWalletType = {
  /**
   * Text to display for button.
   *
   * If in need, set false to unset default string.
   */
  buttonText?: string | false;
  /**
   * Button display spinning indicator.
   */
  loading?: boolean;
  /**
   * Button display disabled.
   */
  disabled?: boolean;
  /**
   * Props JSX.Element to custom icon.
   */
  leftIcon?: React.ReactNode | false;
  /**
   * Props JSX.Element to custom icon.
   */
  rightIcon?: React.ReactNode;
  /**
   * A function called to handle connect.
   */
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

/* ====================================================== */
/*                   Copy Address Button                  */
/* ====================================================== */
export type CopyAddressType = {
  /**
   * Text to display for address.
   */
  address?: string;
  /**
   * Button display loading.
   */
  loading?: boolean;
  /**
   * Button display disabled.
   */
  disabled?: boolean;
  /**
   * Set the max length of address.
   */
  maxDisplayLength?: number;
};

/* ====================================================== */
/*                  Change Chain Dropdown                 */
/* ====================================================== */
export interface DataType extends OptionBase {
  /**
   * Unique identifier for option.
   */
  chainName: string;
  /**
   * Text to display for option.
   */
  label: string;
  /**
   * Value of option.
   */
  value: string;
  /**
   * Icon display for option.
   */
  icon?: {
    png?: string;
    jpeg?: string;
    svg?: string;
  };
  /**
   * Disabled the option.
   */
  disabled?: boolean;
}

export type handleSelectChainDropdown = (value: DataType | null) => void;

export type ChangeChainMenuType = {
  /**
   * Data for options.
   */
  data: DataType[];
  /**
   * Selected value.
   */
  value?: DataType;
  /**
   * Dropdown display spinning indicator.
   */
  loading?: boolean;
  /**
   * Dropdown display disabled.
   */
  disabled?: boolean;
  /**
   * A function called to close modal.
   */
  onClose?: () => void;
  /**
   * A function called to handle select item.
   */
  onChange: handleSelectChainDropdown;
};

export type ChangeChainDropdownType = {
  /**
   * Data of options.
   *
   * <code>
   * DataType: {
   *
   *    chainName: string;
   *
   *    label: string;
   *
   *    value: string;
   *
   *    icon?: {
   *      png?: string;
   *      jpeg?: string;
   *      svg?: string;
   *    };
   *
   *    disabled?: boolean;
   *
   * }
   * </code><br /><br />
   */
  data: DataType[];
  /**
   * Selected item.
   *
   * <code>
   * DataType: {
   *
   *    chainName: string;
   *
   *    label: string;
   *
   *    value: string;
   *
   *    icon?: {
   *      png?: string;
   *      jpeg?: string;
   *      svg?: string;
   *    };
   *
   *    disabled?: boolean;
   *
   * }
   * </code><br /><br />
   */
  selectedItem?: DataType;
  /**
   * A function called to handle select item.
   *
   * <code>handleSelectChainDropdown: (value: DataType | null) => void</code><br /><br />
   */
  onChange: handleSelectChainDropdown;
  /**
   * Dropdown display loading.
   */
  loading?: boolean;
  /**
   * Dropdown display disabled.
   */
  disabled?: boolean;
};

/* ====================================================== */
/*                  Simple Connect Modal                  */
/* ====================================================== */
export enum LogoStatus {
  Loading = 'loading',
  Warning = 'warning',
  Error = 'error'
}

export type SimpleModalHeadType = {
  /**
   * Text to display for modal head.
   */
  title: string;
  /**
   * If is true, display the back button.
   */
  backButton: boolean;
  /**
   * A function called to handle modal content display.
   */
  onBack?: MouseEventHandler<HTMLButtonElement>;
  /**
   * A function called to handle modal close.
   */
  onClose: MouseEventHandler<HTMLButtonElement>;
};

export type SimpleConnectModalType = {
  /**
   * The ref of element to receive focus when the modal opens.
   * Props ref will set default focus on the list first button.
   * If is undefined will set focus on close button.
   */
  initialRef: RefObject<HTMLButtonElement>;
  /**
   * The component of modal head.
   */
  modalHead: ReactNode;
  /**
   * The component of modal content.
   */
  modalContent: ReactNode;
  /**
   * If true, the modal will be open.
   */
  modalOpen: boolean;
  /**
   * A function called to close modal.
   */
  modalOnClose: () => void;
};

export type DownloadWalletButtonType = {
  /**
   * Props react-icons item to a custom icon.
   */
  icon?: IconType;
  /**
   * Text to display for button.
   */
  buttonText?: string;
  /**
   * A function called to handle link wallet.
   */
  onClick?: () => void;
  /**
   * Button display disabled.
   */
  disabled: boolean;
};

export type ConnectModalContentType = {
  /**
   * Main logo on content.
   */
  logo?: string | IconType;
  /**
   * The border around logo.
   */
  status?: LogoStatus;
  /**
   * Connected user name.
   */
  username?: string;
  /**
   * Connected Wallet icon.
   */
  walletIcon?: string;
  /**
   * Bold text of the header.
   */
  contentHeader?: string;
  /**
   * Describe the status.
   */
  contentDesc?: string;
  /**
   * Props the <code>CopyAddressButton</code> component.
   */
  addressButton?: ReactNode;
  /**
   * Props the <code>ConnectWalletButton</code> component.
   */
  bottomButton?: ReactNode;
  /**
   * Props the link component.
   */
  bottomLink?: ReactNode;
};

export type QRCodeType = {
  /**
   * Link for connecting wallet from app.
   */
  link: string;
  /**
   * Descript how to connect wallet.
   */
  description?: string;
  /**
   * QRCode size. Default is 200px.
   */
  qrCodeSize?: number;
};

export enum WalletMode {
  Extension = 'extension',
  WalletConnect = 'wallet-connect'
}

export type DownloadInfo = {
  browser?: string;
  os?: string;
  icon?: IconType;
  link: string;
};

export type Downloads = {
  desktop: DownloadInfo[];
  tablet: DownloadInfo[];
  mobile: DownloadInfo[];
  default: string;
};

export enum ButtonShape {
  Square = 'Square',
  Rectangle = 'Rectangle'
}

export type Wallet = {
  /**
   * Wallet name.
   */
  name: string;
  /**
   * Display wallet name.
   */
  prettyName?: string;
  /**
   * Wallet icon.
   */
  logo?: string | IconType;
  /**
   * Display sub icon.
   */
  subLogo?: string | IconType;
  /**
   * Connect wallet by extension or wallet-connect.
   */
  mode: WalletMode;
  /**
   * Disabled button when on mobile or tablet.
   */
  mobileDisabled: boolean;
  /**
   * List button is displaying Square or Rectangle.
   * type: "Square" | "Rectangle"
   */
  buttonShape?: ButtonShape;
  /**
   * Description when rejected.
   */
  rejectMessage?: string;
  /**
   * Description when rejected.
   */
  downloads?: Downloads;
  /**
   * A function called to handle clicked button.
   */
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

export type DisplayWalletListType = {
  /**
   * The ref of element to receive focus when the modal opens.
   * Props ref will set default focus on the list first button.
   * If is undefined will set focus on close button.
   */
  initialFocus: RefObject<HTMLButtonElement>;
  /**
   * Array of wallet list.
   *
   * <code>
   * Wallet: {
   *
   *    name: string;
   *
   *    prettyName?: string;
   *
   *    logo?: string | IconType;
   *
   *    subLogo?: string | IconType;
   *
   *    mode: WalletMode;
   *
   *    mobileDisabled: boolean;
   *
   *    buttonShape?: ButtonShape;
   *
   *    rejectMessage?: string;
   *
   *    downloads?: Downloads;
   *
   *    onClick?: () => void;
   *
   * }
   * </code>
   */
  walletsData: Wallet[];
};
