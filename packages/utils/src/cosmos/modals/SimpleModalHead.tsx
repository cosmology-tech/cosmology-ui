import { IconButton, Stack, Text } from '@chakra-ui/react';
import React from 'react';
import { FiChevronLeft, FiX } from 'react-icons/fi';

import { SimpleModalHeadType } from '../../index';

export const SimpleModalHeadBaseStyle = (
  theme: string,
  backButton: boolean
) => {
  return {
    w: 'full',
    alignItems: 'center',
    h: 'fit-content',
    mb: 1,
    p: 4,
    pb: 0,
    '>.modal-header-text': {
      flex: 1,
      mr: backButton ? 0 : -10,
      fontSize: 'md',
      fontWeight: 'semibold',
      textAlign: 'center',
      color: `simple-modal-head-text-color-${theme}`
    },
    '>.icon-button': {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 'md',
      color: `simple-modal-head-button-icon-color-${theme}`,
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

export const SimpleModalHead = ({
  title,
  backButton,
  className,
  theme = 'light',
  styleProps = SimpleModalHeadBaseStyle(theme, backButton ? true : false),
  onBack,
  onClose
}: SimpleModalHeadType) => {
  return (
    <Stack isInline={true} className={className} sx={styleProps}>
      {backButton ? (
        <IconButton
          aria-label="back"
          className="icon-button"
          variant="ghost"
          icon={<FiChevronLeft />}
          onClick={onBack}
        />
      ) : undefined}
      <Text className="modal-header-text">{title}</Text>
      <IconButton
        aria-label="close"
        className="icon-button"
        variant="ghost"
        icon={<FiX />}
        onClick={onClose}
      />
    </Stack>
  );
};
