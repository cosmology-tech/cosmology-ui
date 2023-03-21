import { Box, fonts, Text } from '@cosmology-ui/react';

export const FontFamily = () => {
  const keys = Object.keys(fonts);
  return (
    <Box display="flex" flexDirection="column" p="1rem">
      {Object.values(fonts).map((fontFamily, i) => {
        return (
          <Text
            key={`${fontFamily}${i}`}
            as="h1"
            fontFamily={fontFamily}
            mb="2rem"
          >
            Display H1 and font-family of {keys[i]} is {fontFamily}
          </Text>
        );
      })}
    </Box>
  );
};

export default {
  title: 'Base/Themes/Typography',
  component: FontFamily,
  parameters: {
    docs: {
      page: null
    }
  }
};
