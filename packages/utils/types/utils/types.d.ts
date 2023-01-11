import { ActionMeta, OnChangeValue, OptionBase } from 'chakra-react-select';
import React, { MouseEventHandler, ReactNode, RefObject } from 'react';
import { IconType } from 'react-icons';
export declare enum WalletStatus {
    Disconnected = "Disconnected",
    Connecting = "Connecting",
    Connected = "Connected",
    NotExist = "NotExist",
    Rejected = "Rejected",
    Error = "Error"
}
export declare type ThemeListType = {
    name: string;
    displayColor: string;
    colorMode: string;
};
export declare type StyleDataType = {
    componentName: string;
    category: string;
    style: string;
    theme: {
        themeName: string;
        themeValue: string;
    }[];
};
export declare type ConnectWalletButtonType = {
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
     * Can add a stable class name to control CSS.
     */
    className?: string;
    /**
     * Can use Chakra Style Props custom button style.
     *
     * Also can use css control, e.g,
     * <code>
     *  {
     *     '.my-button:hover &': {
     *       color: 'green.500',
     *     }
     *  }
     * </code>
     *
     * see docs: https://chakra-ui.com/docs/styled-system/css-variables#creating-scoped-theme-aware-css-variables
     */
    styleProps?: object;
    /**
     * A function called to handle connect.
     */
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
};
export declare type CopyAddressType = {
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
    /**
     * Can add a stable class name to control CSS.
     */
    className?: string;
    /**
     * Can use Chakra Style Props custom button style.
     *
     * Also can use css control, e.g,
     * <code>
     *  {
     *     '.my-button:hover &': {
     *       color: 'green.500',
     *     }
     *  }
     * </code>
     *
     * see docs: https://chakra-ui.com/docs/styled-system/css-variables#creating-scoped-theme-aware-css-variables
     */
    styleProps?: object;
};
export interface DataType extends OptionBase {
    /**
     * Unique identifier for option.
     */
    name: string;
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
export declare type handleSelectChainDropdown = (newValue: OnChangeValue<DataType, false>, actionMeta: ActionMeta<DataType>) => void;
export declare type ChangeChainDropdownType = {
    /**
     * Data of options.
     *
     * see `DataType` : https://github.com/cosmology-tech/cosmology-ui/blob/main/packages/utils/src/utils/types.ts#L74-L99
     */
    data: DataType[];
    /**
     * Selected item.
     */
    selectedItem?: DataType;
    /**
     * Dropdown display loading.
     */
    loading?: boolean;
    /**
     * Dropdown display disabled.
     */
    disabled?: boolean;
    /**
     * Can add a stable class name to control CSS.
     */
    className?: string;
    /**
     * Can use Chakra Style Props custom dropdown style.
     *
     * Also can use css control, e.g,
     * <code>
     *  {
     *     '.my-button:hover &': {
     *       color: 'green.500',
     *     }
     *  }
     * </code>
     *
     * see docs: https://chakra-ui.com/docs/styled-system/css-variables#creating-scoped-theme-aware-css-variables
     *
     * about chakra-react-select: https://github.com/csandman/chakra-react-select#chakrastyles
     */
    styleProps?: object;
    /**
     * Can custom dropdown, default:
     * <code>
     *  {
     *    DropdownIndicator,
     *    IndicatorSeparator,
     *    LoadingIndicator,
     *    Placeholder,
     *    Option
     *  }
     * </code>
     */
    customComponents?: object;
    /**
     * A function called to handle select item.
     *
     * <code>handleSelectChainDropdown: (newValue: OnChangeValue<DataType, false>, actionMeta: ActionMeta<DataType>) => void</code><br /><br />
     */
    onChange: handleSelectChainDropdown;
};
export declare enum LogoStatus {
    Loading = "loading",
    Warning = "warning",
    Error = "error"
}
export declare enum WalletMode {
    Extension = "extension",
    WalletConnect = "wallet-connect"
}
export declare enum ButtonShape {
    Square = "Square",
    Rectangle = "Rectangle"
}
export declare type SimpleModalHeadType = {
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
     * <code>
     *  {
     *     '.my-button:hover &': {
     *       color: 'green.500',
     *     }
     *  }
     * </code>
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
export declare type SimpleConnectModalType = {
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
     * Can add a stable class name to control CSS.
     */
    className?: string;
    /**
     * Can use Chakra Style Props custom modal head style, also can use css.
     *
     * Also can use css control, e.g,
     * <code>
     *  {
     *     '.my-button:hover &': {
     *       color: 'green.500',
     *     }
     *  }
     * </code>
     *
     * see docs: https://chakra-ui.com/docs/styled-system/css-variables#creating-scoped-theme-aware-css-variables
     */
    styleProps?: object;
    /**
     * A function called to close modal.
     */
    modalOnClose: () => void;
};
export declare type InstallWalletButtonType = {
    /**
     * Props react-icons item to a custom icon.
     */
    icon?: IconType;
    /**
     * Text to display for button.
     */
    buttonText?: string;
    /**
     * Button display disabled.
     */
    disabled: boolean;
    /**
     * Can add a stable class name to control CSS.
     */
    className?: string;
    /**
     * Can use Chakra Style Props custom button style, also can use css.
     *
     * Also can use css control, e.g,
     * <code>
     *  {
     *     '.my-button:hover &': {
     *       color: 'green.500',
     *     }
     *  }
     * </code>
     *
     * see docs: https://chakra-ui.com/docs/styled-system/css-variables#creating-scoped-theme-aware-css-variables
     */
    styleProps?: object;
    /**
     * A function called to handle download wallet.
     */
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
};
export declare type ConnectModalContentType = {
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
    /**
     * Can add a stable class name to control CSS.
     */
    className?: string;
    /**
     * Can use Chakra Style Props custom modal content style, also can use css.
     *
     * Also can use css control, e.g,
     * <code>
     *  {
     *     '.my-button:hover &': {
     *       color: 'green.500',
     *     }
     *  }
     * </code>
     *
     * see docs: https://chakra-ui.com/docs/styled-system/css-variables#creating-scoped-theme-aware-css-variables
     */
    styleProps?: object;
};
export declare type QRCodeType = {
    /**
     * Link for connecting wallet from app.
     */
    link: string;
    /**
     * Describe how to connect wallet.
     */
    description?: string;
    /**
     * QRCode size. Default is 230px.
     */
    qrCodeSize?: number;
    /**
     * Can add a stable class name to control CSS.
     */
    className?: string;
    /**
     * Display the loading state.
     */
    loading?: boolean;
    /**
     * Can use Chakra Style Props custom QR Code style.
     *
     * Also can use css control, e.g,
     * <code>
     *  {
     *     '.my-button:hover &': {
     *       color: 'green.500',
     *     }
     *  }
     * </code>
     *
     * see docs: https://chakra-ui.com/docs/styled-system/css-variables#creating-scoped-theme-aware-css-variables
     */
    styleProps?: object;
};
export declare type DownloadInfo = {
    browser?: string;
    os?: string;
    icon?: IconType;
    link: string;
};
export declare type Downloads = {
    desktop: DownloadInfo[];
    tablet: DownloadInfo[];
    mobile: DownloadInfo[];
    default: string;
};
export declare type Wallet = {
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
     * Can use Chakra Style Props custom list items(buttons) style.
     *
     * Also can use css control, e.g,
     * <code>
     *  {
     *     '.my-button:hover &': {
     *       color: 'green.500',
     *     }
     *  }
     * </code>
     *
     * see docs: https://chakra-ui.com/docs/styled-system/css-variables#creating-scoped-theme-aware-css-variables
     *
     * default: <code>SimpleDisplayWalletListItemBaseStyle(index)</code>
     */
    styleProps?: object;
    /**
     * A function called to handle clicked button.
     */
    onClick?: MouseEventHandler<HTMLDivElement>;
};
export declare type DisplayWalletListType = {
    /**
     * The ref of element to receive focus when the modal opens.
     * Props ref will set default focus on the list first button.
     * If is undefined will set focus on close button.
     */
    initialFocus: RefObject<HTMLButtonElement>;
    /**
     * Array of wallet list.
     *
     * see `Wallet` :
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
     * <code>
     *  {
     *     '.my-button:hover &': {
     *       color: 'green.500',
     *     }
     *  }
     * </code>
     *
     * see docs: https://chakra-ui.com/docs/styled-system/css-variables#creating-scoped-theme-aware-css-variables
     */
    styleProps?: object;
    /**
     * Can use Framer Motion Props control animation.
     * see docs: https://www.framer.com/docs/
     */
    shadowAnimateProps?: object;
};
