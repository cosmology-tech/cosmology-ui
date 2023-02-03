import { Button, Center, Icon } from '@chakra-ui/react';
import { ThemeContext } from '@cosmology-ui/theme';
import React, { useContext } from 'react';
import { RiWallet3Fill } from 'react-icons/ri';

import { BaseButtonType } from './button-base-type';

export const ConnectWalletButtonStyle = (theme: string) => ({
  display: 'flex',
  alignItems: 'center',
  px: 2.5,
  w: 'full',
  h: 'auto',
  minH: 12,
  fontSize: 'lg',
  bgColor: `connect-wallet-button-background-color-${theme}`,
  color: `connect-wallet-button-text-color-${theme}`,
  _hover: {
    bg: `connect-wallet-button-hover-background-color-${theme}`
  },
  _active: {
    bg: `connect-wallet-button-active-background-color-${theme}`,
    color: `connect-wallet-button-active-text-color-${theme}`,
    boxShadow: 'none'
  },
  _focus: { boxShadow: `connect-wallet-button-focus-shadow-${theme}` },
  _loading: {
    bg: `connect-wallet-button-background-color-${theme}`,
    color: `connect-wallet-button-text-color-${theme}`,
    cursor: 'progress',
    _hover: {
      bg: `connect-wallet-button-background-color-${theme}`,
      color: `connect-wallet-button-text-color-${theme}`,
      boxShadow: 'none'
    },
    _active: {
      bg: `connect-wallet-button-background-color-${theme}`,
      color: `connect-wallet-button-text-color-${theme}`,
      boxShadow: 'none'
    },
    _focus: {
      bg: `connect-wallet-button-background-color-${theme}`,
      color: `connect-wallet-button-text-color-${theme}`,
      boxShadow: 'none'
    }
  },
  _disabled: {
    opacity: 0.8,
    bg: `connect-wallet-button-disabled-background-color-${theme}`,
    color: `connect-wallet-button-disabled-text-color-${theme}`,
    cursor: 'not-allowed',
    _hover: {
      bg: `connect-wallet-button-disabled-background-color-${theme}`,
      color: `connect-wallet-button-disabled-text-color-${theme}`,
      boxShadow: 'none'
    },
    _active: {
      bg: `connect-wallet-button-disabled-background-color-${theme}`,
      color: `connect-wallet-button-disabled-text-color-${theme}`,
      boxShadow: 'none'
    },
    _focus: {
      bg: `connect-wallet-button-disabled-background-color-${theme}`,
      color: `connect-wallet-button-disabled-text-color-${theme}`,
      boxShadow: 'none'
    }
  },
  '>.connect-wallet-button-left-icon': {
    mr: 1.5
  },
  '>.connect-wallet-button-right-icon': {
    ml: 1.5
  }
});

export const ConnectWalletButton = ({
  buttonText = 'Connect Wallet',
  loading,
  disabled,
  leftIcon = <Icon as={RiWallet3Fill} />,
  rightIcon,
  className = 'connect-wallet-button',
  styleProps,
  onClick
}: BaseButtonType) => {
  const { theme } = useContext(ThemeContext);

  return (
    <Button
      className={className}
      isLoading={loading}
      isDisabled={disabled}
      sx={styleProps ? styleProps : ConnectWalletButtonStyle(theme)}
      onClick={onClick}
    >
      {leftIcon ? (
        <Center
          className={!buttonText ? '' : 'connect-wallet-button-left-icon'}
        >
          {leftIcon}
        </Center>
      ) : undefined}
      {buttonText}
      {rightIcon ? (
        <Center className="connect-wallet-button-right-icon">
          {rightIcon}
        </Center>
      ) : undefined}
    </Button>
  );
};
