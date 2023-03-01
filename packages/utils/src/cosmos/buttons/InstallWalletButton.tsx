import { Button, Center, Icon, Image } from '@chakra-ui/react';
import React, { useContext } from 'react';

import { InstallWalletButtonType, ThemeContext } from '../../index';

export const InstallWalletButtonBaseStyle = (theme: string) => ({
  w: 'full',
  h: 'auto',
  py: 3,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  whiteSpace: 'break-spaces',
  fontWeight: 'medium',
  fontSize: 'md',
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
  '>.install-wallet-button': {
    '>svg': {
      mr: 1,
      w: 'inherit'
    },
    '>img': {
      mr: 1.5,
      maxW: 3.5
    }
  }
});

export const InstallWalletButton = ({
  icon,
  buttonText = 'Install Wallet',
  disabled = false,
  className,
  styleProps,
  onClick
}: InstallWalletButtonType) => {
  const { theme } = useContext(ThemeContext);

  return (
    <Button
      className={className}
      variant="unstyled"
      sx={styleProps ? styleProps : InstallWalletButtonBaseStyle(theme)}
      isDisabled={disabled}
      onClick={onClick}
    >
      <Center className="install-wallet-button">
        {typeof icon === 'string' ? (
          <Image src={icon} w="full" h="full" alt="logo" />
        ) : (
          <Icon as={icon} w="full" h="full" />
        )}
      </Center>
      {buttonText}
    </Button>
  );
};
