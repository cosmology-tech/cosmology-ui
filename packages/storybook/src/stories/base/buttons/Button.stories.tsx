import { Box, Button } from '@cosmology-ui/react';
import { ArgsTable, Primary } from '@storybook/addon-docs';
import { ComponentStory } from '@storybook/react';
import React from 'react';

const Template: ComponentStory<typeof Button> = ({ ...rest }) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      py="$16"
    >
      <Button>I&apos;m default button</Button>
      <h3>can use like:</h3>
      <Button
        bg={{
          base: '$yellow.200',
          sm: '$pink.100',
          md: '$green.100',
          lg: '$blue.100',
          xl: '$purple.100',
          '2xl': '$teal.100'
        }}
        p={4}
        disabled={false}
        _hover={{
          bg: '$red.100'
        }}
      >
        demo button
      </Button>
      <pre>
        {`<Button
          bg={{
            base: '$yellow.200',
            sm: '$pink.100',
            md: '$green.100',
            lg: '$blue.100',
            xl: '$purple.100',
            '2xl': '$teal.100'
          }}
          p={4}
          disabled={false}
          _hover={{
            bg: '$red.100'
          }}
        >
          demo button
        </Button>`}
      </pre>
    </Box>
  );
};

export const defaultButton = Template.bind({});

export default {
  title: 'Base/Buttons',
  component: Button,
  parameters: {
    docs: {
      page: () => (
        <>
          <h1>Button</h1>
          <Primary />
          <ArgsTable of={Button} />
        </>
      ),
      source: {
        code: `import { Button } from '@cosmology-ui/react';\n\n<Button\n  \n/>`,
        language: 'tsx',
        type: 'auto',
        format: true
      }
    }
  }
};
