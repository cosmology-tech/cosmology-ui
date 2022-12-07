import {
  Button,
  Code,
  Container,
  Flex,
  Icon,
  Text,
  useColorMode
} from '@chakra-ui/react';
import { RiMoonClearFill, RiSunLine } from 'react-icons/ri';

export default function Home() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Container py={16}>
      <Flex justify="end">
        <Button
          paddingInlineEnd={0}
          paddingInlineStart={0}
          onClick={toggleColorMode}
        >
          {colorMode === 'light' ? (
            <Icon w={4} h={4} as={RiMoonClearFill} />
          ) : (
            <Icon w={4} h={4} as={RiSunLine} />
          )}
        </Button>
      </Flex>
      <Text as="h1" fontSize="3xl" fontWeight="bold" py={8}>
        Home
      </Text>
      <Text fontSize="xl">This page is in /page</Text>
      <Text fontSize="xl">
        you can use <Code>yarn dev</Code> to see same page
      </Text>
    </Container>
  );
}
