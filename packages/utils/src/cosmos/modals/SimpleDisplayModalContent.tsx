import { Box, Center, Flex, Icon, Image, Stack, Text } from '@chakra-ui/react';
import React, { useContext, useEffect, useRef, useState } from 'react';

import {
  AnimateBox,
  ConnectModalContentType,
  LoadingVariants,
  LogoStatus,
  ThemeContext
} from '../../index';

function handleStatusColor(theme: string, status: LogoStatus) {
  switch (status) {
    case LogoStatus.Loading:
      return {
        border: `simple-display-modal-content-loading-border-color-${theme}`,
        text: `simple-display-modal-content-loading-header-text-color-${theme}`
      };
    case LogoStatus.Warning:
      return {
        border: `simple-display-modal-content-warning-border-color-${theme}`,
        text: `simple-display-modal-content-warning-header-text-color-${theme}`
      };
    case LogoStatus.Error:
      return {
        border: `simple-display-modal-content-error-border-color-${theme}`,
        text: `simple-display-modal-content-error-header-text-color-${theme}`
      };
    default:
      return undefined;
  }
}

export const SimpleDisplayModalContentBaseStyle = (
  theme: string,
  status: LogoStatus
) => {
  return {
    w: 80,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    px: 4,
    pt: 6,
    pb: 8,
    '>.modal-content-logo': {
      position: 'relative',
      mx: 'auto',
      w: 20,
      h: 20,
      minW: 20,
      minH: 20,
      maxW: 20,
      maxH: 20,
      mb: 4,
      '>.modal-content-logo-status': {
        position: 'absolute',
        top: status === LogoStatus.Loading ? -1.5 : -2,
        right: status === LogoStatus.Loading ? -1.5 : -2,
        bottom: status === LogoStatus.Loading ? -1.5 : -2,
        left: status === LogoStatus.Loading ? -1.5 : -2,
        border: '2px solid',
        borderTopColor:
          status === LogoStatus.Loading
            ? 'transparent'
            : handleStatusColor(theme, status)?.border,
        borderBottomColor:
          status === LogoStatus.Loading
            ? 'transparent'
            : handleStatusColor(theme, status)?.border,
        borderLeftColor: handleStatusColor(theme, status)?.border,
        borderRightColor: handleStatusColor(theme, status)?.border,
        borderRadius: 'full'
      },
      '>.modal-content-image': {
        p: status ? 3.5 : 0
      }
    },
    '>.modal-content-header': {
      fontWeight: 'semibold',
      color: handleStatusColor(theme, status)?.text
    },
    '>.modal-content-description': {
      position: 'relative',
      '>.modal-content-description-box': {
        fontSize: 'sm',
        lineHeight: 1.3,
        opacity: 0.7,
        whiteSpace: 'pre-line',
        px: 8,
        pt: 1,
        maxH: 28,
        overflowY: 'scroll',
        // For Firefox
        scrollbarWidth: 'none',
        // For Chrome and other browsers except Firefox
        '&::-webkit-scrollbar': {
          display: 'none'
        }
      },
      '>.modal-content-description-animate-shadow': {
        position: 'absolute',
        left: 0,
        bottom: 0,
        w: 'full',
        bg: `simple-display-modal-content-shadow-background-color-${theme}`
      }
    },
    '>.modal-content-username': {
      alignItems: 'center',
      fontSize: 'lg',
      fontWeight: 'semibold',
      '>.modal-content-username-image': {
        w: 4,
        h: 4,
        minW: 4,
        minH: 4,
        maxW: 4,
        maxH: 4
      }
    },
    '>.modal-content-address-button': {
      w: 'full',
      pt: 2.5,
      px: 8
    },
    '>.modal-content-bottom-button': {
      w: 'full',
      pt: 3.5,
      px: 5
    },
    '>.modal-content-bottom-link': {
      w: 'full',
      pt: 2
    }
  };
};

export const SimpleDisplayModalContent = ({
  status,
  logo,
  contentHeader,
  contentDesc,
  username,
  walletIcon,
  addressButton,
  bottomButton,
  bottomLink,
  className,
  styleProps
}: ConnectModalContentType) => {
  const { theme } = useContext(ThemeContext);
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
      className={className}
      sx={
        styleProps
          ? styleProps
          : SimpleDisplayModalContentBaseStyle(theme, status)
      }
    >
      {logo ? (
        <Center className="modal-content-logo">
          {status === 'loading' ? (
            <AnimateBox
              className="modal-content-logo-status"
              initial="hidden"
              animate="animate"
              variants={LoadingVariants}
            ></AnimateBox>
          ) : undefined}
          {status === 'warning' || status === 'error' ? (
            <Box className="modal-content-logo-status"></Box>
          ) : undefined}
          <Center className="modal-content-image">
            {typeof logo === 'string' ? (
              <Image src={logo} w="full" h="full" alt="logo" />
            ) : (
              <Icon as={logo} w="full" h="full" />
            )}
          </Center>
        </Center>
      ) : undefined}
      {contentHeader ? (
        <Text className="modal-content-header">{contentHeader}</Text>
      ) : undefined}
      {contentDesc ? (
        <Box className="modal-content-description">
          <Box ref={descRef} className="modal-content-description-box">
            <Text>{contentDesc}</Text>
          </Box>
          <AnimateBox
            className="modal-content-description-animate-shadow"
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
        <Stack isInline={true} className="modal-content-username">
          <Center className="modal-content-username-image">
            <Image src={walletIcon} alt="wallet-icon" />
          </Center>
          <Text>{username}</Text>
        </Stack>
      ) : undefined}
      {addressButton ? (
        <Box className="modal-content-address-button">{addressButton}</Box>
      ) : undefined}
      {bottomButton ? (
        <Box className="modal-content-bottom-button">{bottomButton}</Box>
      ) : undefined}
      {bottomLink ? (
        <Center className="modal-content-bottom-link">{bottomLink}</Center>
      ) : undefined}
    </Flex>
  );
};
