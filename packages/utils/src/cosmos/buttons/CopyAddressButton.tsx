import {
  Button,
  Icon,
  Text,
  useClipboard,
  useColorMode
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { FiCopy } from 'react-icons/fi';

import { CopyAddressType, handleChangeColorModeValue } from '../../index';

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

export const CopyAddressButton = ({
  address = defaultText,
  loading,
  disabled,
  maxDisplayLength = 14
}: CopyAddressType) => {
  const [displayAddress, setDisplayAddress] = useState(address);
  const [displayIsDisabled, setDisplayIsDisabled] = useState(disabled);
  const { hasCopied, onCopy, setValue } = useClipboard('');
  const { colorMode } = useColorMode();

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
      title={address ? address : ''}
      variant="unstyled"
      display="flex"
      alignItems="center"
      justifyContent="center"
      borderRadius="full"
      border="1px solid"
      borderColor={handleChangeColorModeValue(
        colorMode,
        'gray.200',
        'whiteAlpha.300'
      )}
      w="full"
      h="auto"
      minH="fit-content"
      py={loading ? 3.5 : 0.5}
      pl={2}
      pr={2}
      color={handleChangeColorModeValue(
        colorMode,
        'gray.700',
        'whiteAlpha.600'
      )}
      transition="all .3s ease-in-out"
      isDisabled={displayIsDisabled}
      isLoading={loading}
      _hover={{
        bg: 'rgba(142, 142, 142, 0.05)'
      }}
      _focus={{
        outline: 'none'
      }}
      _disabled={{
        opacity: 0.6,
        cursor: 'not-allowed',
        borderColor: 'rgba(142, 142, 142, 0.1)',
        _hover: {
          bg: 'transparent'
        },
        _active: {
          outline: 'none'
        },
        _focus: {
          outline: 'none'
        }
      }}
      onClick={onCopy}
    >
      {!loading ? (
        <Text
          fontSize="sm"
          fontWeight="normal"
          letterSpacing="0.4px"
          color="inherit"
          lineHeight={6}
          opacity={0.75}
        >
          {displayAddress}
        </Text>
      ) : undefined}
      {!loading && address !== defaultText ? (
        <Icon
          as={hasCopied ? FaCheckCircle : FiCopy}
          w={3.5}
          h={3.5}
          ml={2}
          opacity={0.9}
          color={
            hasCopied
              ? 'green.400'
              : handleChangeColorModeValue(
                  colorMode,
                  'gray.500',
                  'whiteAlpha.400'
                )
          }
        />
      ) : undefined}
    </Button>
  );
};
