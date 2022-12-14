import {
  Box,
  Button,
  Center,
  Flex,
  Grid,
  GridItem,
  Icon,
  Image,
  Text,
  useBoolean,
  useColorMode
} from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react';

import {
  AnimateBox,
  AnimateGridItem,
  DisplayWalletListType,
  handleChangeColorModeValue,
  ModalContentVariants,
  ModalListType
} from '../../index';

export const SimpleDisplayWalletList = ({
  initialFocus,
  walletsData
}: DisplayWalletListType) => {
  const { colorMode } = useColorMode();
  const listRef = useRef<HTMLDivElement>(null);
  const [displayBlur, setDisplayBlur] = useState(false);
  const [hover, setHover] = useBoolean();
  const [iconBorder, setIconBorder] = useState(
    handleChangeColorModeValue(colorMode, 'gray.100', '#1c222d')
  );

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
    if (hover)
      setIconBorder(
        handleChangeColorModeValue(colorMode, 'gray.50', '#151a25')
      );
    if (!hover)
      setIconBorder(
        handleChangeColorModeValue(colorMode, 'gray.100', '#1c222d')
      );
  }, [colorMode, hover]);

  return (
    <AnimateBox
      initial="hidden"
      animate="enter"
      variants={ModalContentVariants}
    >
      <Grid
        ref={listRef}
        position="relative"
        justifyContent={walletsData.length > 1 ? 'start' : 'center'}
        templateColumns={{
          base: '1fr',
          md: walletsData.length > 1 ? '1fr 1fr' : 'auto'
        }}
        templateRows={{ base: 'max-content', md: 'auto' }}
        columnGap={2.5}
        rowGap={1}
        maxH={80}
        minH={36}
        w={80}
        overflowY="scroll"
        paddingInline={0}
        py={0.5}
        px={4}
        mt={0.5}
        css={{
          // for firefox
          scrollbarWidth: 'none',
          // for chrome
          '::-webkit-scrollbar': {
            display: 'none'
          }
        }}
      >
        {walletsData.map(
          ({ name, prettyName, logo, subLogo, modalListType, onClick }, i) => {
            return (
              <GridItem
                key={i}
                colSpan={{ base: 2, md: i > 1 ? 2 : 'auto' }}
                w="full"
                mb={{ base: 0, md: i > 1 ? 0 : 1 }}
              >
                <Button
                  ref={i === 0 ? initialFocus : null}
                  id={name}
                  key={name}
                  variant="unstyled"
                  display="flex"
                  minW={walletsData.length < 2 ? 36 : 'auto'}
                  w="full"
                  h="full"
                  p={2}
                  py={{ md: i > 1 ? 2 : 6 }}
                  justifyContent="start"
                  alignItems="center"
                  borderRadius="md"
                  whiteSpace="break-spaces"
                  color={handleChangeColorModeValue(
                    colorMode,
                    'blackAlpha.800',
                    'whiteAlpha.800'
                  )}
                  transition="all .1s ease-in-out"
                  bg={handleChangeColorModeValue(
                    colorMode,
                    'gray.100',
                    'blackAlpha.500'
                  )}
                  _hover={{
                    boxShadow: '0 0 0 1px #6A66FF',
                    bg: handleChangeColorModeValue(
                      colorMode,
                      'gray.50',
                      'blackAlpha.600'
                    )
                  }}
                  _focus={{
                    borderRadius: 'md',
                    boxShadow: '0 0 0 1px #6A66FF'
                  }}
                  onClick={onClick}
                  onMouseEnter={setHover.on}
                  onMouseLeave={setHover.off}
                  onTouchStart={setHover.on}
                  onTouchEnd={setHover.off}
                >
                  <Flex
                    w="full"
                    flexDirection={{
                      base: 'row',
                      md: i > 1 ? 'row' : 'column'
                    }}
                    justifyContent="start"
                    alignItems="center"
                  >
                    <Box
                      position="relative"
                      mr={{ base: 4, md: i > 1 ? 4 : 0 }}
                      mb={{ base: 0, md: i > 1 ? 0 : 3.5 }}
                    >
                      <Box
                        borderRadius="lg"
                        overflow="hidden"
                        w={{ base: 8, md: i > 1 ? 8 : 14 }}
                        h={{ base: 8, md: i > 1 ? 8 : 14 }}
                        minW={{ base: 8, md: i > 1 ? 8 : 14 }}
                        minH={{ base: 8, md: i > 1 ? 8 : 14 }}
                        maxW={{ base: 8, md: i > 1 ? 8 : 14 }}
                        maxH={{ base: 8, md: i > 1 ? 8 : 14 }}
                      >
                        {typeof logo === 'string' ? (
                          <Image src={logo} alt={prettyName} />
                        ) : (
                          <Icon as={logo} />
                        )}
                      </Box>
                      <Flex
                        display={
                          modalListType === ModalListType.Normal && subLogo
                            ? 'flex'
                            : 'none'
                        }
                        justifyContent="center"
                        alignItems="center"
                        overflow="hidden"
                        border="2px solid"
                        borderColor={iconBorder}
                        bg={iconBorder}
                        borderRadius="full"
                        position="absolute"
                        bottom={-1.5}
                        right={-2}
                        w={6}
                        h={6}
                        minW={6}
                        minH={6}
                        maxW={6}
                        maxH={6}
                      >
                        {typeof subLogo === 'string' ? (
                          <Image
                            src={subLogo}
                            alt="wallet-icon"
                            w="full"
                            h="full"
                          />
                        ) : (
                          <Icon as={subLogo} w="full" h="full" />
                        )}
                      </Flex>
                    </Box>
                    <Box
                      textAlign={{
                        base: 'start',
                        md: i > 1 ? 'start' : 'center'
                      }}
                      flex={1}
                    >
                      <Text fontSize="sm" fontWeight="normal" lineHeight={1.1}>
                        {prettyName}
                      </Text>
                    </Box>
                    <Center
                      display={
                        modalListType === ModalListType.Simple && subLogo
                          ? 'flex'
                          : 'none'
                      }
                      w={5}
                      h={5}
                      minW={5}
                      minH={5}
                      maxW={5}
                      maxH={5}
                      mr={2}
                    >
                      {typeof subLogo === 'string' ? (
                        <Image src={subLogo} alt="wallet-connect" />
                      ) : (
                        <Icon as={subLogo} />
                      )}
                    </Center>
                  </Flex>
                </Button>
              </GridItem>
            );
          }
        )}
      </Grid>
      <AnimateGridItem
        initial={false}
        animate={
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
              }
        }
        position="absolute"
        bottom={0}
        bg={handleChangeColorModeValue(colorMode, '#fff', 'gray.700')}
        style={{ marginTop: 0 }}
        colSpan={2}
        w="full"
        background={handleChangeColorModeValue(
          colorMode,
          'linear-gradient(0deg, rgba(255,255,255,1) 6%, rgba(255,255,255,0.95) 16%, rgba(255,255,255,0.85) 24%, rgba(255,255,255,0.75) 32%, rgba(255,255,255,0.65) 48%, rgba(255,255,255,0.4) 65%, rgba(255,255,255,0.2) 80%, rgba(255,255,255,0.1) 95%)',
          'linear-gradient(0deg, rgba(45,55,72,1) 6%, rgba(45,55,72,0.95) 16%, rgba(45,55,72,0.85) 36%, rgba(45,55,72,0.75) 45%, rgba(45,55,72,0.65) 55%, rgba(45,55,72,0.4) 70%, rgba(45,55,72,0.2) 80%, rgba(45,55,72,0.1) 95%)'
        )}
      ></AnimateGridItem>
    </AnimateBox>
  );
};
