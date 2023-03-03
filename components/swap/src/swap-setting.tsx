import { Button, Flex, IconButton, useDisclosure } from '@chakra-ui/react';
import { useTheme } from '@cosmology-ui/theme';
import React from 'react';
import { CgClose } from 'react-icons/cg';
import { RiSettings4Fill } from 'react-icons/ri';

import {
  SwapSettingControlButtonType,
  SwapSettingTokenButtonType,
  SwapSettingType
} from './type';

const SwapSettingBaseStyle = (theme: string) => {
  return {
    w: 'fit-content',
    position: 'relative',
    '>.swap-setting-token-box': {
      position: 'absolute',
      right: -2,
      transition: 'all 0.25s ease',
      visibility: 'hidden',
      opacity: 0.1,
      '&.swap-setting-open': {
        visibility: 'visible',
        opacity: 1,
        right: 8
      },
      '>.swap-setting-token-button': {
        h: 8,
        minW: 8,
        mr: 2,
        px: 3,
        display: 'flex',
        justifyContent: 'center',
        borderRadius: 'base',
        bg: `swap-setting-button-background-color-${theme}`,
        color: `swap-setting-button-text-color-${theme}`,
        _hover: {
          bg: `swap-setting-hover-button-background-color-${theme}`
        },
        '&.swap-setting-selected': {
          bg: `swap-setting-selected-button-background-color-${theme}`,
          color: `swap-setting-selected-button-text-color-${theme}`,
          _hover: {
            bg: `swap-setting-selected-button-background-color-${theme}`,
            color: `swap-setting-selected-button-text-color-${theme}`
          }
        }
      }
    },
    '>.swap-setting-control-button': {
      h: 8,
      w: 8,
      minW: 'fit-content',
      display: 'flex',
      justifyContent: 'center',
      borderRadius: 'base',
      bg: `swap-setting-button-background-color-${theme}`,
      color: `swap-setting-button-text-color-${theme}`
    }
  };
};

const SwapSettingControlButton = ({
  settingMenuOpen,
  toggleOpenSettingMenu
}: SwapSettingControlButtonType) => {
  return (
    <IconButton
      variant="unstyled"
      className="swap-setting-control-button"
      aria-label="swap-setting"
      icon={settingMenuOpen ? <CgClose /> : <RiSettings4Fill />}
      onClick={toggleOpenSettingMenu}
    />
  );
};

const SwapSettingTokenButton = ({
  selectedToken,
  text,
  onSettingTokenClick,
  onCloseSettingMenu
}: SwapSettingTokenButtonType) => {
  return (
    <Button
      variant="unstyled"
      className={`swap-setting-token-button ${
        selectedToken === text ? 'swap-setting-selected' : ''
      }`}
      onClick={() => {
        onSettingTokenClick(text);
        onCloseSettingMenu();
      }}
    >
      {text}
    </Button>
  );
};

export const SwapSetting = ({
  settingToken,
  tokenArray = ['1%'],
  className = 'swap-setting',
  styleProps,
  onSelectSetting
}: SwapSettingType) => {
  const { theme } = useTheme();
  const {
    isOpen: settingMenuOpen,
    onToggle: toggleOpenSettingMenu,
    onClose: onCloseSettingMenu
  } = useDisclosure();

  return (
    <Flex
      className={className}
      sx={styleProps ? styleProps : SwapSettingBaseStyle(theme)}
    >
      <Flex
        className={`swap-setting-token-box ${
          settingMenuOpen ? 'swap-setting-open' : ''
        }`}
      >
        {tokenArray.map((text) => (
          <SwapSettingTokenButton
            key={text}
            text={text}
            selectedToken={settingToken}
            onSettingTokenClick={onSelectSetting}
            onCloseSettingMenu={onCloseSettingMenu}
          />
        ))}
      </Flex>
      <SwapSettingControlButton
        settingMenuOpen={settingMenuOpen}
        toggleOpenSettingMenu={toggleOpenSettingMenu}
      />
    </Flex>
  );
};
