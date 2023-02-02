import { OptionBase } from 'chakra-react-select';

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

export type handleSelectChainDropdown = (
  newValue: OnChangeValue<DataType, false>,
  actionMeta: ActionMeta<DataType>
) => void;

export type ChangeChainDropdownType = {
  /**
   * Data of options.
   *
   * see `DataType` : https://github.com/cosmology-tech/cosmology-ui/blob/main/packages/utils/src/utils/types.ts#L123-L148
   */
  data: DataType[];
  /**
   * Selected item.
   *
   * see `DataType` : https://github.com/cosmology-tech/cosmology-ui/blob/main/packages/utils/src/utils/types.ts#L123-L148
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
   * about chakra-react-select: https://github.com/csandman/chakra-react-select#chakrastyles
   */
  styleProps?: object;
  /**
   * Can custom dropdown, default:
   * ```
   *  {
   *    DropdownIndicator,
   *    IndicatorSeparator,
   *    LoadingIndicator,
   *    Placeholder,
   *    Option
   *  }
   * ```
   */
  customComponents?: object;
  /**
   * A function called to handle select item.
   *
   * see `handleSelectChainDropdown` : https://github.com/cosmology-tech/cosmology-ui/blob/main/packages/utils/src/utils/types.ts#L150-L153
   */
  onChange: handleSelectChainDropdown;
};
