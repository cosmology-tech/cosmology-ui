import {
  Box,
  Button,
  ButtonGroup,
  IconButton,
  useDisclosure
} from '@chakra-ui/react';
import { ThemeContext } from '@cosmology-ui/theme';
import React, { useContext } from 'react';
import { RiSettings4Fill } from 'react-icons/ri';

import { SwapSettingType } from './type';

export const SwapSetting = ({
  className = 'swap-setting',
  styleProps
}: SwapSettingType) => {
  const { theme } = useContext(ThemeContext);
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box className="swap-setting">
      <IconButton
        aria-label="swap-setting"
        icon={<RiSettings4Fill />}
        onClick={onOpen}
      />
      <ButtonGroup variant="outline" spacing="6">
        <Button colorScheme="blue">Save</Button>
        <Button>Cancel</Button>
      </ButtonGroup>
    </Box>
  );
};
