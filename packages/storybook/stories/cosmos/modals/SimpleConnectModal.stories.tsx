import { Button, Center, Text, useDisclosure } from '@chakra-ui/react';
import { SimpleConnectModal as SimpleConnectModalKit } from '@cosmology-ui/utils';
import { ArgsTable, Primary } from '@storybook/addon-docs';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import React, { useRef } from 'react';

const Template: ComponentStory<typeof SimpleConnectModalKit> = ({
  ...rest
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialFocus = useRef<HTMLDivElement | HTMLButtonElement>(null);

  return (
    <Center py={16}>
      <Button onClick={onOpen}>open modal</Button>
      <SimpleConnectModalKit
        initialRef={initialFocus}
        modalOpen={isOpen}
        modalOnClose={onClose}
        modalHead={undefined}
        modalContent={undefined}
      />
    </Center>
  );
};

export const SimpleConnectModal = Template.bind({});

export default {
  title: 'Cosmos/Wallet',
  component: SimpleConnectModalKit,
  parameters: {
    docs: {
      page: () => (
        <>
          <Text as="h1" fontSize={32} fontWeight="bold">
            Simple Connect Modal
          </Text>
          <Primary />
          <ArgsTable of={SimpleConnectModalKit} />
        </>
      )
    }
  }
} as ComponentMeta<typeof SimpleConnectModalKit>;
