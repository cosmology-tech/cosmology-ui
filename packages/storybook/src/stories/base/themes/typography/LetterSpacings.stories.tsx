import { Box, letterSpacings, Text } from '@cosmology-ui/react';

export const LetterSpacing = () => {
  const keys = Object.keys(letterSpacings);
  return (
    <Box display="flex" flexDirection="column" p="1rem">
      <Text as="h1" mb="1.25rem">
        letter-spacing
      </Text>
      {Object.values(letterSpacings).map((ls, i) => {
        return (
          <Text
            key={`${ls}${i}`}
            fontSize="1.75rem"
            letterSpacing={ls}
            mb="0.125rem"
          >
            {keys[i]}: {ls}
          </Text>
        );
      })}
    </Box>
  );
};

export default {
  title: 'Base/Themes/Typography',
  component: LetterSpacing,
  parameters: {
    docs: {
      page: null
    }
  }
};
