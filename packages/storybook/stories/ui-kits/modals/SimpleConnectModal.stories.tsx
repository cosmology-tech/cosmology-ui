import {
  Box,
  Button,
  Center,
  Text,
  useColorMode,
  useDisclosure
} from '@chakra-ui/react';
import {
  Astronaut,
  ConnectWalletButton,
  CopyAddressButton,
  Downloads,
  handleChangeColorModeValue,
  InstallWalletButton,
  LogoStatus,
  QRCode,
  SimpleConnectModal as SimpleConnectModalKit,
  SimpleConnectModalType,
  SimpleDisplayModalContent,
  SimpleDisplayWalletList,
  SimpleModalHead,
  Wallet,
  WalletMode,
  WalletStatus
} from '@cosmology-ui/utils';
import { ArgsTable, Primary } from '@storybook/addon-docs';
import { ComponentMeta, Story } from '@storybook/react';
import Bowser from 'bowser';
import NextLink from 'next/link';
import React, { ReactNode, useEffect, useRef, useState } from 'react';

import { WalletData } from '../../util/config';
import { UserDeviceInfoType } from '../../util/types';

interface TypeWithStatus extends SimpleConnectModalType {
  walletStatus: WalletStatus;
}

// eslint-disable-next-line react/prop-types
const Template: Story<TypeWithStatus> = ({ walletStatus, ...rest }) => {
  const { colorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialFocus = useRef<HTMLButtonElement>(null);
  const [selectedItem, setSelectedItem] = useState<Wallet>();
  const [walletList, setWalletList] = useState<Wallet[]>([]);
  const [modalContent, setModalContent] = useState<ReactNode>();
  const [modalHead, setModalHead] = useState<ReactNode>();
  const [browserInfo, setBrowserInfo] = useState<UserDeviceInfoType>();

  function handleClear() {
    setModalHead(undefined);
    setModalContent(undefined);
    setSelectedItem(undefined);
  }

  function handleClose() {
    setSelectedItem(undefined);
    onClose();
  }

  function handleDownloadData(
    downloads: Downloads,
    browserInfo: UserDeviceInfoType
  ) {
    switch (browserInfo.device) {
      case 'desktop': {
        const data = downloads.desktop.find(
          (item) => item.browser === browserInfo.browser
        );
        return data;
      }
      case 'tablet': {
        const data = downloads[browserInfo.device].find(
          (item) => item.os === browserInfo.os
        );
        return data;
      }
      case 'mobile': {
        const data = downloads[browserInfo.device].find(
          (item) => item.os === browserInfo.os
        );
        return data;
      }
      default:
        return undefined;
    }
  }

  function handleContentStatus(
    status: WalletStatus,
    selectedItem: Wallet,
    browserInfo: UserDeviceInfoType
  ) {
    const installInfo = selectedItem.downloads
      ? handleDownloadData(selectedItem.downloads, browserInfo)
      : undefined;

    switch (status) {
      case WalletStatus.Disconnected:
        return {
          logo: selectedItem.logo,
          logoStatus: LogoStatus.Warning,
          contentHeader: 'Wallet is Disconnected',
          contentDesc: undefined,
          buttonText: 'Connect Wallet'
        };
      case WalletStatus.NotExist:
        return {
          logo: selectedItem.logo,
          logoStatus: LogoStatus.Error,
          contentHeader: 'Wallet Not Installed',
          contentDesc: 'Please install wallet',
          installLink: installInfo?.link,
          installIcon: installInfo?.icon,
          buttonText: `Install ${selectedItem.prettyName}`
        };
      case WalletStatus.Connecting:
        return {
          logo: selectedItem.logo,
          logoStatus: LogoStatus.Loading,
          contentHeader: 'Connecting Wallet',
          contentDesc: 'Open browser extension/app to connect your wallet.'
        };
      case WalletStatus.Connected:
        return {
          logo: Astronaut,
          logoStatus: undefined,
          contentHeader: undefined,
          contentDesc: undefined,
          buttonText: 'Disconnect'
        };
      case WalletStatus.Rejected:
        return {
          logo: selectedItem.logo,
          logoStatus: LogoStatus.Error,
          contentHeader: 'Request Rejected',
          contentDesc: 'Connection permission is denied.',
          buttonText: 'Reconnect'
        };
      case WalletStatus.Error:
        return {
          logo: selectedItem.logo,
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

  useEffect(() => {
    const browser = Bowser.getParser(window.navigator.userAgent);
    setBrowserInfo({
      browser: browser.getBrowserName(true),
      device: browser.getPlatformType(true),
      os: browser.getOSName(true)
    });
    setWalletList(
      WalletData.map((item) => ({
        ...item,
        onClick: () => {
          setTimeout(() => {
            setSelectedItem(item);
          }, 100);
          setSelectedItem((pre) => pre);
        }
      }))
    );
  }, []);

  useEffect(() => {
    if (selectedItem) {
      setModalHead(
        <SimpleModalHead
          title={
            selectedItem.prettyName
              ? selectedItem.prettyName
              : selectedItem.name
          }
          backButton={true}
          onBack={handleClear}
          onClose={handleClose}
        />
      );
      if (selectedItem.mode === WalletMode.Extension && browserInfo) {
        const statusContent = handleContentStatus(
          walletStatus,
          selectedItem,
          browserInfo
        );
        setModalContent(
          <SimpleDisplayModalContent
            logo={statusContent.logo}
            status={statusContent.logoStatus}
            contentHeader={statusContent.contentHeader}
            contentDesc={statusContent.contentDesc}
            username={
              walletStatus === WalletStatus.Connected
                ? 'Rex Barkshire'
                : undefined
            }
            walletIcon={
              walletStatus === WalletStatus.Connected
                ? (selectedItem.logo as string)
                : undefined
            }
            addressButton={
              walletStatus === WalletStatus.Connected ? (
                <CopyAddressButton address="MediBlocLCpH" />
              ) : undefined
            }
            bottomButton={
              walletStatus ===
              WalletStatus.Connecting ? undefined : walletStatus ===
                WalletStatus.NotExist ? (
                <InstallWalletButton
                  disabled={false}
                  icon={statusContent.installIcon}
                  buttonText={statusContent.buttonText}
                  onClick={() => {
                    window.open(statusContent.installLink);
                  }}
                />
              ) : (
                <Box px={6}>
                  <ConnectWalletButton buttonText={statusContent.buttonText} />
                </Box>
              )
            }
            bottomLink={
              walletStatus === WalletStatus.Disconnected ? (
                <NextLink href="/" target="_blank">
                  <Text
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
                  </Text>
                </NextLink>
              ) : undefined
            }
          />
        );
      }
      if (selectedItem.mode === WalletMode.WalletConnect) {
        setModalContent(
          <QRCode
            link={selectedItem.downloads ? selectedItem.downloads.default : ''}
            description={`Use ${selectedItem.prettyName} App to scan`}
          />
        );
      }
    }
    if (!selectedItem) {
      setModalHead(
        <SimpleModalHead
          title="Select a wallet"
          backButton={false}
          onBack={() => void 0}
          onClose={handleClose}
        />
      );
      setModalContent(
        <SimpleDisplayWalletList
          initialFocus={initialFocus}
          walletsData={walletList}
        />
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [colorMode, selectedItem, walletList, walletStatus, browserInfo]);

  return (
    <Center py={16}>
      <Button onClick={onOpen}>open modal</Button>
      <SimpleConnectModalKit
        initialRef={initialFocus}
        modalOpen={isOpen}
        modalOnClose={onClose}
        modalHead={modalHead}
        modalContent={modalContent}
      />
    </Center>
  );
};

export const SimpleConnectModal = Template.bind({});

// to hide controls
SimpleConnectModal.parameters = {
  controls: {
    include: ['walletStatus']
  }
};

export default {
  title: 'UIKits/Modals',
  component: SimpleConnectModalKit,
  parameters: {
    docs: {
      page: () => (
        <>
          <Text as="h1" fontSize={32} fontWeight="bold">
            Simple Connect Modal
          </Text>
          <Primary />
          <ArgsTable of={SimpleConnectModalKit} />
        </>
      )
    }
  },
  argTypes: {
    walletStatus: {
      options: Object.values(WalletStatus),
      defaultValue: WalletStatus.Disconnected,
      control: { type: 'radio' }
    }
  }
} as ComponentMeta<typeof SimpleConnectModalKit>;
