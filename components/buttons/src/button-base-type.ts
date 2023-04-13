import { MouseEventHandler, ReactNode } from 'react';

export type BaseButtonType = {
  /**
   * Text to display for the button.<br />
   * If in need, set false to unset the default string.
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
   * Can add a stable class name to control CSS.
   */
  className?: string;
  /**
   * A function called to handle connect.
   */
  onClick?: MouseEventHandler;
};
