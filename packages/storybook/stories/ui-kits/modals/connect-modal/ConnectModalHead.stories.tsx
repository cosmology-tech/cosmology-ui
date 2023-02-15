import { Box, Center, Text } from '@chakra-ui/react';
import { ConnectModalHead } from '@cosmology-ui/react';
import { ArgsTable, Primary } from '@storybook/addon-docs';
import { ComponentStory } from '@storybook/react';
import React from 'react';

const Template: ComponentStory<typeof ConnectModalHead> = ({ ...args }) => {
  return (
    <Center py={16}>
      <Box
        w="full"
        maxW={80}
        h={72}
        border="1px solid"
        borderColor="gray.300"
        borderRadius="lg"
      >
        <ConnectModalHead {...args} />
        <Text textAlign="center" p={6}>
          I&apos;m fake modal
        </Text>
      </Box>
    </Center>
  );
};

export const connectModalHead = Template.bind({});

// to hide controls
connectModalHead.parameters = {
  controls: {
    include: ['title', 'backButton', 'onBack', 'onClose']
  }
};

export default {
  title: 'Components/Modals/ConnectModal',
  component: ConnectModalHead,
  parameters: {
    docs: {
      page: () => (
        <>
          <Text as="h1" fontSize={32} fontWeight="bold">
            Connect Modal Head
          </Text>
          <Primary />
          <ArgsTable of={ConnectModalHead} />
        </>
      ),
      source: {
        code: `import { ConnectModalHead } from '@cosmology-ui/react';\n\n<ConnectModalHead\n  title="your modal header"\n  backButton={false}\n  className="the class name of connect modal head"\n  styleProps={objectOfCustomConnectModalHeadStyle}\n  onBack={backFunction}\n  onClose={closeFunction}\n/>`,
        language: 'tsx',
        type: 'auto',
        format: true
      }
    }
  },
  args: {
    title: 'Select a wallet',
    backButton: false
  },
  argTypes: {
    onBack: {
      control: false,
      action: 'clicked back button'
    },
    onClose: {
      control: false,
      action: 'clicked close button'
    }
  }
};
