import { Center, Skeleton, Stack, Text } from '@chakra-ui/react';
import { QRCodeSVG } from 'qrcode.react';
import React, { useContext } from 'react';

import { QRCodeType, ThemeContext } from '../../index';

export const QRCodeSkeleton = () => (
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

export const QRCodeBaseStyle = (theme: string) => {
  return {
    w: 80,
    justifyContent: 'center',
    alignItems: 'center',
    spacing: 4,
    p: 6,
    pb: 10,
    '>.qr-code-description': {
      fontWeight: 'medium',
      textAlign: 'center',
      opacity: 0.75,
      px: 4,
      pb: 1.5
    },
    '>.qr-code': {
      w: 'full',
      border: '1px solid',
      borderColor: `qr-code-border-color-${theme}`,
      borderRadius: 'lg',
      boxShadow: `qr-code-shadow-${theme}`,
      p: 5
    }
  };
};

export const QRCode = ({
  link,
  description,
  qrCodeSize = 230,
  loading,
  className,
  styleProps
}: QRCodeType) => {
  const { theme } = useContext(ThemeContext);
  return (
    <Stack
      className={className}
      sx={styleProps ? styleProps : QRCodeBaseStyle(theme)}
    >
      {description ? (
        <Text className="qr-code-description">{description}</Text>
      ) : undefined}
      {loading ? (
        <QRCodeSkeleton />
      ) : (
        <Center className="qr-code">
          <QRCodeSVG
            value={link}
            size={qrCodeSize}
            bgColor={`var(--chakra-colors-qr-code-qr-background-color-${theme})`}
            fgColor={`var(--chakra-colors-qr-code-qr-text-color-${theme})`}
            level={'L'}
            includeMargin={false}
          />
        </Center>
      )}
    </Stack>
  );
};
