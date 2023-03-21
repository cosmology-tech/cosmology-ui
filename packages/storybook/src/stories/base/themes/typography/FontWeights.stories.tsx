import { Box, fontWeights, Text } from '@cosmology-ui/react';

export const FontWeight = () => {
  const keys = Object.keys(fontWeights);
  return (
    <Box display="flex" flexDirection="column" p="1rem">
      <Text as="h1" mb="1.25rem">
        font-weight
      </Text>
      {Object.values(fontWeights).map((fw, i) => {
        return (
          <Text
            key={`${fw}${i}`}
            fontSize="1.75rem"
            fontWeight={fw}
            mb="0.625rem"
          >
            {keys[i]}: {fw}
          </Text>
        );
      })}
    </Box>
  );
};

export default {
  title: 'Base/Themes/Typography',
  component: FontWeight,
  parameters: {
    docs: {
      page: null
    }
  }
};
