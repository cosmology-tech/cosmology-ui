import { Box, lineHeights, Text } from '@cosmology-ui/react';

export const LineHeight = () => {
  const keys = Object.keys(lineHeights);
  return (
    <Box display="flex" flexDirection="column" p="1rem">
      <Text as="h1" mb="1.25rem">
        line-height
      </Text>
      {Object.values(lineHeights).map((lh, i) => {
        return (
          <Text key={`${lh}${i}`} bg="lightgreen" lineHeight={lh} mb="0.5rem">
            {keys[i]}: {lh}
          </Text>
        );
      })}
    </Box>
  );
};

export default {
  title: 'Base/Themes/Typography',
  component: LineHeight,
  parameters: {
    docs: {
      page: null
    }
  }
};
