import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Image,
  Text,
  useColorMode
} from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';

import {
  AnimateBox,
  AnimateGridItem,
  DisplayWalletListType,
  handleChangeColorModeValue,
  ModalContentVariants
} from '../../index';

export const SimpleDisplayWalletList = ({
  initialFocus,
  walletsData
}: //   handleClick
DisplayWalletListType) => {
  const { colorMode } = useColorMode();
  const listRef = useRef<HTMLDivElement>(null);
  const [displayBlur, setDisplayBlur] = useState(false);

  useEffect(() => {
    if (listRef.current) {
      if (listRef.current.clientHeight >= 311) setDisplayBlur(true);
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
  }, [listRef]);

  return (
    <AnimateBox
      initial="hidden"
      animate="enter"
      variants={ModalContentVariants}
    >
      <Grid
        ref={listRef}
        position="relative"
        templateColumns={{ base: '1fr', md: '1fr 1fr' }}
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
        {walletsData.map(({ name, prettyName, logo, onClick }, i) => {
          return (
            <GridItem
              key={i}
              colSpan={{ base: 2, md: i > 1 ? 2 : 'auto' }}
              w="full"
            >
              <Button
                ref={i === 0 ? initialFocus : null}
                id={name}
                key={name}
                variant="unstyled"
                display="flex"
                w="full"
                h="fit-content"
                p={{ base: 2, md: i > 1 ? 2 : 3 }}
                py={{ md: i > 1 ? 2 : 7 }}
                mb={{ base: 0, md: i > 1 ? 0 : 1.5 }}
                justifyContent="start"
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
                  boxShadow: '0 0 0 1px #6A66FF'
                }}
                _focus={{
                  borderRadius: 'md',
                  boxShadow: '0 0 0 1px #6A66FF'
                }}
                onClick={onClick}
              >
                <Flex
                  w="full"
                  flexDirection={{ base: 'row', md: i > 1 ? 'row' : 'column' }}
                  justifyContent="start"
                  alignItems="center"
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
                    mr={{ base: 4, md: i > 1 ? 4 : 0 }}
                    mb={{ base: 0, md: i > 1 ? 0 : 3 }}
                  >
                    <Image
                      src={typeof logo === 'string' ? logo : undefined}
                      alt={prettyName}
                    />
                  </Box>
                  <Box textAlign="start" flex={1}>
                    <Text fontSize="sm" fontWeight="normal" lineHeight={1.1}>
                      {prettyName}
                    </Text>
                  </Box>
                </Flex>
              </Button>
            </GridItem>
          );
        })}
        <AnimateGridItem
          initial={false}
          animate={
            displayBlur
              ? {
                  opacity: 1,
                  height: 2,
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
          position="sticky"
          bg={handleChangeColorModeValue(colorMode, '#fff', 'gray.700')}
          style={{ marginTop: 0 }}
          colSpan={2}
          bottom={-2}
          w="full"
          boxShadow={handleChangeColorModeValue(
            colorMode,
            '0 -3px 2px 2px #fff, 0 -4px 6px 2px #fff, 0 -4px 4px 2px #fff, 0 -5px 10px 2px #fff, 0 -8px 4px #fff, 0 -8px 6px 1px #fff, 0 -8px 8px 1px #fff',
            '0 -3px 2px 2px #2D3748, 0 -4px 6px 2px #2D3748, 0 -4px 4px 2px #2D3748, 0 -5px 10px 2px #2D3748, 0 -8px 4px #2D3748, 0 -8px 6px 1px #2D3748, 0 -8px 8px 1px #2D3748'
          )}
        ></AnimateGridItem>
      </Grid>
    </AnimateBox>
  );
};
