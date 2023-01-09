import { Box, Center, Text, useColorMode } from '@chakra-ui/react';
import { SimpleModalHead as SimpleModalHeadKit } from '@cosmology-ui/utils';
import { ArgsTable, Primary } from '@storybook/addon-docs';
import { ComponentStory } from '@storybook/react';
import React, { useEffect, useState } from 'react';

const Template: ComponentStory<typeof SimpleModalHeadKit> = ({ ...args }) => {
  const { colorMode } = useColorMode();
  const [currentTheme, setCurrentTheme] = useState<string>(colorMode);

  useEffect(() => {
    setCurrentTheme(sessionStorage.getItem('current-theme') || 'light');

    window.addEventListener('storage', () => {
      setCurrentTheme(sessionStorage.getItem('current-theme') || 'light');
    });
  }, []);

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
        <SimpleModalHeadKit theme={currentTheme} {...args} />
        <Text textAlign="center" p={6}>
          I&apos;m fake modal
        </Text>
      </Box>
    </Center>
  );
};

export const SimpleModalHead = Template.bind({});

// to hide controls
SimpleModalHead.parameters = {
  controls: {
    include: ['title', 'backButton', 'onBack', 'onClose']
  }
};

export default {
  title: 'Components/Modals',
  component: SimpleModalHeadKit,
  parameters: {
    docs: {
      page: () => (
        <>
          <Text as="h1" fontSize={32} fontWeight="bold">
            Simple Modal Head
          </Text>
          <Primary />
          <ArgsTable of={SimpleModalHeadKit} />
        </>
      ),
      source: {
        code: `import { SimpleModalHead } from '@cosmology-ui/utils';\n\n<SimpleModalHead\n  title="your modal header"\n  backButton={false}\n  className="the class name of modal head"\n  theme={currentTheme}\n  styleProps={objectOfCustomModalHeadStyle}\n  onBack={backFunction}\n  onClose={closeFunction}\n/>`,
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
