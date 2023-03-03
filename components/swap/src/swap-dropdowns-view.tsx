import { Box, Center, useDisclosure, useOutsideClick } from '@chakra-ui/react';
import { AnimateIconButton } from '@cosmology-ui/animation';
import { useTheme } from '@cosmology-ui/theme';
import React, { useRef, useState } from 'react';
import { IconType } from 'react-icons';
import { ImArrowDown2 } from 'react-icons/im';
import { TbArrowsRightLeft } from 'react-icons/tb';

import { SwapControlPanel } from './swap-panel';
import { SwapDropdownsViewType, SwapSwitchButtonType, SwapType } from './type';

const SwapSwitchButton = ({ onSwapSwitch }: SwapSwitchButtonType) => {
  const [icon, setIcon] = useState<IconType>(ImArrowDown2);
  return (
    <AnimateIconButton
      variant="unstyled"
      className="swap-switch-button"
      aria-label="swap-switch-button"
      icon={icon}
      onClick={onSwapSwitch}
      whileHover={{
        rotate: 90,
        scale: 1.1,
        transition: { duration: 0.1, ease: 'circInOut' }
      }}
      onHoverStart={() => setIcon(TbArrowsRightLeft)}
      onHoverEnd={() => setIcon(ImArrowDown2)}
    />
  );
};

export const SwapDropdownsViewBaseStyle = (theme: string) => {
  return {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    '>:first-of-type': { mb: 4 },
    '>.swap-switch-button-box': {
      position: 'absolute',
      zIndex: 2,
      '>.swap-switch-button': {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 'lg',
        w: 'fit-content',
        h: 'fit-content',
        p: 3,
        borderRadius: 'full',
        bg: `swap-dropdown-background-color-${theme}`,
        border: '3px solid',
        borderColor: `swap-dropdowns-view-switch-button-border-color-${theme}`,
        color: `swap-dropdowns-view-switch-button-text-color-${theme}`
      }
    }
  };
};

export const SwapDropdownsView = ({
  dropdownData,
  fromDropdownLoading,
  fromInputLoading,
  fromToken,
  toDropdownLoading,
  toInputLoading,
  toToken,
  amountValue,
  fiatValue,
  invalid,
  invalidText,
  className = 'swap-dropdowns-view',
  styleProps,
  onAmountInputChange,
  onFromDropdownChange,
  onToDropdownChange,
  onSwapSwitch
}: SwapDropdownsViewType) => {
  const { theme } = useTheme();
  const fromMenuRef = useRef<HTMLDivElement>(null);
  const toMenuRef = useRef<HTMLDivElement>(null);
  const { onClose: onFromMenuClose } = useDisclosure();
  const { onClose: onToMenuClose } = useDisclosure();

  useOutsideClick({
    ref: fromMenuRef,
    handler: onFromMenuClose
  });
  useOutsideClick({
    ref: toMenuRef,
    handler: onToMenuClose
  });

  return (
    <Box
      className={className}
      sx={styleProps ? styleProps : SwapDropdownsViewBaseStyle(theme)}
    >
      <SwapControlPanel
        swapType={SwapType.from}
        dropdownLoading={fromDropdownLoading}
        inputLoading={fromInputLoading}
        dropdownData={dropdownData}
        selectedToken={fromToken}
        amountValue={amountValue}
        fiatValue={fiatValue}
        inputControlPanel={true}
        invalid={invalid}
        invalidText={invalidText}
        onDropdownChange={onFromDropdownChange}
        onAmountInputChange={onAmountInputChange}
      />
      <Center className="swap-switch-button-box">
        <SwapSwitchButton onSwapSwitch={onSwapSwitch} />
      </Center>
      <SwapControlPanel
        swapType={SwapType.to}
        dropdownLoading={toDropdownLoading}
        inputLoading={toInputLoading}
        dropdownData={dropdownData}
        selectedToken={toToken}
        inputControlPanel={false}
        onDropdownChange={onToDropdownChange}
      />
    </Box>
  );
};
