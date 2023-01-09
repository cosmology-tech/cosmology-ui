import { Center, Stack, Text } from '@chakra-ui/react';
import { QRCodeSVG } from 'qrcode.react';
import React from 'react';

import { QRCodeType } from '../../index';

export const QRCodeBaseStyle = (theme: string) => {
  return {
    w: 80,
    justifyContent: 'center',
    alignItems: 'center',
    spacing: 4,
    p: 6,
    pb: 10,
    '>.description': {
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
  theme = 'light',
  className,
  styleProps = QRCodeBaseStyle(theme)
}: QRCodeType) => {
  return (
    <Stack className={className} sx={styleProps}>
      {description ? (
        <Text className="description">{description}</Text>
      ) : undefined}
      <Center className="qr-code">
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
