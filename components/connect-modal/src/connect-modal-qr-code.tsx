import {
  Box,
  Center,
  IconButton,
  Skeleton,
  Stack,
  Text
} from '@chakra-ui/react';
import { AnimateBox } from '@cosmology-ui/animation';
import { useTheme } from '@cosmology-ui/theme';
import { QRCodeSVG } from 'qrcode.react';
import React, { useEffect, useRef, useState } from 'react';
import { IoReloadOutline } from 'react-icons/io5';

import { QRCodeDisplayErrorType, QRCodeStatus, QRCodeType } from './type';

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

export const ConnectModalQRCodeDisplayError = ({
  theme,
  qrCodeSize,
  onRefresh
}: QRCodeDisplayErrorType) => {
  return (
    <Center className="connect-modal-qr-code-box">
      <Box className="connect-modal-qr-code-blur" filter="auto" blur="md" />
      <Center className="connect-modal-qr-code-refresh-button-box">
        <IconButton
          className="connect-modal-qr-code-refresh-button"
          aria-label="refresh-button"
          icon={<IoReloadOutline />}
          size="lg"
          onClick={onRefresh}
        />
      </Center>
      <QRCodeSVG
        className="connect-modal-qr-code-svg"
        value={'https://'}
        size={qrCodeSize}
        bgColor={`var(--chakra-colors-connect-modal-qr-code-qr-background-color-${theme})`}
        fgColor={`var(--chakra-colors-connect-modal-qr-code-qr-text-color-${theme})`}
        level={'L'}
        includeMargin={false}
      />
    </Center>
  );
};

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
      color: `connect-modal-qr-code-text-color-${theme}`,
      opacity: 0.75,
      px: 4,
      pb: 1.5
    },
    '>.connect-modal-qr-code-box': {
      position: 'relative',
      w: 'full',
      border: '1px solid',
      borderColor: `connect-modal-qr-code-border-color-${theme}`,
      borderRadius: 'lg',
      boxShadow: `connect-modal-qr-code-shadow-${theme}`,
      p: 5,
      '>.connect-modal-qr-code-svg': {
        opacity: 0.5
      },
      '>.connect-modal-qr-code-refresh-button-box': {
        position: 'absolute',
        zIndex: 2,
        '>.connect-modal-qr-code-refresh-button': {
          bg: `connect-modal-qr-code-qr-background-color-${theme}`,
          color: `connect-modal-qr-code-qr-text-color-${theme}`,
          borderRadius: 'full',
          boxShadow: `connect-modal-qr-code-refresh-button-shadow-${theme}`
        }
      },
      '>.connect-modal-qr-code-blur': {
        position: 'absolute',
        zIndex: 1,
        w: 'full',
        h: 'full',
        borderRadius: 'lg',
        bg: `connect-modal-qr-code-blur-qr-background-color-${theme}`
      }
    },
    '>.connect-modal-qr-code-error-title': {
      fontWeight: 'medium',
      textAlign: 'center',
      pt: 2,
      '&.connect-modal-qr-code-error': {
        color: `connect-modal-qr-code-error-text-color-${theme}`
      },
      '&.connect-modal-qr-code-expired': {
        color: `connect-modal-qr-code-expired-text-color-${theme}`
      }
    },
    '>.connect-modal-qr-code-error-desc-box': {
      position: 'relative',
      '>.connect-modal-qr-code-error-desc': {
        maxH: 16,
        px: 1,
        overflowX: 'hidden',
        overflowY: 'auto',
        scrollbarWidth: 'none', // For Firefox
        '&::-webkit-scrollbar': {
          // For Chrome and other browsers except Firefox
          display: 'none'
        },
        fontSize: 'sm',
        fontWeight: 'base',
        textAlign: 'center',
        lineHeight: 'shorter',
        opacity: 0.75
      },
      '>.connect-modal-qr-code-error-desc-animate-shadow': {
        position: 'absolute',
        left: 0,
        bottom: 0,
        w: 'full',
        bg: `connect-modal-qr-code-shadow-background-color-${theme}`
      }
    }
  };
};

export const ConnectModalQRCode = ({
  qrCodeStatus,
  link,
  description,
  qrCodeSize = 230,
  errorTitle,
  errorDesc,
  className = 'connect-modal-qr-code',
  styleProps,
  onRefresh
}: QRCodeType) => {
  const { theme } = useTheme();
  const descRef = useRef<HTMLDivElement>(null);
  const [displayBlur, setDisplayBlur] = useState(false);

  useEffect(() => {
    if (descRef.current) {
      if (descRef.current.clientHeight >= 64) setDisplayBlur(true);
      if (descRef.current.clientHeight < 64) setDisplayBlur(false);
      const scrollHandler = () => {
        const height = Math.abs(
          descRef.current.scrollHeight -
            descRef.current.clientHeight -
            descRef.current.scrollTop
        );
        if (height < 1) setDisplayBlur(false);
        if (height >= 1) setDisplayBlur(true);
      };

      descRef.current.addEventListener('scroll', scrollHandler);
    }
  }, [descRef, errorDesc]);

  return (
    <Stack
      className={className}
      sx={styleProps ? styleProps : ConnectModalQRCodeBaseStyle(theme)}
    >
      {description ? (
        <Text className="connect-modal-qr-code-description">{description}</Text>
      ) : undefined}
      {qrCodeStatus === QRCodeStatus.Pending ? (
        <ConnectModalQRCodeSkeleton />
      ) : undefined}
      {qrCodeStatus === QRCodeStatus.Done ? (
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
      ) : undefined}
      {qrCodeStatus === QRCodeStatus.Error ||
      qrCodeStatus === QRCodeStatus.Expired ? (
        <ConnectModalQRCodeDisplayError
          theme={theme}
          qrCodeSize={qrCodeSize}
          onRefresh={onRefresh}
        />
      ) : undefined}
      {errorTitle ? (
        <Text
          className={`connect-modal-qr-code-error-title ${
            qrCodeStatus === QRCodeStatus.Error
              ? 'connect-modal-qr-code-error'
              : ''
          } ${
            qrCodeStatus === QRCodeStatus.Expired
              ? 'connect-modal-qr-code-expired'
              : ''
          }`}
        >
          {errorTitle}
        </Text>
      ) : undefined}
      {errorDesc ? (
        <Box className="connect-modal-qr-code-error-desc-box">
          <Box ref={descRef} className="connect-modal-qr-code-error-desc">
            <Text>{errorDesc}</Text>
          </Box>
          <AnimateBox
            className="connect-modal-qr-code-error-desc-animate-shadow"
            initial={false}
            animate={
              displayBlur
                ? {
                    opacity: 1,
                    height: 28,
                    transition: {
                      type: 'spring',
                      duration: 0.1
                    }
                  }
                : {
                    height: 0,
                    opacity: 0,
                    transition: {
                      type: 'spring',
                      duration: 0.2
                    }
                  }
            }
          ></AnimateBox>
        </Box>
      ) : undefined}
    </Stack>
  );
};
