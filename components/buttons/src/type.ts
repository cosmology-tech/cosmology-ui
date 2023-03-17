import { MouseEventHandler, ReactNode } from 'react';
import { CSSFunctionArgs } from 'system-props';

export interface BaseButtonType {
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
  leftIcon?: ReactNode | false;
  /**
   * Props JSX.Element to custom icon.
   */
  rightIcon?: ReactNode;
  /**
   * A function called to handle connect.
   */
  onClick?: MouseEventHandler;
}

export interface ConnectWalletButtonType extends BaseButtonType {
  /**
   * Can add a stable class name to control CSS.
   *
   * @default 'connect-wallet-button'
   */
  className?: string;
  /**
   * Can props CSS object to custom style.
   *
   * @default ConnectWalletButtonStyle(theme)
   * @example { '&>.connect-wallet-button-spinner': { bg: '$green.500', } }
   */
  sx?: CSSFunctionArgs<'prefix'>;
}
