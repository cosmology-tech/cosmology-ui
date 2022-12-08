import {
  Button,
  Code,
  Container,
  Flex,
  Icon,
  Image,
  Text,
  useColorMode
} from '@chakra-ui/react';
import { RiMoonClearFill, RiSunLine } from 'react-icons/ri';

import Avatar from '../public/cosmology-avatar.svg';

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
      <Text fontSize="xl" mb={6}>
        you can use <Code>yarn dev</Code> to see same page
      </Text>
      <Flex alignItems="center">
        <Image src={Avatar} alt="avatar" width={20} height={20} />
        <Text fontSize="lg" ml={4}>
          This is test svg
        </Text>
      </Flex>
    </Container>
  );
}
