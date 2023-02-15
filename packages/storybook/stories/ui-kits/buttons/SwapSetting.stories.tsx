import { Box, Text } from '@chakra-ui/react';
import { SwapSetting } from '@cosmology-ui/react';
import { ArgsTable, Primary } from '@storybook/addon-docs';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import React, { useState } from 'react';

const Template: ComponentStory<typeof SwapSetting> = ({ ...rest }) => {
  return (
    <Box w="full" maxW={60} mx="auto" py={16}>
      <SwapSetting {...rest} />
    </Box>
  );
};

export const swapSetting = Template.bind({});

// to hide controls
swapSetting.parameters = {
  controls: {
    exclude: ['styleProps', 'className']
  }
};

export default {
  title: 'Components/Buttons',
  component: SwapSetting,
  parameters: {
    docs: {
      page: () => (
        <>
          <Text as="h1" fontSize={32} fontWeight="bold">
            Copy Address Button
          </Text>
          <Primary />
          <ArgsTable of={SwapSetting} />
        </>
      ),
      source: {
        code: `import { SwapSetting } from '@cosmology-ui/react';\n\n<SwapSetting\n\n/>`,
        language: 'tsx',
        type: 'auto',
        format: true
      }
    }
  }
} as ComponentMeta<typeof SwapSetting>;
