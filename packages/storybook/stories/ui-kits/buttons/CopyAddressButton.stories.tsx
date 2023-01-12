import { Box, Text } from '@chakra-ui/react';
import { CopyAddressButton as CopyAddressButtonKit } from '@cosmology-ui/utils';
import { ArgsTable, Primary } from '@storybook/addon-docs';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import React, { useEffect, useState } from 'react';

import { chainList } from '../../util/config';

const Template: ComponentStory<typeof CopyAddressButtonKit> = ({
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
      <CopyAddressButtonKit address={displayAddress} {...rest} />
    </Box>
  );
};

export const CopyAddressButton = Template.bind({});

// to hide controls
CopyAddressButton.parameters = {
  controls: {
    exclude: ['buttonStyleProps', 'iconStyleProps', 'className', 'theme']
  }
};

export default {
  title: 'Components/Buttons',
  component: CopyAddressButtonKit,
  parameters: {
    docs: {
      page: () => (
        <>
          <Text as="h1" fontSize={32} fontWeight="bold">
            Copy Address Button
          </Text>
          <Primary />
          <ArgsTable of={CopyAddressButtonKit} />
        </>
      ),
      source: {
        code: `import { CopyAddressButton } from '@cosmology-ui/utils';\n\n<CopyAddressButton\n  address="address"\n  loading={false}\n  disabled={false}\n  maxDisplayLength={14}\n  className="the class name of connect wallet button"\n  styleProps={objectOfCustomCopyAddressButtonStyle}\n/>`,
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
} as ComponentMeta<typeof CopyAddressButtonKit>;
