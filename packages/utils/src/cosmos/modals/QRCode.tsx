import {
  Box,
  Center,
  IconButton,
  Skeleton,
  Stack,
  Text
} from '@chakra-ui/react';
import { QRCodeSVG } from 'qrcode.react';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { IoReloadOutline } from 'react-icons/io5';

import {
  AnimateBox,
  QRCodeDisplayErrorType,
  QRCodeStatus,
  QRCodeType,
  ThemeContext
} from '../../index';

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

export const QRCodeDisplayError = ({
  theme,
  qrCodeSize,
  onRefresh
}: QRCodeDisplayErrorType) => {
  return (
    <Center className="qr-code">
      <Box className="qr-code-blur" filter="auto" blur="md" />
      <Center className="qr-code-refresh-button-box">
        <IconButton
          className="qr-code-refresh-button"
          aria-label="refresh-button"
          icon={<IoReloadOutline />}
          size="lg"
          onClick={onRefresh}
        />
      </Center>
      <QRCodeSVG
        className="qr-code-svg"
        value={'https://'}
        size={qrCodeSize}
        bgColor={`var(--chakra-colors-qr-code-qr-background-color-${theme})`}
        fgColor={`var(--chakra-colors-qr-code-qr-text-color-${theme})`}
        level={'L'}
        includeMargin={false}
      />
    </Center>
  );
};

export const QRCodeBaseStyle = (theme: string, status: QRCodeStatus) => {
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
      position: 'relative',
      w: 'full',
      border: '1px solid',
      borderColor: `qr-code-border-color-${theme}`,
      borderRadius: 'lg',
      boxShadow: `qr-code-shadow-${theme}`,
      p: 5,
      '>.qr-code-refresh-button-box': {
        position: 'absolute',
        w: 'full',
        h: 'full',
        zIndex: 3,
        '>.qr-code-refresh-button': {
          bg: `qr-code-qr-background-color-${theme}`,
          color: `qr-code-qr-text-color-${theme}`,
          borderRadius: 'full',
          boxShadow: `qr-code-button-shadow-${theme}`
        }
      },
      '>.qr-code-blur': {
        position: 'absolute',
        w: 'full',
        h: 'full',
        zIndex: 2,
        borderRadius: 'lg',
        blur: 'md',
        bg: `qr-code-qr-blur-background-color-${theme}`
      },
      '>.qr-code-svg': {
        opacity: 0.5
      }
    },
    '>.qr-code-error-title': {
      fontWeight: 'medium',
      textAlign: 'center',
      pt: 2,
      '&.qr-code-error': {
        color: `qr-code-qr-error-text-color-${theme}`
      },
      '&.qr-code-expired': {
        color: `qr-code-qr-expired-text-color-${theme}`
      }
    },
    '>.qr-code-error-desc-box': {
      position: 'relative',
      '>.qr-code-error-desc': {
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
      '>.qr-code-error-desc-animate-shadow': {
        position: 'absolute',
        left: 0,
        bottom: 0,
        w: 'full',
        bg: `qr-code-shadow-background-color-${theme}`
      }
    }
  };
};

export const QRCode = ({
  status,
  link,
  description,
  qrCodeSize = 230,
  errorTitle,
  errorDesc,
  className,
  styleProps,
  onRefresh
}: QRCodeType) => {
  const { theme } = useContext(ThemeContext);
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
      sx={styleProps ? styleProps : QRCodeBaseStyle(theme, status)}
    >
      {description ? (
        <Text className="qr-code-description">{description}</Text>
      ) : undefined}
      {status === QRCodeStatus.Pending ? <QRCodeSkeleton /> : undefined}
      {status === QRCodeStatus.Done ? (
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
      ) : undefined}
      {status === QRCodeStatus.Error || status === QRCodeStatus.Expired ? (
        <QRCodeDisplayError
          theme={theme}
          qrCodeSize={qrCodeSize}
          onRefresh={onRefresh}
        />
      ) : undefined}
      {errorTitle ? (
        <Text
          className={`qr-code-error-title ${
            status === QRCodeStatus.Error ? 'qr-code-error' : ''
          } ${status === QRCodeStatus.Expired ? 'qr-code-expired' : ''}`}
        >
          {errorTitle}
        </Text>
      ) : undefined}
      {errorDesc ? (
        <Box className="qr-code-error-desc-box">
          <Box ref={descRef} className="qr-code-error-desc">
            <Text>{errorDesc}</Text>
          </Box>
          <AnimateBox
            className="qr-code-error-desc-animate-shadow"
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
