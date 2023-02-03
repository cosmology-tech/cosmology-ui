import { MouseEventHandler, ReactNode, RefObject } from 'react';
import { IconType } from 'react-icons';

export enum LogoStatus {
  Loading = 'loading',
  Warning = 'warning',
  Error = 'error'
}

export enum ButtonShape {
  Square = 'Square',
  Rectangle = 'Rectangle'
}

export enum WalletMode {
  Extension = 'extension',
  WalletConnect = 'wallet-connect'
}

export type ConnectModalHeadType = {
  /**
   * Text to display for modal head.
   */
  title: string;
  /**
   * If is true, display the back button.
   */
  backButton: boolean;
  /**
   * Can add a stable class name to control CSS.
   */
  className?: string;
  /**
   * Can use Chakra Style Props custom modal head style, also can use css.
   *
   * Also can use css control, e.g,
   * ```
   *  {
   *     '.my-button:hover &': {
   *       color: 'green.500',
   *     }
   *  }
   * ```
   *
   * see docs: https://chakra-ui.com/docs/styled-system/css-variables#creating-scoped-theme-aware-css-variables
   */
  styleProps?: object;
  /**
   * A function called to handle modal content display.
   */
  onBack?: MouseEventHandler<HTMLButtonElement>;
  /**
   * A function called to handle modal close.
   */
  onClose: MouseEventHandler<HTMLButtonElement>;
};

export type ConnectModalViewType = {
  /**
   *  The component displays a modal content head.
   */
  modalHead: ReactNode;
  /**
   *  The component displays a modal content.
   */
  modalContent: ReactNode;
};

export type ConnectModalContentType = {
  /**
   * Main logo on content.
   *
   * see `IconType` : https://github.com/react-icons/react-icons/blob/master/packages/react-icons/src/iconBase.tsx
   */
  logo?: string | IconType;
  /**
   * The border around logo.
   *
   * see `LogoStatus` : https://github.com/cosmology-tech/cosmology-ui/blob/main/packages/utils/src/utils/types.ts#L221-L225
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
   * Props the `CopyAddressButton` component.
   */
  addressButton?: ReactNode;
  /**
   * Props the `ConnectWalletButton` component.
   */
  bottomButton?: ReactNode;
  /**
   * Props the link component.
   */
  bottomLink?: ReactNode;
  /**
   * Can add a stable class name to control CSS.
   */
  className?: string;
  /**
   * Can use Chakra Style Props custom modal content style, also can use css.
   *
   * Also can use css control, e.g,
   * ```
   *  {
   *     '.my-button:hover &': {
   *       color: 'green.500',
   *     }
   *  }
   * ```
   *
   * see docs: https://chakra-ui.com/docs/styled-system/css-variables#creating-scoped-theme-aware-css-variables
   */
  styleProps?: object;
};

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
   *
   * see `IconType` : https://github.com/react-icons/react-icons/blob/master/packages/react-icons/src/iconBase.tsx
   */
  logo?: string | IconType;
  /**
   * Display sub icon.
   *
   * see `IconType` : https://github.com/react-icons/react-icons/blob/master/packages/react-icons/src/iconBase.tsx
   */
  subLogo?: string | IconType;
  /**
   * Connect wallet by extension or wallet-connect.
   *
   * see `WalletMode` : https://github.com/cosmology-tech/cosmology-ui/blob/main/packages/utils/src/utils/types.ts#L227-L230
   */
  mode: WalletMode;
  /**
   * Disabled button when on mobile or tablet.
   */
  mobileDisabled: boolean;
  /**
   * List button is displaying Square or Rectangle.
   *
   * see `ButtonShape` : https://github.com/cosmology-tech/cosmology-ui/blob/main/packages/utils/src/utils/types.ts#L232-L235
   */
  buttonShape?: ButtonShape;
  /**
   * Description when rejected.
   */
  rejectMessage?: string;
  /**
   * Description when rejected.
   *
   * see `Downloads` : https://github.com/cosmology-tech/cosmology-ui/blob/main/packages/utils/src/utils/types.ts#L224-L249
   */
  downloads?: Downloads;
  /**
   * Can use Chakra Style Props custom list items(buttons) style.
   *
   * Also can use css control, e.g,
   * ```
   *  {
   *     '.my-button:hover &': {
   *       color: 'green.500',
   *     }
   *  }
   * ```
   *
   * see docs: https://chakra-ui.com/docs/styled-system/css-variables#creating-scoped-theme-aware-css-variables
   *
   * default: `ConnectModalWalletListBaseStyle`
   */
  styleProps?: object;
  /**
   * A function called to handle clicked button.
   */
  onClick?: MouseEventHandler<HTMLDivElement>;
};

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

export type DisplayWalletListType = {
  /**
   * The ref of element to receive focus when the modal opens.
   *
   * Props ref will set default focus on the list first button.
   *
   * If is undefined will set focus on close button.
   */
  initialFocus: RefObject<HTMLButtonElement>;
  /**
   * Array of wallet list.
   *
   * see `Wallet` : https://github.com/cosmology-tech/cosmology-ui/blob/main/packages/utils/src/utils/types.ts#L475-L543
   */
  walletsData: Wallet[];
  /**
   * Can add a stable class name to control CSS.
   */
  className?: string;
  /**
   * Can use Chakra Style Props custom list style.
   *
   * Also can use css control, e.g,
   * ```
   *  {
   *     '.my-button:hover &': {
   *       color: 'green.500',
   *     }
   *  }
   * ```
   *
   * see docs: https://chakra-ui.com/docs/styled-system/css-variables#creating-scoped-theme-aware-css-variables
   */
  styleProps?: object;
  /**
   * Can use Framer Motion Props control animation.
   *
   * see framer-motion docs: https://www.framer.com/docs/
   */
  shadowAnimateProps?: object;
};

export type QRCodeType = {
  /**
   * Link for connecting wallet from app.
   */
  link: string;
  /**
   * Describe how to connect wallet.
   */
  description?: string;
  /**
   * QRCode size. Default is `230px`.
   */
  qrCodeSize?: number;
  /**
   * Display the loading state.
   */
  loading?: boolean;
  /**
   * Can add a stable class name to control CSS.
   */
  className?: string;
  /**
   * Can use Chakra Style Props custom QR Code style.
   *
   * Also can use css control, e.g,
   * ```
   *  {
   *     '.my-button:hover &': {
   *       color: 'green.500',
   *     }
   *  }
   * ```
   *
   * see docs: https://chakra-ui.com/docs/styled-system/css-variables#creating-scoped-theme-aware-css-variables
   */
  styleProps?: object;
};

export type ConnectModalType = {
  /**
   * The ref of element to receive focus when the modal opens.
   *
   * Props ref will set default focus on the list first button.
   *
   * If is undefined will set focus on close button.
   */
  initialRef: RefObject<HTMLButtonElement>;
  /**
   * The component of display on modal content.
   */
  modalView: ReactNode;
  /**
   * If true, the modal will be open.
   */
  modalOpen: boolean;
  /**
   * Can add a stable class name to control CSS.
   */
  className?: string;
  /**
   * Can use Chakra Style Props custom modal style, also can use css.
   *
   * Also can use css control, e.g,
   * ```
   *  {
   *     '.my-button:hover &': {
   *       color: 'green.500',
   *     }
   *  }
   * ```
   *
   * see docs: https://chakra-ui.com/docs/styled-system/css-variables#creating-scoped-theme-aware-css-variables
   */
  styleProps?: object;
  /**
   * A function called to close modal.
   */
  modalOnClose: () => void;
};
