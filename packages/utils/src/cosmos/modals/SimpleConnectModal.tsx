import { Modal, ModalContent, ModalOverlay, Stack } from '@chakra-ui/react';
import { useAnimationControls } from 'framer-motion';
import React, { useEffect } from 'react';

import { AnimateBox, SimpleConnectModalType } from '../../index';

export const SimpleConnectModal = ({
  initialRef,
  modalHead,
  modalContent,
  modalOpen: modalIsOpen,
  modalOnClose
}: SimpleConnectModalType) => {
  const controls = useAnimationControls();
  const contentControls = useAnimationControls();

  useEffect(() => {
    controls.set({
      scale: 0.6,
      opacity: 0.3,
      width: 300,
      height: '45%'
    });
    contentControls.set({ opacity: 0.01, scale: 0.6 });
    (async () => {
      await controls.start({
        scale: 1,
        opacity: 1,
        width: 'auto',
        height: 'auto',
        transition: { duration: 0.18, type: 'ease' }
      });
      return await contentControls.start({
        opacity: 1,
        scale: 1,
        transition: { duration: 0.1, type: 'ease' }
      });
    })();
  }, [modalHead, controls, contentControls]);

  return (
    <Modal
      initialFocusRef={initialRef}
      blockScrollOnMount={false}
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
        motionProps={{
          animate: controls
        }}
      >
        <AnimateBox animate={contentControls}>
          <Stack flex={1} spacing={1} h="full">
            {modalHead}
            {modalContent}
          </Stack>
        </AnimateBox>
      </ModalContent>
    </Modal>
  );
};
