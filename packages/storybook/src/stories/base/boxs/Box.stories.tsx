import { Box } from '@cosmology-ui/react';
import { ArgsTable, Primary } from '@storybook/addon-docs';

export const DefaultBox = () => (
  <Box
    color="$green.500"
    bg={{ base: '$yellow.100' }}
    p={{ base: '$6', md: '$12' }}
    _hover={{ bg: '$cyan.100' }}
  >
    test
  </Box>
);

export default {
  title: 'Base/Boxes',
  component: Box,
  parameters: {
    docs: {
      page: () => (
        <>
          <h1>Box</h1>
          <Primary />
          <ArgsTable of={Box} />
        </>
      ),
      source: {
        code: `import { Box } from '@cosmology-ui/react';\n\n<Box\n  \n/>`,
        language: 'tsx',
        type: 'auto',
        format: true
      }
    }
  }
};
