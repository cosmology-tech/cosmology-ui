import {
  Box,
  Center,
  Stack,
  Text,
  useColorMode,
  useDimensions // https://github.com/chakra-ui/chakra-ui/issues/6856
} from '@chakra-ui/react';
import { QRCodeSVG } from 'qrcode.react';
import React, { useRef } from 'react';

import {
  AnimateBox,
  handleChangeColorModeValue,
  ModalContentVariants,
  QRCodeType
} from '../../index';

export const QRCode = ({ link, description }: QRCodeType) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const dimensions = useDimensions(elementRef);
  const { colorMode } = useColorMode();
  return (
    <AnimateBox
      ref={elementRef}
      initial="hidden"
      animate="enter"
      exit="exit"
      variants={ModalContentVariants}
    >
      <Stack
        w={80}
        justifyContent="center"
        alignItems="center"
        spacing={4}
        p={4}
      >
        {description ? (
          <Text fontWeight="medium" textAlign="center" opacity={0.75}>
            {description}
          </Text>
        ) : undefined}
        <Box px={2}>
          <Center
            w="full"
            border="1px solid"
            borderColor={handleChangeColorModeValue(
              colorMode,
              'blackAlpha.100',
              'whiteAlpha.600'
            )}
            borderRadius="lg"
            boxShadow="base"
            p={5}
          >
            <QRCodeSVG
              value={link}
              size={dimensions ? dimensions.contentBox.width - 24 : undefined}
              bgColor={'#ffffff'}
              fgColor={'#000000'}
              level={'L'}
              includeMargin={false}
            />
          </Center>
        </Box>
      </Stack>
    </AnimateBox>
  );
};
