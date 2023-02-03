import { Center, Skeleton, Stack, Text } from '@chakra-ui/react';
import { ThemeContext } from '@cosmology-ui/theme';
import { QRCodeSVG } from 'qrcode.react';
import React, { useContext } from 'react';

import { QRCodeType } from './type';

export const ConnectModalQRCodeSkeleton = () => (
  <Center
    flexDirection="column"
    w="full"
    maxW={72}
    minH={40}
    px={6}
    textAlign="center"
  >
    <Skeleton w={48} h={48} borderRadius="base" />
  </Center>
);

export const ConnectModalQRCodeBaseStyle = (theme: string) => {
  return {
    w: 80,
    justifyContent: 'center',
    alignItems: 'center',
    spacing: 4,
    p: 6,
    pb: 10,
    '>.connect-modal-qr-code-description': {
      fontWeight: 'medium',
      textAlign: 'center',
      opacity: 0.75,
      px: 4,
      pb: 1.5
    },
    '>.connect-modal-qr-code-box': {
      w: 'full',
      border: '1px solid',
      borderColor: `connect-modal-qr-code-border-color-${theme}`,
      borderRadius: 'lg',
      boxShadow: `connect-modal-qr-code-shadow-${theme}`,
      p: 5
    }
  };
};

export const ConnectModalQRCode = ({
  link,
  description,
  qrCodeSize = 230,
  loading,
  className = 'connect-modal-qr-code',
  styleProps
}: QRCodeType) => {
  const { theme } = useContext(ThemeContext);
  return (
    <Stack
      className={className}
      sx={styleProps ? styleProps : ConnectModalQRCodeBaseStyle(theme)}
    >
      {description ? (
        <Text className="connect-modal-qr-code-description">{description}</Text>
      ) : undefined}
      {loading ? (
        <ConnectModalQRCodeSkeleton />
      ) : (
        <Center className="connect-modal-qr-code-box">
          <QRCodeSVG
            value={link}
            size={qrCodeSize}
            bgColor={`var(--chakra-colors-connect-modal-qr-code-qr-background-color-${theme})`}
            fgColor={`var(--chakra-colors-connect-modal-qr-code-qr-text-color-${theme})`}
            level={'L'}
            includeMargin={false}
          />
        </Center>
      )}
    </Stack>
  );
};
