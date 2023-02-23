import { Box, Center, Flex, Icon, Image, Stack, Text } from '@chakra-ui/react';
import { AnimateBox, LoadingVariants } from '@cosmology-ui/animation';
import { useTheme } from '@cosmology-ui/theme';
import React, { useEffect, useRef, useState } from 'react';

import { ConnectModalContentType, LogoStatus } from './type';

function handleLogoStatus(status: LogoStatus) {
  switch (status) {
    case LogoStatus.Loading:
      return (
        <AnimateBox
          className="connect-modal-content-loading"
          initial="hidden"
          animate="animate"
          variants={LoadingVariants}
        ></AnimateBox>
      );
    case LogoStatus.Warning:
      return (
        <Box className="connect-modal-content-logo-status connect-modal-content-warning"></Box>
      );
    case LogoStatus.Error:
      return (
        <Box className="connect-modal-content-logo-status connect-modal-content-error"></Box>
      );

    default:
      break;
  }
}

export const ConnectModalContentBaseStyle = (theme: string) => {
  return {
    w: 80,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    px: 4,
    pt: 2,
    pb: 8,
    '&.connect-modal-loading': {
      mb: 1.5
    },
    '>.connect-modal-content-logo': {
      position: 'relative',
      mx: 'auto',
      '&.connect-modal-logo-img': {
        w: 20,
        h: 20,
        minW: 20,
        minH: 20,
        maxW: 20,
        maxH: 20,
        mt: 4,
        mb: 4
      },
      '&.connect-modal-logo-svg': {
        w: 24,
        h: 24,
        minW: 24,
        minH: 24,
        maxW: 24,
        maxH: 24,
        mt: 1,
        mb: 0.5
      },
      '>.connect-modal-content-loading': {
        position: 'absolute',
        top: -1.5,
        right: -1.5,
        bottom: -1.5,
        left: -1.5,
        border: '2px solid',
        borderTopColor: 'transparent',
        borderBottomColor: 'transparent',
        borderLeftColor: `connect-modal-content-loading-border-color-${theme}`,
        borderRightColor: `connect-modal-content-loading-border-color-${theme}`,
        borderRadius: 'full'
      },
      '>.connect-modal-content-logo-status': {
        position: 'absolute',
        top: -2,
        right: -2,
        bottom: -2,
        left: -2,
        border: '2px solid',
        borderRadius: 'full',
        '&.connect-modal-content-warning': {
          borderTopColor: `connect-modal-content-warning-border-color-${theme}`,
          borderBottomColor: `connect-modal-content-warning-border-color-${theme}`,
          borderLeftColor: `connect-modal-content-warning-border-color-${theme}`,
          borderRightColor: `connect-modal-content-warning-border-color-${theme}`
        },
        '&.connect-modal-content-error': {
          borderTopColor: `connect-modal-content-error-border-color-${theme}`,
          borderBottomColor: `connect-modal-content-error-border-color-${theme}`,
          borderLeftColor: `connect-modal-content-error-border-color-${theme}`,
          borderRightColor: `connect-modal-content-error-border-color-${theme}`
        }
      },
      '>.connect-modal-content-image': {
        '>svg': { p: 0.5 },
        '>img': { p: 3.5 }
      }
    },
    '>.connect-modal-content-header': {
      fontWeight: 'semibold',
      '&.connect-modal-content-loading': {
        color: `connect-modal-content-loading-header-text-color-${theme}`
      },
      '&.connect-modal-content-warning': {
        color: `connect-modal-content-warning-header-text-color-${theme}`
      },
      '&.connect-modal-content-error': {
        color: `connect-modal-content-error-header-text-color-${theme}`
      }
    },
    '>.connect-modal-content-description': {
      mt: 1,
      mb: 1.5,
      position: 'relative',
      '>.connect-modal-content-description-box': {
        fontSize: 'sm',
        lineHeight: 'shorter',
        opacity: 0.7,
        whiteSpace: 'pre-line',
        px: 8,
        maxH: 28,
        overflowY: 'scroll',
        // For Firefox
        scrollbarWidth: 'none',
        // For Chrome and other browsers except Firefox
        '&::-webkit-scrollbar': {
          display: 'none'
        }
      },
      '>.connect-modal-content-description-animate-shadow': {
        position: 'absolute',
        left: 0,
        bottom: 0,
        w: 'full',
        bg: `connect-modal-content-shadow-background-color-${theme}`
      }
    },
    '>.connect-modal-content-username': {
      mb: 1,
      alignItems: 'center',
      fontSize: 'md',
      fontWeight: 'semibold',
      '>.connect-modal-content-username-image': {
        w: 4,
        h: 4,
        minW: 4,
        minH: 4,
        maxW: 4,
        maxH: 4
      }
    },
    '>.connect-modal-content-address-button': {
      w: 'full',
      pt: 1.5,
      px: 8
    },
    '>.connect-modal-content-bottom-button': {
      w: 'full',
      pt: 3,
      pb: 1,
      px: 5
    },
    '>.connect-modal-content-bottom-link': {
      pt: 1,
      opacity: 0.7,
      fontSize: 'sm',
      textDecoration: 'none',
      _hover: { opacity: 0.85 }
    }
  };
};

export const ConnectModalContent = ({
  status,
  logo,
  contentHeader,
  contentDesc,
  username,
  walletIcon,
  addressButton,
  bottomButton,
  bottomLink,
  className = 'connect-modal-content',
  styleProps
}: ConnectModalContentType) => {
  const { theme } = useTheme();
  const descRef = useRef(null);
  const [displayBlur, setDisplayBlur] = useState(false);

  useEffect(() => {
    if (descRef.current) {
      if (descRef.current.clientHeight >= 112) setDisplayBlur(true);
      if (descRef.current.clientHeight < 112) setDisplayBlur(false);
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
  }, [descRef, contentDesc]);

  return (
    <Flex
      className={`${className} ${
        status === LogoStatus.Loading ? 'connect-modal-loading' : ''
      }`}
      sx={styleProps ? styleProps : ConnectModalContentBaseStyle(theme)}
    >
      {logo ? (
        <Center
          className={`connect-modal-content-logo ${
            typeof logo === 'string'
              ? 'connect-modal-logo-img'
              : 'connect-modal-logo-svg'
          }`}
        >
          {handleLogoStatus(status)}
          <Center className="connect-modal-content-image">
            {typeof logo === 'string' ? (
              <Image src={logo} w="full" h="full" alt="logo" />
            ) : (
              <Icon as={logo} w="full" h="full" />
            )}
          </Center>
        </Center>
      ) : undefined}
      {contentHeader ? (
        <Text
          className={`connect-modal-content-header connect-modal-content-${status}`}
        >
          {contentHeader}
        </Text>
      ) : undefined}
      {contentDesc ? (
        <Box className="connect-modal-content-description">
          <Box ref={descRef} className="connect-modal-content-description-box">
            <Text>{contentDesc}</Text>
          </Box>
          <AnimateBox
            className="connect-modal-content-description-animate-shadow"
            initial={false}
            animate={
              displayBlur
                ? {
                    opacity: 1,
                    height: 36,
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
      {username ? (
        <Stack isInline={true} className="connect-modal-content-username">
          <Center className="connect-modal-content-username-image">
            <Image src={walletIcon} alt="wallet-icon" />
          </Center>
          <Text>{username}</Text>
        </Stack>
      ) : undefined}
      {addressButton ? (
        <Box className="connect-modal-content-address-button">
          {addressButton}
        </Box>
      ) : undefined}
      {bottomButton ? (
        <Box className="connect-modal-content-bottom-button">
          {bottomButton}
        </Box>
      ) : undefined}
      {bottomLink ? (
        <Center className="connect-modal-content-bottom-link">
          {bottomLink}
        </Center>
      ) : undefined}
    </Flex>
  );
};
