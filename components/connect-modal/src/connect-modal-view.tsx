import { Stack } from '@chakra-ui/react';
import React from 'react';

import { ConnectModalViewType } from './type';

export const ConnectModalView = ({
  modalHead,
  modalContent
}: ConnectModalViewType) => {
  return (
    <Stack flex={1} spacing={1} h="full">
      {modalHead}
      {modalContent}
    </Stack>
  );
};
