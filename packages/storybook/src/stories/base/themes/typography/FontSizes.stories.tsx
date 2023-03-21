import { Box, fontSizes, Text } from '@cosmology-ui/react';

export const FontSize = () => {
  const keys = Object.keys(fontSizes);
  return (
    <Box display="flex" flexDirection="column" p="1rem">
      <Text as="h1" mb="1.25rem">
        font-size
      </Text>
      {Object.values(fontSizes).map((fs, i) => {
        return (
          <Text key={`${fs}${i}`} fontSize={fs} mb="0.125rem">
            {keys[i]}: {fs}
          </Text>
        );
      })}
    </Box>
  );
};

export default {
  title: 'Base/Themes/Typography',
  component: FontSize,
  parameters: {
    docs: {
      page: null
    }
  }
};
