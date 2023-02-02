import { Button, Icon, useClipboard } from '@chakra-ui/react';
import { ThemeContext } from '@cosmology-ui/theme';
import React, { useContext, useEffect, useState } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { FiCopy } from 'react-icons/fi';

import { CopyAddressType } from './type';

function stringTruncateFromCenter(str: string, maxLength: number) {
  const midChar = '…'; // character to insert into the center of the result
  let left: number;
  let right: number;

  if (str.length <= maxLength) return str;

  // length of beginning part
  // eslint-disable-next-line prefer-const
  left = Math.ceil(maxLength / 2);

  // start index of ending part
  // eslint-disable-next-line prefer-const
  right = str.length - Math.floor(maxLength / 2) + 1;

  return str.substring(0, left) + midChar + str.substring(right);
}

const defaultText = 'address not identified yet';

export const CopyAddressButtonBaseStyle = (
  theme: string,
  hasCopied: boolean
) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: 'sm',
  fontWeight: 'normal',
  letterSpacing: '0.4px',
  lineHeight: 6,
  borderRadius: 'full',
  border: '1px solid',
  borderColor: `copy-address-button-border-color-${theme}`,
  w: 'full',
  h: 'auto',
  minH: 7,
  px: 2,
  color: `copy-address-button-text-color-${theme}`,
  transition: 'all .3s ease-in-out',
  _hover: {
    bg: `copy-address-button-hover-background-color-${theme}`,
    opacity: 0.9
  },
  _focus: {
    boxShadow: 'none'
  },
  _loading: {
    cursor: 'progress'
  },
  _disabled: {
    opacity: 0.6,
    cursor: 'not-allowed',
    _hover: {
      bg: 'transparent',
      opacity: 0.6
    },
    _active: {
      boxShadow: 'none'
    },
    _focus: {
      boxShadow: 'none'
    }
  },
  '>.copy-address-button-icon': {
    opacity: 0.85,
    ml: 2,
    color: hasCopied ? 'green.400' : 'inherit'
  }
});

export const CopyAddressButton = ({
  address = defaultText,
  loading,
  disabled,
  className = 'copy-address-button',
  styleProps,
  maxDisplayLength = 14
}: CopyAddressType) => {
  const { theme } = useContext(ThemeContext);
  const [displayAddress, setDisplayAddress] = useState(address);
  const [displayIsDisabled, setDisplayIsDisabled] = useState(disabled);
  const { hasCopied, onCopy, setValue } = useClipboard('');

  useEffect(() => {
    // default
    if (address === defaultText) {
      setDisplayAddress(defaultText);
      setDisplayIsDisabled(true);
    }
    if (address !== defaultText) setValue(address);
    // has address and address length > max display length
    if (address !== defaultText && address.length >= maxDisplayLength) {
      setDisplayAddress(stringTruncateFromCenter(address, maxDisplayLength));
      if (disabled) setDisplayIsDisabled(true);
      if (!disabled) setDisplayIsDisabled(false);
    }
    // has address and address length < max display length
    if (address !== defaultText && address.length <= maxDisplayLength) {
      setDisplayAddress(address);
      if (disabled) setDisplayIsDisabled(true);
      if (!disabled) setDisplayIsDisabled(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address, maxDisplayLength, disabled]);

  return (
    <Button
      className={className}
      title={!loading && !disabled && address !== defaultText ? address : ''}
      variant="unstyled"
      isDisabled={displayIsDisabled}
      isLoading={loading}
      onClick={onCopy}
      sx={
        styleProps ? styleProps : CopyAddressButtonBaseStyle(theme, hasCopied)
      }
    >
      {!loading ? displayAddress : undefined}
      {!loading && address !== defaultText ? (
        <Icon
          className="copy-address-button-icon"
          as={hasCopied ? FaCheckCircle : FiCopy}
        />
      ) : undefined}
    </Button>
  );
};
