import { Box, Button, Icon, Stack, Text, useColorMode } from '@chakra-ui/react';
import React from 'react';

import {
  DownloadWalletButtonType,
  handleChangeColorModeValue
} from '../../index';

export const InstallWalletButton = ({
  icon,
  buttonText = 'Install Wallet',
  onClick,
  disabled
}: DownloadWalletButtonType) => {
  const { colorMode } = useColorMode();
  return (
    <Box w="full" px={6}>
      <Button
        variant="unstyled"
        w="full"
        h="auto"
        fontWeight="medium"
        fontSize="md"
        color={handleChangeColorModeValue(
          colorMode,
          'rgba(37, 57, 201, 0.72)',
          'rgba(196, 203, 255, 0.9)'
        )}
        border="1px solid"
        borderColor={handleChangeColorModeValue(
          colorMode,
          '#ffffff',
          'rgba(0, 0, 0, 0.25)'
        )}
        bg={handleChangeColorModeValue(
          colorMode,
          'rgba(37, 57, 201, 0.1)',
          'rgba(40, 62, 219, 0.15)'
        )}
        boxShadow={handleChangeColorModeValue(
          colorMode,
          '0 0 1px 2px rgba(37, 57, 201, 0.5)',
          '0 0 1px 2px rgba(196, 203, 255, 0.5)'
        )}
        _hover={{ opacity: 0.8 }}
        _active={{ opacity: 0.9 }}
        _focus={{ outline: 'none' }}
        _disabled={{
          opacity: 0.5,
          cursor: 'not-allowed',
          _hover: { opacity: 0.5 },
          _active: { opacity: 0.5 }
        }}
        isDisabled={disabled}
        onClick={onClick}
      >
        <Stack
          w="full"
          isInline={true}
          justifyContent="center"
          alignItems="center"
          p={3}
        >
          {icon ? <Icon as={icon} /> : undefined}
          <Text whiteSpace="break-spaces">{buttonText}</Text>
        </Stack>
      </Button>
    </Box>
  );
};
