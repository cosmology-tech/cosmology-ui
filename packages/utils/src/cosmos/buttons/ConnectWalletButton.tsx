import { Button, Center, Icon } from '@chakra-ui/react';
import React, { useContext } from 'react';
import { RiWallet3Fill } from 'react-icons/ri';

import { ConnectWalletButtonType, ThemeContext } from '../../index';

export const ConnectWalletButtonBaseStyle = (theme: string) => ({
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
  }
});

export const ConnectWalletButton = ({
  buttonText = 'Connect Wallet',
  loading,
  disabled,
  leftIcon = <Icon as={RiWallet3Fill} />,
  rightIcon,
  className,
  styleProps,
  onClick
}: ConnectWalletButtonType) => {
  const { theme } = useContext(ThemeContext);

  return (
    <Button
      className={className}
      isLoading={loading}
      isDisabled={disabled}
      iconSpacing={!buttonText ? 0 : 1.5}
      leftIcon={leftIcon ? <Center>{leftIcon}</Center> : undefined}
      rightIcon={rightIcon ? <Center>{rightIcon}</Center> : undefined}
      onClick={onClick}
      sx={styleProps ? styleProps : ConnectWalletButtonBaseStyle(theme)}
    >
      {buttonText}
    </Button>
  );
};
