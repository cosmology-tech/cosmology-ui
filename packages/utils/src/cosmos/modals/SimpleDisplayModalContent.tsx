import {
  Box,
  Center,
  Flex,
  Icon,
  Image,
  Stack,
  Text,
  useColorMode
} from '@chakra-ui/react';
import React from 'react';

import {
  AnimateBox,
  ConnectModalContentType,
  handleChangeColorModeValue,
  LoadingVariants
} from '../../index';

export const SimpleDisplayModalContent = ({
  status,
  logo,
  contentHeader,
  contentDesc,
  username,
  walletIcon,
  addressButton,
  bottomButton,
  bottomLink
}: ConnectModalContentType) => {
  const { colorMode } = useColorMode();
  const STYLE = {
    warning: {
      color: handleChangeColorModeValue(colorMode, 'orange.300', 'orange.400')
    },
    error: {
      color: handleChangeColorModeValue(colorMode, 'red.400', 'red.500')
    },
    loading: {
      color: 'inherit'
    }
  };

  return (
    <Flex
      w={80}
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      px={4}
      pt={6}
      pb={8}
    >
      {logo ? (
        <Center
          position="relative"
          mx="auto"
          w={20}
          h={20}
          minW={20}
          minH={20}
          maxW={20}
          maxH={20}
          mb={typeof logo === 'string' ? 4 : 2}
        >
          {status === 'loading' ? (
            <AnimateBox
              position="absolute"
              top={-1.5}
              right={-1.5}
              bottom={-1.5}
              left={-1.5}
              border="2px solid"
              borderTopColor="transparent"
              borderBottomColor="transparent"
              borderLeftColor="purple.300"
              borderRightColor="purple.300"
              borderRadius="full"
              initial="hidden"
              animate="animate"
              variants={LoadingVariants}
            ></AnimateBox>
          ) : undefined}
          {status === 'warning' || status === 'error' ? (
            <Box
              position="absolute"
              top={-2}
              right={-2}
              bottom={-2}
              left={-2}
              border="2px solid"
              borderColor={STYLE[status].color}
              borderRadius="full"
            ></Box>
          ) : undefined}
          <Box borderRadius="full" p={typeof logo === 'string' ? 3.5 : 0}>
            {typeof logo === 'string' ? (
              <Image src={logo} w="full" h="full" alt="logo" />
            ) : (
              <Icon as={logo} w="full" h="full" />
            )}
          </Box>
        </Center>
      ) : undefined}
      {contentHeader ? (
        <Text
          fontSize="md"
          fontWeight="semibold"
          color={status ? STYLE[status].color : 'inherit'}
          mb={1}
        >
          {contentHeader}
        </Text>
      ) : undefined}
      {contentDesc ? (
        <Text
          fontSize="sm"
          lineHeight={1.3}
          opacity={0.7}
          whiteSpace="pre-line"
          px={8}
        >
          {contentDesc}
        </Text>
      ) : undefined}
      {username ? (
        <Stack isInline={true} justifyContent="center" alignItems="center">
          <Center w={4} h={4} minW={4} minH={4} maxW={4} maxH={4} mt={0.5}>
            <Image src={walletIcon} alt="wallet-icon" />
          </Center>
          <Text fontSize="lg" fontWeight="semibold">
            {username}
          </Text>
        </Stack>
      ) : undefined}
      {addressButton ? (
        <Box w="full" pt={2.5} px={8}>
          {addressButton}
        </Box>
      ) : undefined}
      {bottomButton ? (
        <Box w="full" pt={3.5}>
          {bottomButton}
        </Box>
      ) : undefined}
      {bottomLink ? (
        <Center w="full" pt={2}>
          {bottomLink}
        </Center>
      ) : undefined}
    </Flex>
  );
};
