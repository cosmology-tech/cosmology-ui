import { Modal, ModalContent, ModalOverlay, Stack } from '@chakra-ui/react';
import React from 'react';

import { SimpleConnectModalType } from '../../index';

export const SimpleConnectModal = ({
  initialRef,
  modalHead,
  modalContent,
  modalOpen: modalIsOpen,
  modalOnClose
}: SimpleConnectModalType) => {
  return (
    <Modal
      initialFocusRef={initialRef}
      isOpen={modalIsOpen}
      isCentered={true}
      onClose={modalOnClose}
    >
      <ModalOverlay />
      <ModalContent
        position="relative"
        alignSelf="center"
        borderRadius="xl"
        w="fit-content"
        pb={4}
        mx={4}
        _focus={{ outline: 'none' }}
        overflow="hidden"
      >
        <Stack flex={1} spacing={1} h="full">
          {modalHead}
          {modalContent}
        </Stack>
      </ModalContent>
    </Modal>
  );
};
