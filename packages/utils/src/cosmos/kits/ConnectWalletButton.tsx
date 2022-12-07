import { Button, Center, Icon, Text, useColorMode } from '@chakra-ui/react';
import React from 'react';
import { RiWallet3Fill } from 'react-icons/ri';

import { ConnectWalletType, handleChangeColorModeValue } from '../../index';

export const ConnectWalletButton = ({
  buttonText = 'Connect Wallet',
  loading,
  disabled,
  leftIcon = <Icon as={RiWallet3Fill} />,
  rightIcon,
  onClick
}: ConnectWalletType) => {
  const { colorMode } = useColorMode();

  return (
    <Button
      px={2.5}
      w="full"
      h="auto"
      minH={12}
      display="flex"
      alignItems="center"
      fontSize="lg"
      isLoading={loading}
      isDisabled={disabled}
      onClick={onClick}
      bg={handleChangeColorModeValue(colorMode, 'primary.500', 'primary.400')}
      color="white"
      _hover={{
        bg: handleChangeColorModeValue(colorMode, 'primary.400', 'primary.500')
      }}
      _active={{
        bg: 'primary.50',
        color: handleChangeColorModeValue(
          colorMode,
          'primary.500',
          'primary.400'
        ),
        boxShadow: 'none'
      }}
      _focus={{ boxShadow: '0 0 0 2px #929ce4' }}
      _loading={{
        opacity: 0.8,
        bg: handleChangeColorModeValue(colorMode, 'primary.500', 'primary.400'),
        color: 'white',
        cursor: 'progress',
        _hover: {
          bg: handleChangeColorModeValue(
            colorMode,
            'primary.500',
            'primary.400'
          ),
          color: 'white',
          boxShadow: 'none'
        },
        _active: {
          bg: handleChangeColorModeValue(
            colorMode,
            'primary.500',
            'primary.400'
          ),
          color: 'white',
          boxShadow: 'none'
        },
        _focus: {
          bg: handleChangeColorModeValue(
            colorMode,
            'primary.500',
            'primary.400'
          ),
          color: 'white',
          boxShadow: 'none'
        }
      }}
      _disabled={{
        opacity: 0.8,
        bg: handleChangeColorModeValue(colorMode, 'gray.50', 'gray.700'),
        color: handleChangeColorModeValue(colorMode, 'gray.400', 'gray.500'),
        cursor: 'not-allowed',
        _hover: {
          bg: handleChangeColorModeValue(colorMode, 'gray.50', 'gray.700'),
          color: handleChangeColorModeValue(colorMode, 'gray.400', 'gray.500'),
          boxShadow: 'none'
        },
        _active: {
          bg: handleChangeColorModeValue(colorMode, 'gray.50', 'gray.700'),
          color: handleChangeColorModeValue(colorMode, 'gray.400', 'gray.500'),
          boxShadow: 'none'
        },
        _focus: {
          bg: handleChangeColorModeValue(colorMode, 'gray.50', 'gray.700'),
          color: handleChangeColorModeValue(colorMode, 'gray.400', 'gray.500'),
          boxShadow: 'none'
        }
      }}
    >
      {leftIcon ? <Center mr={1.5}>{leftIcon}</Center> : null}
      {buttonText ? <Text>{buttonText}</Text> : null}
      {rightIcon ? <Center ml={1.5}>{rightIcon}</Center> : null}
    </Button>
  );
};
