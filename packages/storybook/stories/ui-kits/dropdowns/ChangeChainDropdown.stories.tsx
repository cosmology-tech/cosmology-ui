/* eslint-disable react/prop-types */
import { Box, Text } from '@chakra-ui/react';
import { ChainDropdown, DataType } from '@cosmology-ui/react';
import { ArgsTable, Primary } from '@storybook/addon-docs';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import React, { useEffect, useState } from 'react';

import { chainList } from '../../util/config';

const Template: ComponentStory<typeof ChainDropdown> = ({ data, ...rest }) => {
  const [demoData, setDemoData] = useState<DataType[]>([]);

  useEffect(() => {
    if (data) setDemoData(data);
    if (!data) {
      const formatChainsData = chainList.map((props) => {
        return {
          name: props?.chainName,
          label: props?.label,
          value: props?.value,
          icon: props?.icon
        };
      });
      setDemoData([
        {
          name: 'disabled',
          label: 'disabled option',
          value: 'disabled',
          icon: {
            png: 'https://dummyimage.com/400x400/5c5c5c/ffffff.png&text=D'
          },
          disabled: true
        },
        ...formatChainsData
      ]);
    }
  }, [data]);

  return (
    <Box maxW={72} mx="auto" py={56}>
      <ChainDropdown data={demoData} {...rest} />
    </Box>
  );
};

export const chainDropdown = Template.bind({});

// to hide controls
chainDropdown.parameters = {
  controls: {
    include: ['loading', 'disabled', 'onChange']
  }
};

export default {
  title: 'Components/Dropdowns',
  component: ChainDropdown,
  parameters: {
    docs: {
      page: () => (
        <>
          <Text as="h1" fontSize={32} fontWeight="bold">
            Chain Dropdown
          </Text>
          <Primary />
          <ArgsTable of={ChainDropdown} />
        </>
      ),
      source: {
        code: `import { ChainDropdown } from '@cosmology-ui/react';\n\n<ChainDropdown\n  data={[chainData]}\n  selectedItem={value}\n  loading={false}\n  disabled={false}\n  className="the class name of chain dropdown"\n  styleProps={objectOfCustomChainDropdownButtonStyle}\n  customComponents={objectOfCustomComponents}\n  onChange={selectFunction}\n/>`,
        language: 'tsx',
        type: 'auto',
        format: true
      }
    }
  },
  args: {
    loading: false,
    disabled: false
  },
  argTypes: {
    onChange: {
      control: false,
      action: 'selected'
    }
  }
} as ComponentMeta<typeof ChainDropdown>;
