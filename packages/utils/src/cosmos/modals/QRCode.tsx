import { Box, Center, Stack, Text, useColorMode } from '@chakra-ui/react';
import { QRCodeSVG } from 'qrcode.react';
import React from 'react';

import { handleChangeColorModeValue, QRCodeType } from '../../index';

export const QRCode = ({ link, description, qrCodeSize = 230 }: QRCodeType) => {
  const { colorMode } = useColorMode();

  return (
    <Stack
      w={80}
      justifyContent="center"
      alignItems="center"
      spacing={4}
      p={6}
      pb={10}
    >
      {description ? (
        <Box px={4}>
          <Text fontWeight="medium" textAlign="center" opacity={0.75}>
            {description}
          </Text>
        </Box>
      ) : undefined}
      <Center
        w="full"
        border="1px solid"
        borderColor={handleChangeColorModeValue(
          colorMode,
          'blackAlpha.100',
          'whiteAlpha.600'
        )}
        borderRadius="lg"
        boxShadow="base"
        p={5}
      >
        <QRCodeSVG
          value={link}
          size={qrCodeSize}
          bgColor={'#ffffff'}
          fgColor={'#000000'}
          level={'L'}
          includeMargin={false}
        />
      </Center>
    </Stack>
  );
};
