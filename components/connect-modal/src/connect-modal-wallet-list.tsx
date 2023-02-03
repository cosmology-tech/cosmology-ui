import { Box, Flex, Grid, GridItem, Icon, Image, Text } from '@chakra-ui/react';
import { AnimateGridItem } from '@cosmology-ui/animation';
import { ThemeContext } from '@cosmology-ui/theme';
import React, {
  RefObject,
  useContext,
  useEffect,
  useRef,
  useState
} from 'react';

import { ButtonShape, DisplayWalletListType } from './type';

export const ConnectModalWalletListBaseStyle = (theme: string) => ({
  position: 'relative',
  justifyContent: 'center',
  gridTemplateColumns: {
    base: '1fr',
    md: '1fr 1fr'
  },
  gridTemplateRows: { base: 'max-content', md: 'auto' },
  columnGap: 2.5,
  rowGap: 1,
  maxH: 80,
  minH: 36,
  w: 80,
  overflowY: 'scroll',
  pt: 0.5,
  pb: 1.5,
  px: 4,
  mt: 0.5,
  scrollbarWidth: 'none', // for firefox
  '::-webkit-scrollbar': {
    display: 'none' // for chrome
  },
  '&.connect-modal-wallet-list-single': {
    justifyContent: 'center',
    gridTemplateColumns: {
      base: '1fr',
      md: 'var(--chakra-space-36)'
    }
  },
  '>.connect-modal-wallet-list-item': {
    display: 'flex',
    gridColumn: 'span 2',
    justifyContent: 'start',
    alignItems: 'center',
    position: 'relative',
    w: 'full',
    h: 'full',
    p: 2,
    py: { md: 2 },
    mt: { md: 1 },
    borderRadius: 'md',
    whiteSpace: 'break-spaces',
    fontSize: 'sm',
    fontWeight: 'normal',
    lineHeight: 1.1,
    textAlign: 'start',
    transition: 'all .1s ease-in-out',
    color: `connect-modal-wallet-list-button-text-color-${theme}`,
    bg: `connect-modal-wallet-list-button-background-color-${theme}`,
    _hover: {
      boxShadow: `connect-modal-wallet-list-button-hover-shadow-${theme}`,
      bg: `connect-modal-wallet-list-button-hover-background-color-${theme}`,
      '&.connect-modal-wallet-list-item-square>.connect-modal-wallet-list-icon>.connect-modal-wallet-list-sub-icon-small':
        {
          borderColor: `connect-modal-wallet-list-hover-icon-border-color-${theme}`
        }
    },
    _focus: {
      borderRadius: 'md',
      boxShadow: `connect-modal-wallet-list-button-hover-shadow-${theme}`
    },
    '&.connect-modal-wallet-list-item-single': {
      gridColumn: { base: 'span 2', md: 'auto' }
    },
    '&.connect-modal-wallet-list-item-square': {
      flexDirection: {
        base: 'row',
        md: 'column'
      },
      textAlign: {
        base: 'start',
        md: 'center'
      },
      justifyContent: 'center',
      py: { md: 7 },
      mt: { md: 0 },
      '>.connect-modal-wallet-list-icon': {
        position: 'relative',
        mr: { base: 4, md: 0 },
        mb: { base: 0, md: 3 },
        w: { base: 8, md: 14 },
        h: { base: 8, md: 14 },
        minW: { base: 8, md: 14 },
        minH: { base: 8, md: 14 },
        maxW: { base: 8, md: 14 },
        maxH: { base: 8, md: 14 },
        '>.connect-modal-wallet-list-sub-icon-small': {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'hidden',
          border: '2px solid',
          bg: `connect-modal-wallet-list-button-background-color-${theme}`,
          borderColor: `connect-modal-wallet-list-icon-border-color-${theme}`,
          borderRadius: 'full',
          position: 'absolute',
          bottom: -1.5,
          right: -2,
          mr: 0,
          w: 6,
          h: 6,
          minW: 6,
          minH: 6,
          maxW: 6,
          maxH: 6
        }
      }
    },
    '>.connect-modal-wallet-list-icon': {
      mr: { base: 4, md: 4 },
      mb: { base: 0, md: 0 },
      w: { base: 8, md: 8 },
      h: { base: 8, md: 8 },
      minW: { base: 8, md: 8 },
      minH: { base: 8, md: 8 },
      maxW: { base: 8, md: 8 },
      maxH: { base: 8, md: 8 }
    },
    '>.connect-modal-wallet-list-sub-icon': {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden',
      border: 'none',
      borderRadius: 'full',
      position: 'static',
      bottom: -1.5,
      right: -2,
      mr: 2,
      w: 5,
      h: 5,
      minW: 5,
      minH: 5,
      maxW: 5,
      maxH: 5
    }
  },
  '~.connect-modal-wallet-list-animate-shadow': {
    position: 'absolute',
    bottom: 4,
    w: 'full',
    background: `connect-modal-wallet-list-shadow-background-color-${theme}`
  }
});

export const ConnectModalWalletListBaseShadowAnimate = (displayBlur: boolean) =>
  displayBlur
    ? {
        opacity: 1,
        height: 24,
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
      };

export const ConnectModalWalletList = ({
  initialFocus,
  walletsData,
  className = 'connect-modal-wallet-list',
  styleProps: listStyleProps,
  shadowAnimateProps = ConnectModalWalletListBaseShadowAnimate(false)
}: DisplayWalletListType) => {
  const { theme } = useContext(ThemeContext);
  const listRef = useRef<HTMLDivElement>(null);
  const [displayBlur, setDisplayBlur] = useState(false);
  const [animateShadow, setAnimateShadow] = useState(shadowAnimateProps);

  useEffect(() => {
    if (listRef.current) {
      if (listRef.current.clientHeight < 320) setDisplayBlur(false);
      if (listRef.current.clientHeight >= 320) setDisplayBlur(true);
      const scrollHandler = () => {
        const height = listRef.current
          ? Math.abs(
              listRef.current.scrollHeight -
                listRef.current.clientHeight -
                listRef.current.scrollTop
            )
          : 0;
        if (height < 1) setDisplayBlur(false);
        if (height >= 1) setDisplayBlur(true);
      };

      listRef.current.addEventListener('scroll', scrollHandler);
    }
  }, [listRef, walletsData]);

  useEffect(() => {
    setAnimateShadow(ConnectModalWalletListBaseShadowAnimate(displayBlur));
  }, [displayBlur]);

  return (
    <Box className={className} position="relative" pb={4}>
      <Grid
        ref={listRef}
        className={`connect-modal-wallet-list-grid-box ${
          walletsData.length < 2 ? 'connect-modal-wallet-list-single' : ''
        }`}
        sx={
          listStyleProps
            ? listStyleProps
            : ConnectModalWalletListBaseStyle(theme)
        }
        gap={0}
      >
        {walletsData.map(
          (
            {
              name,
              prettyName,
              logo,
              subLogo,
              buttonShape,
              styleProps,
              onClick
            },
            i
          ) => {
            return (
              <GridItem
                id={name}
                key={name}
                as="button"
                className={
                  styleProps
                    ? ''
                    : `connect-modal-wallet-list-item ${
                        i < 2 ? 'connect-modal-wallet-list-item-single' : ''
                      } ${
                        buttonShape === ButtonShape.Square
                          ? 'connect-modal-wallet-list-item-square'
                          : ''
                      } ${
                        i === walletsData.length
                          ? 'connect-modal-wallet-list-item-last'
                          : ''
                      }`
                }
                sx={styleProps}
                ref={
                  i === 0
                    ? (initialFocus as unknown as RefObject<
                        HTMLButtonElement & HTMLDivElement
                      >)
                    : null
                }
                onClick={onClick}
              >
                <Box className="connect-modal-wallet-list-icon">
                  {typeof logo === 'string' ? (
                    <Image src={logo} alt={prettyName} />
                  ) : (
                    <Icon as={logo} />
                  )}
                  {subLogo && buttonShape === ButtonShape.Square ? (
                    <Flex className="connect-modal-wallet-list-sub-icon-small">
                      {typeof subLogo === 'string' ? (
                        <Image src={subLogo} alt="wallet-icon" />
                      ) : (
                        <Icon as={subLogo} w="full" h="full" />
                      )}
                    </Flex>
                  ) : undefined}
                </Box>
                <Text flex={buttonShape === ButtonShape.Square ? 'none' : 1}>
                  {prettyName}
                </Text>
                {subLogo && buttonShape !== ButtonShape.Square ? (
                  <Box className="connect-modal-wallet-list-sub-icon">
                    {typeof subLogo === 'string' ? (
                      <Image src={subLogo} alt="wallet-connect" />
                    ) : (
                      <Icon as={subLogo} />
                    )}
                  </Box>
                ) : undefined}
              </GridItem>
            );
          }
        )}
      </Grid>
      <AnimateGridItem
        className="connect-modal-wallet-list-animate-shadow"
        initial={false}
        animate={animateShadow}
        style={{ marginTop: 0 }}
      ></AnimateGridItem>
    </Box>
  );
};
