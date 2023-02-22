import { Box, Flex, Grid, GridItem, Icon, Image, Text } from '@chakra-ui/react';
import React, {
  RefObject,
  useContext,
  useEffect,
  useRef,
  useState
} from 'react';

import {
  AnimateGridItem,
  ButtonShape,
  DisplayWalletListType,
  ThemeContext
} from '../../index';

export const SimpleDisplayWalletListBaseStyle = (
  theme: string,
  dataLength: number
) => ({
  position: 'relative',
  justifyContent: dataLength > 1 ? 'start' : 'center',
  gridTemplateColumns: {
    base: '1fr',
    md: dataLength > 1 ? '1fr 1fr' : 'var(--chakra-space-36)'
  },
  gridTemplateRows: { base: 'min-content', md: 'auto' },
  columnGap: 2.5,
  rowGap: 1,
  maxH: 80,
  minH: { base: 24, md: 36 },
  w: 80,
  overflowY: 'scroll',
  py: 0.5,
  px: 4,
  mt: 0.5,
  scrollbarWidth: 'none', // for firefox
  '::-webkit-scrollbar': {
    display: 'none' // for chrome
  },
  '~.simple-display-wallet-list-animate-shadow': {
    position: 'absolute',
    bottom: 4,
    w: 'full',
    background: `simple-display-wallet-list-shadow-background-color-${theme}`
  }
});

export const SimpleDisplayWalletListItemBaseStyle = (
  theme: string,
  buttonShape: ButtonShape,
  index: number
) => {
  return {
    gridColumn: { base: 'span 2', md: index > 1 ? 'span 2' : 'auto' },
    display: 'flex',
    flexDirection: {
      base: 'row',
      md: buttonShape === ButtonShape.Square ? 'column' : 'row'
    },
    justifyContent: {
      base: 'start',
      md: buttonShape === ButtonShape.Square ? 'center' : 'start'
    },
    alignItems: 'center',
    position: 'relative',
    w: 'full',
    h: 'full',
    p: 2,
    py: { md: buttonShape === ButtonShape.Square ? 7 : 2 },
    mt: { md: buttonShape === ButtonShape.Square ? 0 : 1 },
    borderRadius: 'md',
    whiteSpace: 'break-spaces',
    fontSize: 'sm',
    fontWeight: 'normal',
    lineHeight: 'none',
    textAlign: {
      base: 'start',
      md: buttonShape === ButtonShape.Square ? 'center' : 'start'
    },
    transition: 'all .1s ease-in-out',
    color: `simple-display-wallet-list-button-text-color-${theme}`,
    bg: `simple-display-wallet-list-button-background-color-${theme}`,
    _hover: {
      boxShadow: '0 0 0 1px #6A66FF',
      bg: `simple-display-wallet-list-button-hover-background-color-${theme}`
    },
    _focus: {
      borderRadius: 'md',
      boxShadow: '0 0 0 1px #6A66FF'
    },
    '>.simple-display-wallet-list-text': {
      flex: buttonShape === ButtonShape.Rectangle ? 1 : 'none'
    },
    '>.simple-display-wallet-list-icon': {
      position: 'relative',
      mr: { base: 4, md: buttonShape === ButtonShape.Square ? 0 : 4 },
      mb: { base: 0, md: buttonShape === ButtonShape.Square ? 2.5 : 0 },
      w: { base: 8, md: buttonShape === ButtonShape.Square ? 14 : 8 },
      h: { base: 8, md: buttonShape === ButtonShape.Square ? 14 : 8 },
      minW: { base: 8, md: buttonShape === ButtonShape.Square ? 14 : 8 },
      minH: { base: 8, md: buttonShape === ButtonShape.Square ? 14 : 8 },
      maxW: { base: 8, md: buttonShape === ButtonShape.Square ? 14 : 8 },
      maxH: { base: 8, md: buttonShape === ButtonShape.Square ? 14 : 8 },
      '>.simple-display-wallet-list-sub-icon': {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        border: '2px solid',
        bg: `simple-display-wallet-list-button-background-color-${theme}`,
        borderColor: `simple-display-wallet-list-icon-border-color-${theme}`,
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
    },
    '>.simple-display-wallet-list-sub-icon': {
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
    },
    '+.simple-display-wallet-button:hover>.simple-display-wallet-list-icon>.simple-display-wallet-list-sub-icon':
      {
        bg: `simple-display-wallet-list-button-hover-background-color-${theme}`,
        borderColor: `simple-display-wallet-list-hover-icon-border-color-${theme}`
      }
  };
};

export const SimpleDisplayWalletListAnimateBaseStyle = (theme: string) => ({
  position: 'absolute',
  bottom: 4,
  w: 'full',
  background: `simple-display-wallet-list-shadow-background-color-${theme}`
});

export const SimpleDisplayWalletListBaseShadowAnimate = (
  displayBlur: boolean
) =>
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

export const SimpleDisplayWalletList = ({
  initialFocus,
  walletsData,
  className,
  styleProps: listStyleProps,
  shadowAnimateProps = SimpleDisplayWalletListBaseShadowAnimate(false)
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
    setAnimateShadow(SimpleDisplayWalletListBaseShadowAnimate(displayBlur));
  }, [displayBlur]);

  return (
    <Box className={className} position="relative" pb={4}>
      <Grid
        ref={listRef}
        sx={
          listStyleProps
            ? listStyleProps
            : SimpleDisplayWalletListBaseStyle(theme, walletsData.length)
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
                className="simple-display-wallet-button"
                ref={
                  i === 0
                    ? (initialFocus as unknown as RefObject<
                        HTMLButtonElement & HTMLDivElement
                      >)
                    : null
                }
                sx={
                  styleProps
                    ? styleProps
                    : SimpleDisplayWalletListItemBaseStyle(
                        theme,
                        buttonShape,
                        i
                      )
                }
                onClick={onClick}
              >
                <Box className="simple-display-wallet-list-icon">
                  {typeof logo === 'string' ? (
                    <Image src={logo} alt={prettyName} />
                  ) : (
                    <Icon as={logo} />
                  )}
                  {subLogo && buttonShape === ButtonShape.Square ? (
                    <Flex className="simple-display-wallet-list-sub-icon">
                      {typeof subLogo === 'string' ? (
                        <Image src={subLogo} alt="wallet-icon" />
                      ) : (
                        <Icon as={subLogo} w="full" h="full" />
                      )}
                    </Flex>
                  ) : undefined}
                </Box>
                <Text className="simple-display-wallet-list-text">
                  {prettyName}
                </Text>
                {subLogo && buttonShape !== ButtonShape.Square ? (
                  <Box className="simple-display-wallet-list-sub-icon">
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
        className="simple-display-wallet-list-animate-shadow"
        initial={false}
        animate={animateShadow}
        style={{ marginTop: 0 }}
      ></AnimateGridItem>
    </Box>
  );
};
