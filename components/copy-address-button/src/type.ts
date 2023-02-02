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
};
