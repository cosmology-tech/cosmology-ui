import { Box, colors, Text } from '@cosmology-ui/react';

export const Color = () => {
  const keys = Object.keys(colors);
  return (
    <Box display="flex" flexDirection="column" p="1rem">
      {Object.values(colors).map((c, i) => {
        const val = c;
        if (typeof val === 'string') {
          return (
            <Box key={`${c}${i}`} mb="2rem">
              <Text as="h3" mb="0.5rem">
                {keys[i]}
              </Text>
              <Box display="flex" alignItems="center">
                <Box
                  width="2rem"
                  height="2rem"
                  bg={val}
                  border="1px solid #ccc"
                  borderRadius="999px"
                  mr="1rem"
                />
                <Text>{val}</Text>
              </Box>
            </Box>
          );
        }
        if (typeof val !== 'string') {
          return (
            <Box key={`${c}${i}`} mb="1.5rem">
              <Text as="h3" mb="0.5rem">
                {keys[i]}
              </Text>
              <Box display="flex" alignItems="center" flexWrap="wrap">
                {Object.keys(val).map((color, index) => {
                  const hex = Object.values(val)[index];
                  return (
                    <Box
                      key={`${color}${index}`}
                      display="flex"
                      alignItems="center"
                      mb="1rem"
                      mr="2rem"
                    >
                      <Box
                        width="2rem"
                        height="2rem"
                        bg={hex}
                        border="1px solid #ccc"
                        borderRadius="999px"
                        mr="1rem"
                      />
                      <Box>
                        <Text>{color}</Text>
                        <Text>{hex}</Text>
                      </Box>
                    </Box>
                  );
                })}
              </Box>
            </Box>
          );
        }
      })}
    </Box>
  );
};

export default {
  title: 'Base/Themes/Colors',
  component: Color,
  parameters: {
    docs: {
      page: null
    }
  }
};
