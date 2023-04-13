import { Button, Center } from '@chakra-ui/react';
import { useTheme } from '@cosmology-ui/theme';
import React from 'react';

import { BaseButtonType } from './button-base-type';

export const InstallWalletButtonBaseStyle = (theme: string) => ({
  px: 2.5,
  w: 'full',
  h: 'auto',
  minH: 12,
  display: 'flex',
  alignItems: 'center',
  whiteSpace: 'break-spaces',
  border: '1px solid',
  borderColor: `install-wallet-button-border-color-${theme}`,
  color: `install-wallet-button-text-color-${theme}`,
  bg: `install-wallet-button-background-color-${theme}`,
  boxShadow: `install-wallet-button-shadow-${theme}`,
  _hover: { opacity: 0.8 },
  _active: { opacity: 0.9 },
  _focus: { outline: 'none' },
  _disabled: {
    opacity: 0.5,
    cursor: 'not-allowed',
    _hover: { opacity: 0.5 },
    _active: { opacity: 0.5 }
  },
  _loading: {
    cursor: 'progress'
  },
  '.install-wallet-button-left-icon': {
    mr: 1.5
  },
  '.install-wallet-button-right-icon': {
    ml: 1.5
  }
});

export const InstallWalletButton = ({
  buttonText = 'Install Wallet',
  loading = false,
  disabled = false,
  leftIcon,
  rightIcon,
  className = 'install-wallet-button',
  onClick
}: BaseButtonType) => {
  const { theme } = useTheme();

  return (
    <Button
      className={className}
      variant="unstyled"
      sx={InstallWalletButtonBaseStyle(theme)}
      isLoading={loading}
      isDisabled={disabled}
      onClick={onClick}
    >
      {!leftIcon ? undefined : (
        <Center className="install-wallet-button-left-icon">{leftIcon}</Center>
      )}
      {buttonText}
      {rightIcon ? (
        <Center className="install-wallet-button-right-icon">
          {rightIcon}
        </Center>
      ) : undefined}
    </Button>
  );
};
