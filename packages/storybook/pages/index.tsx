import {
  Box,
  Button,
  Code,
  Container,
  Flex,
  Stack,
  Text,
  useColorMode
} from '@chakra-ui/react';
import {
  ConnectWalletButton,
  themeList,
  Themes,
  useTheme
} from '@cosmology-ui/react';
import Image from 'next/image';
import { MouseEventHandler } from 'react';

import Avatar from '../public/cosmology-avatar.svg';

const ThemeButton = ({
  name,
  displayColor,
  onClick
}: {
  name: string;
  displayColor: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
}) => {
  return (
    <Button
      variant="outline"
      display="flex"
      justifyContent="center"
      alignItems="center"
      h="fit-content"
      paddingInlineEnd={2}
      paddingInlineStart={2}
      py={2}
      onClick={onClick}
    >
      <Box
        w={4}
        h={4}
        borderRadius="full"
        bg={displayColor}
        border={`1px solid var(--chakra-colors-gray-200)`}
        mr={1.5}
      />
      {name}
    </Button>
  );
};

export default function Home() {
  const { setColorMode } = useColorMode();
  const { theme, setTheme } = useTheme();
  const handleThemeChange = (name: Themes, colorMode: string) => {
    setColorMode(colorMode);
    setTheme(name);
  };
  // useEffect(() => {
  //   console.log(`log:theme`, theme);
  // }, [theme]);
  return (
    <Container py={16}>
      <Stack isInline={true} justify="end">
        {themeList.map(({ name, colorMode, displayColor }, i) => (
          <ThemeButton
            key={i}
            name={name}
            displayColor={displayColor}
            onClick={() => handleThemeChange(name, colorMode)}
          />
        ))}
      </Stack>
      <Text as="h1" fontSize="3xl" fontWeight="bold" py={8}>
        Home
      </Text>
      <Text fontSize="xl">This page is in /page</Text>
      <Text fontSize="xl" mb={6}>
        you can use <Code>yarn dev</Code> to see same page
      </Text>
      <Flex alignItems="center" mb={6}>
        <Image src={Avatar} alt="avatar" width={40} height={40} />
        <Text fontSize="lg" ml={4}>
          This is test svg
        </Text>
      </Flex>
      <ConnectWalletButton />
    </Container>
  );
}
