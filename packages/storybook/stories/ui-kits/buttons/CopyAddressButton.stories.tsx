import { Box, Text } from '@chakra-ui/react';
import { CopyAddressButton } from '@cosmology-ui/react';
import { ArgsTable, Primary } from '@storybook/addon-docs';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import React, { useEffect, useState } from 'react';

import { chainList } from '../../util/config';

const Template: ComponentStory<typeof CopyAddressButton> = ({
  address, // eslint-disable-line react/prop-types
  ...rest
}) => {
  const [displayAddress, setDisplayAddress] = useState<string | undefined>(
    undefined
  );

  useEffect(() => {
    if (address === undefined) setDisplayAddress(undefined);
    if (address === 'random address') setDisplayAddress(chainList[0]?.address);
  }, [address]);

  return (
    <Box w="full" maxW={60} mx="auto" py={16}>
      <CopyAddressButton address={displayAddress} {...rest} />
    </Box>
  );
};

export const copyAddressButton = Template.bind({});

// to hide controls
copyAddressButton.parameters = {
  controls: {
    exclude: ['styleProps', 'className']
  }
};

export default {
  title: 'Components/Buttons',
  component: CopyAddressButton,
  parameters: {
    docs: {
      page: () => (
        <>
          <Text as="h1" fontSize={32} fontWeight="bold">
            Copy Address Button
          </Text>
          <Primary />
          <ArgsTable of={CopyAddressButton} />
        </>
      ),
      source: {
        code: `import { CopyAddressButton } from '@cosmology-ui/react';\n\n<CopyAddressButton\n  address="address"\n  loading={false}\n  disabled={false}\n  maxDisplayLength={14}\n  className="the class name of copy address button"\n  styleProps={objectOfCustomCopyAddressButtonStyle}\n/>`,
        language: 'tsx',
        type: 'auto',
        format: true
      }
    }
  },
  argTypes: {
    address: {
      defaultValue: undefined,
      options: ['random address', undefined],
      control: { type: 'radio' }
    }
  },
  args: {
    maxDisplayLength: 14,
    loading: false,
    disabled: false
  }
} as ComponentMeta<typeof CopyAddressButton>;
