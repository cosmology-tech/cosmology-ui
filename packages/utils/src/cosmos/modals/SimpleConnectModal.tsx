import { Modal, ModalContent, ModalOverlay, Stack } from '@chakra-ui/react';
import { useAnimationControls } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';

import {
  AnimateBox,
  ModalContentVariants,
  ModalVariants,
  SimpleConnectModalType
} from '../../index';

export const SimpleConnectModal = ({
  initialRef,
  modalHead,
  modalContent,
  modalOpen: modalIsOpen,
  modalOnClose
}: SimpleConnectModalType) => {
  const nodeRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState<number>(290);
  const [height, setHeight] = useState<number>(250);
  const controls = useAnimationControls();
  const contentControls = useAnimationControls();

  // to get resize width/height
  // https://stackoverflow.com/questions/73247936/how-to-dynamically-track-width-height-of-div-in-react-js
  const handleElementResized = () => {
    if (nodeRef.current) {
      if (nodeRef.current.scrollWidth !== width) {
        setWidth(nodeRef.current.scrollWidth);
      }
      if (nodeRef.current.scrollHeight !== height) {
        setHeight(nodeRef.current.scrollHeight);
      }
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const resizeObserver = new ResizeObserver(handleElementResized);

  useEffect(() => {
    if (nodeRef.current) resizeObserver.observe(nodeRef.current);

    // clear resizeObserver after get value
    return function cleanup() {
      resizeObserver.disconnect();
    };
  }, [resizeObserver, nodeRef]);

  useEffect(() => {
    if (modalIsOpen) {
      controls.set('initial');
      contentControls.set('initial');
      controls.start('animate');
      contentControls.start('animate');
    }
  }, [modalHead, modalContent, modalIsOpen, controls, contentControls]);

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
        ref={nodeRef}
        position="relative"
        alignSelf="center"
        borderRadius="xl"
        w="fit-content"
        mx={4}
        _focus={{ outline: 'none' }}
        overflow="hidden"
        motionProps={{
          custom: { width: width, height: height },
          animate: controls,
          variants: ModalVariants
        }}
      >
        <AnimateBox animate={contentControls} variants={ModalContentVariants}>
          <Stack flex={1} spacing={1} h="full">
            {modalHead}
            {modalContent}
          </Stack>
        </AnimateBox>
      </ModalContent>
    </Modal>
  );
};
