import {
  Box,
  Center,
  Link as ChakraLink,
  Text,
  useColorMode
} from '@chakra-ui/react';
import {
  Astronaut,
  ConnectModalContentType,
  ConnectWalletButton,
  CopyAddressButton,
  handleChangeColorModeValue,
  LogoStatus,
  SimpleDisplayModalContent as SimpleDisplayModalContentKit,
  WalletStatus
} from '@cosmology-ui/utils';
import { ArgsTable, Primary } from '@storybook/addon-docs';
import { Story } from '@storybook/react';
import NextLink from 'next/link';
import React from 'react';

import { WalletIcons } from '../../util/config';

interface TypeWithStatus extends ConnectModalContentType {
  walletStatus: WalletStatus;
}

function handleContentStatus(status: WalletStatus) {
  switch (status) {
    case WalletStatus.Disconnected:
      return {
        logo: WalletIcons.keplr,
        logoStatus: LogoStatus.Warning,
        contentHeader: 'Wallet is Disconnected',
        contentDesc: undefined,
        buttonText: 'Connect Wallet'
      };
    case WalletStatus.NotExist:
      return {
        logo: WalletIcons.keplr,
        logoStatus: LogoStatus.Error,
        contentHeader: 'Wallet Not Installed',
        contentDesc: 'Please install wallet',
        buttonText: 'Install Wallet'
      };
    case WalletStatus.Connecting:
      return {
        logo: WalletIcons.keplr,
        logoStatus: LogoStatus.Loading,
        contentHeader: 'Connecting Wallet',
        contentDesc: 'Open browser extension/app to connect your wallet.',
        buttonText: undefined
      };
    case WalletStatus.Connected:
      return {
        logo: Astronaut,
        logoStatus: undefined,
        contentHeader: undefined,
        contentDesc: undefined,
        buttonText: 'Disconnected'
      };
    case WalletStatus.Rejected:
      return {
        logo: WalletIcons.keplr,
        logoStatus: LogoStatus.Error,
        contentHeader: 'Request Rejected',
        contentDesc: 'Connection permission is denied.',
        buttonText: 'Reconnect'
      };
    case WalletStatus.Error:
      return {
        logo: WalletIcons.keplr,
        logoStatus: LogoStatus.Error,
        contentHeader: 'Oops! Something wrong...',
        contentDesc: 'Seems something went wrong :(',
        buttonText: 'Change Wallet'
      };

    default:
      return {
        logo: undefined,
        logoStatus: undefined,
        contentHeader: undefined,
        contentDesc: undefined,
        buttonText: 'Connect Wallet'
      };
  }
}

// eslint-disable-next-line react/prop-types
const Template: Story<TypeWithStatus> = ({ walletStatus }) => {
  const contentInfo = handleContentStatus(walletStatus);
  const { colorMode } = useColorMode();
  return (
    <Center py={16}>
      <Box
        w="full"
        maxW={80}
        minH={60}
        pb={6}
        border="1px solid"
        borderColor="gray.300"
        borderRadius="lg"
      >
        <Box w="full" p={6}>
          <Text textAlign="center">I&apos;m fake header</Text>
        </Box>
        <SimpleDisplayModalContentKit
          logo={contentInfo.logo}
          status={contentInfo.logoStatus}
          contentHeader={contentInfo.contentHeader}
          contentDesc={contentInfo.contentDesc}
          username={
            walletStatus === WalletStatus.Connected
              ? 'Rex Barkshire'
              : undefined
          }
          walletIcon={
            walletStatus === WalletStatus.Connected
              ? WalletIcons.keplr
              : undefined
          }
          addressButton={
            walletStatus === WalletStatus.Connected ? (
              <Box px={1}>
                <CopyAddressButton address="MediBlocLCpH" />
              </Box>
            ) : undefined
          }
          bottomButton={
            walletStatus === WalletStatus.Connecting ? undefined : (
              <Box px={6}>
                <ConnectWalletButton buttonText={contentInfo.buttonText} />
              </Box>
            )
          }
          bottomLink={
            walletStatus === WalletStatus.Disconnected ? (
              <NextLink href="/" passHref={true} target="_blank">
                <ChakraLink
                  fontSize="sm"
                  opacity={0.7}
                  transition="all 0.2s ease-in"
                  textDecoration="none"
                  _hover={{
                    color: handleChangeColorModeValue(
                      colorMode,
                      'primary.500',
                      'primary.200'
                    ),
                    opacity: 0.8,
                    textDecoration: handleChangeColorModeValue(
                      colorMode,
                      'underline #4657d1',
                      'underline #6674d9'
                    )
                  }}
                >
                  Don&apos;t have a wallet?
                </ChakraLink>
              </NextLink>
            ) : undefined
          }
        />
      </Box>
    </Center>
  );
};

export const SimpleDisplayModalContent = Template.bind({});

// to hide controls
SimpleDisplayModalContent.parameters = {
  controls: {
    include: ['walletStatus']
  }
};

export default {
  title: 'UIKits/Modals',
  component: SimpleDisplayModalContentKit,
  parameters: {
    docs: {
      page: () => (
        <>
          <Text as="h1" fontSize={32} fontWeight="bold">
            Simple Display Modal Content
          </Text>
          <Primary />
          <ArgsTable of={SimpleDisplayModalContentKit} />
        </>
      ),
      source: {
        code: `import { SimpleDisplayModalContent } from '@cosmology-ui/utils';\n\n<SimpleDisplayModalContent\n  \n/>`,
        language: 'tsx',
        type: 'auto',
        format: true
      }
    }
  },
  argTypes: {
    walletStatus: { options: WalletStatus, control: { type: 'radio' } }
  }
};
