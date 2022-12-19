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
      scale: 0.95,
      opacity: 0.1,
      width: '290px',
      height: '40%'
    });
    contentControls.set({
      opacity: 0.01,
      scale: 1.08
    });
    controls.start({
      scale: 1,
      opacity: 1,
      width: 'auto',
      height: 'auto',
      transition: {
        duration: 0.18,
        delay: 0.09,
        ease: [0.26, 0.08, 0.25, 1]
      }
    });
    contentControls.start({
      opacity: 1,
      scale: 1,
      transition: { duration: 0.2, delay: 0.03, type: [0.16, 1, 0.65, 1] }
    });
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
