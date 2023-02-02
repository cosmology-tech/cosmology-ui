import { Modal, ModalContent, ModalOverlay } from '@chakra-ui/react';
import { useAnimationControls } from 'framer-motion';
import React, { useEffect } from 'react';
import { useResizeDetector } from 'react-resize-detector';

import {
  AnimateBox,
  ModalContentVariants,
  ModalVariants,
  SimpleConnectModalType
} from '../../index';

export const SimpleConnectModalBaseStyle = () => ({
  position: 'relative',
  alignSelf: 'center',
  borderRadius: 'xl',
  w: 'fit-content',
  mx: 4,
  _focus: { outline: 'none' },
  overflow: 'hidden'
});

export const SimpleConnectModal = ({
  initialRef,
  modalView,
  className,
  styleProps,
  modalOpen,
  modalOnClose
}: SimpleConnectModalType) => {
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
        sx={styleProps ? styleProps : SimpleConnectModalBaseStyle()}
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
