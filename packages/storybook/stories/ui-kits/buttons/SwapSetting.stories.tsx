import { Center, Text } from '@chakra-ui/react';
import { SwapSetting } from '@cosmology-ui/react';
import { ArgsTable, Primary } from '@storybook/addon-docs';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import React, { useState } from 'react';

const Template: ComponentStory<typeof SwapSetting> = ({ tokenArray }) => {
  const [selectedToken, setSelectToken] = useState<string | undefined>(
    tokenArray ? tokenArray[0] : undefined
  );
  function handleSelectTolerance(value: string) {
    console.log(`log:tolerance`, value);
    setSelectToken(value);
  }

  return (
    <Center w="full" maxW="md" mx="auto" py={16}>
      <SwapSetting
        settingToken={selectedToken}
        tokenArray={tokenArray}
        onSelectSetting={handleSelectTolerance}
      />
    </Center>
  );
};

export const swapSetting = Template.bind({});

// to hide controls
swapSetting.parameters = {
  controls: {
    exclude: ['selectedToken', 'styleProps', 'className']
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
            Swap Setting
          </Text>
          <Primary />
          <ArgsTable of={SwapSetting} />
        </>
      ),
      source: {
        code: `import { SwapSetting } from '@cosmology-ui/react';\n\n<SwapSetting\n  settingMenuOpen={settingMenuOpen}\n/>`,
        language: 'tsx',
        type: 'auto',
        format: true
      }
    }
  },
  args: {
    tokenArray: ['1%', '2.5%', '3%', '5%']
  },
  argTypes: {
    onTokenSelect: {
      control: false,
      action: 'clicked'
    }
  }
} as ComponentMeta<typeof SwapSetting>;
