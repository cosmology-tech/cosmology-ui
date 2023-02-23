import { IconButton, Stack, Text } from '@chakra-ui/react';
import { useTheme } from '@cosmology-ui/theme';
import React from 'react';
import { FiChevronLeft, FiX } from 'react-icons/fi';

import { ConnectModalHeadType } from './type';

export const ConnectModalHeadBaseStyle = (theme: string) => {
  return {
    w: 'full',
    alignItems: 'center',
    h: 'fit-content',
    mb: 1,
    p: 4,
    pb: 1.5,
    '>.connect-modal-head-text': {
      mr: -10,
      flex: 1,
      fontSize: 'md',
      fontWeight: 'semibold',
      textAlign: 'center',
      color: `connect-modal-head-text-color-${theme}`,
      '&.connect-modal-head-back-button': {
        mr: 0
      }
    },
    '>.connect-modal-head-icon-button': {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 'md',
      color: `connect-modal-head-button-icon-color-${theme}`,
      minW: 8,
      minH: 8,
      maxW: 8,
      maxH: 8,
      h: 8,
      w: 8,
      p: 0,
      _focus: { outline: 'none' },
      '>svg': { w: 5, h: 5 }
    }
  };
};

export const ConnectModalHead = ({
  title = 'Select a wallet',
  backButton,
  className = 'connect-modal-head',
  styleProps,
  onBack,
  onClose
}: ConnectModalHeadType) => {
  const { theme } = useTheme();
  return (
    <Stack
      isInline={true}
      className={className}
      sx={styleProps ? styleProps : ConnectModalHeadBaseStyle(theme)}
    >
      {backButton ? (
        <IconButton
          aria-label="back-to-wallet-list"
          className="connect-modal-head-icon-button"
          variant="ghost"
          icon={<FiChevronLeft />}
          onClick={onBack}
        />
      ) : undefined}
      <Text
        className={`connect-modal-head-text ${
          backButton ? 'connect-modal-head-back-button' : ''
        }`}
      >
        {title}
      </Text>
      <IconButton
        aria-label="close-connect-modal"
        className="connect-modal-head-icon-button"
        variant="ghost"
        icon={<FiX />}
        onClick={onClose}
      />
    </Stack>
  );
};
