import { MouseEventHandler, ReactNode } from 'react';
export declare type BaseButtonType = {
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
     * Can add a stable class name to control CSS.
     */
    className?: string;
    /**
     * Can use Chakra Style Props custom button style.
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
     * A function called to handle connect.
     */
    onClick?: MouseEventHandler;
};
