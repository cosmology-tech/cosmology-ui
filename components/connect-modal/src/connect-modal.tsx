import { Modal, ModalContent, ModalOverlay } from '@chakra-ui/react';
import {
  AnimateBox,
  ModalContentVariants,
  ModalVariants
} from '@cosmology-ui/animation';
import { Themes, useTheme } from '@cosmology-ui/theme';
import { useAnimationControls } from 'framer-motion';
import React, { useEffect } from 'react';
import { useResizeDetector } from 'react-resize-detector';

import { ConnectModalType } from './type';

export const ConnectModalBaseStyle = (theme: Themes) => ({
  position: 'relative',
  alignSelf: 'center',
  overflow: 'hidden',
  borderRadius: 'xl',
  w: 'fit-content',
  mx: 4,
  bg: `simple-modal-background-color-${theme}`,
  color: `simple-modal-text-color-${theme}`,
  _focus: { outline: 'none' }
});

export const ConnectModal = ({
  initialRef,
  modalView,
  className = 'connect-modal',
  styleProps,
  modalOpen,
  modalOnClose
}: ConnectModalType) => {
  const { theme } = useTheme();
  const controls = useAnimationControls();
  const contentControls = useAnimationControls();
  const { width, height, ref: nodeRef } = useResizeDetector();

  useEffect(() => {
    if (modalOpen) {
      controls.set('initial');
      contentControls.set('initial');
      controls.start('animate');
      contentControls.start('animate');
    }
  }, [modalView, modalOpen, controls, contentControls]);

  return (
    <Modal
      initialFocusRef={initialRef}
      blockScrollOnMount={false}
      isOpen={modalOpen}
      isCentered={true}
      onClose={modalOnClose}
    >
      <ModalOverlay />
      <ModalContent
        ref={nodeRef}
        className={className}
        sx={styleProps ? styleProps : ConnectModalBaseStyle(theme)}
        motionProps={{
          custom: { width: width ? width : 290, height: height ? height : 250 },
          animate: controls,
          variants: ModalVariants
        }}
      >
        <AnimateBox animate={contentControls} variants={ModalContentVariants}>
          {modalView}
        </AnimateBox>
      </ModalContent>
    </Modal>
  );
};
