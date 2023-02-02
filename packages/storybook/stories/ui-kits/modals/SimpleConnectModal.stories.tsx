import {
  Button,
  Center,
  Text,
  useColorMode,
  useDisclosure
} from '@chakra-ui/react';
import {
  Astronaut,
  ButtonShape,
  ConnectWalletButton,
  CopyAddressButton,
  Downloads,
  InstallWalletButton,
  LogoStatus,
  QRCode,
  SimpleConnectModal as SimpleConnectModalKit,
  SimpleConnectModalType,
  SimpleDisplayModalContent,
  SimpleDisplayWalletList,
  SimpleModalHead,
  SimpleModalView,
  Wallet,
  WalletMode,
  WalletStatus
} from '@cosmology-ui/react';
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
  browserInfo?: UserDeviceInfoType
) {
  const installInfo =
    selectedItem.downloads && browserInfo
      ? handleDownloadData(selectedItem.downloads, browserInfo)
      : undefined;

  if (selectedItem.mode === WalletMode.WalletConnect) {
    return (
      <QRCode
        link={selectedItem.downloads ? selectedItem.downloads.default : ''}
        description={`Use ${selectedItem.prettyName} App to scan`}
      />
    );
  }
  if (selectedItem.mode === WalletMode.Extension && browserInfo) {
    switch (status) {
      case WalletStatus.Disconnected:
        return (
          <SimpleDisplayModalContent
            logo={selectedItem.logo}
            status={LogoStatus.Warning}
            contentHeader="Wallet is Disconnected"
            bottomButton={<ConnectWalletButton buttonText="Connect Wallet" />}
            bottomLink={
              <NextLink href="/" target="_blank">
                <Text
                  fontSize="sm"
                  opacity={0.7}
                  transition="all 0.2s ease-in"
                  textDecoration="none"
                  _hover={{
                    opacity: 0.8
                  }}
                >
                  Don&apos;t have a wallet?
                </Text>
              </NextLink>
            }
          />
        );
      case WalletStatus.NotExist:
        return (
          <SimpleDisplayModalContent
            logo={selectedItem.logo}
            status={LogoStatus.Error}
            contentHeader="Wallet Not Installed"
            contentDesc="Please install wallet"
            bottomButton={
              <InstallWalletButton
                buttonText={`Install ${selectedItem.prettyName}`}
                icon={installInfo?.icon}
                disabled={false}
              />
            }
          />
        );
      case WalletStatus.Connecting:
        return (
          <SimpleDisplayModalContent
            logo={selectedItem.logo}
            status={LogoStatus.Loading}
            contentHeader="Connecting Wallet"
            contentDesc="Open browser extension/app to connect your wallet."
          />
        );
      case WalletStatus.Connected:
        return (
          <SimpleDisplayModalContent
            logo={Astronaut}
            status={undefined}
            username="Rex Barkshire"
            walletIcon={selectedItem.logo as string}
            addressButton={<CopyAddressButton address="MediBlocLCpH" />}
            bottomButton={<ConnectWalletButton buttonText="Disconnect" />}
          />
        );
      case WalletStatus.Rejected:
        return (
          <SimpleDisplayModalContent
            logo={selectedItem.logo}
            status={LogoStatus.Error}
            contentHeader="Request Rejected"
            contentDesc="Connection permission is denied."
            bottomButton={<ConnectWalletButton buttonText="Reconnect" />}
          />
        );
      case WalletStatus.Error:
        return (
          <SimpleDisplayModalContent
            logo={selectedItem.logo}
            status={LogoStatus.Error}
            contentHeader="Oops! Something wrong..."
            contentDesc="Seems something went wrong :(\n\nLorem ipsum, dolor sit amet consectetur adipisicing elit. Eaque repellat exercitationem, obcaecati, ipsa deleniti iure consequuntur excepturi optio quas nihil perferendis suscipit pariatur nulla amet beatae itaque unde fuga! Laboriosam, veniam? Beatae, rem rerum perspiciatis placeat obcaecati earum itaque laboriosam fugiat et ipsa praesentium non repellendus officia dolore quos ullam sint voluptates eligendi debitis magnam? Voluptas quis error, facere aspernatur velit suscipit cumque voluptate excepturi accusantium cum architecto rem, totam harum minus odio voluptatum illo veritatis voluptates nulla repellat culpa! At repellendus nemo harum, vitae enim autem natus quaerat possimus, eum, mollitia neque dolore accusantium! Officiis repellat itaque quae qui."
            bottomButton={<ConnectWalletButton buttonText="Change Wallet" />}
          />
        );

      default:
        return (
          <SimpleDisplayModalContent
            bottomButton={<ConnectWalletButton buttonText="Change Wallet" />}
          />
        );
    }
  }
}

// eslint-disable-next-line react/prop-types
const Template: Story<TypeWithStatus> = ({ walletStatus, ...rest }) => {
  const { colorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialFocus = useRef<HTMLButtonElement>(null);
  const [selectedItem, setSelectedItem] = useState<Wallet>();
  const [walletList, setWalletList] = useState<Wallet[]>([]);
  const [modalContent, setModalContent] = useState<ReactNode>();
  const [browserInfo, setBrowserInfo] = useState<UserDeviceInfoType>();

  function handleClear() {
    setModalContent(undefined);
    setSelectedItem(undefined);
  }

  function handleClose() {
    onClose();
    setSelectedItem(undefined);
  }

  useEffect(() => {
    const browser = Bowser.getParser(window.navigator.userAgent);
    setBrowserInfo({
      browser: browser.getBrowserName(true),
      device: browser.getPlatformType(true),
      os: browser.getOSName(true)
    });
    setWalletList(
      WalletData.map((item, i) => ({
        ...item,
        buttonShape: i < 2 ? ButtonShape.Square : ButtonShape.Rectangle,
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
    if (selectedItem)
      setModalContent(
        <SimpleModalView
          modalHead={
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
          }
          modalContent={handleContentStatus(
            walletStatus,
            selectedItem,
            browserInfo
          )}
        />
      );

    if (!selectedItem)
      setModalContent(
        <SimpleModalView
          modalHead={
            <SimpleModalHead
              title="Select a wallet"
              backButton={false}
              onClose={handleClose}
            />
          }
          modalContent={
            <SimpleDisplayWalletList
              initialFocus={initialFocus}
              walletsData={walletList}
            />
          }
        />
      );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [colorMode, selectedItem, walletList, walletStatus, browserInfo]);

  return (
    <Center py={16}>
      <Button onClick={onOpen}>open modal</Button>
      <SimpleConnectModalKit
        initialRef={initialFocus}
        modalOpen={isOpen}
        modalOnClose={handleClose}
        modalView={modalContent}
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
      ),
      source: {
        code: `import { SimpleConnectModal } from '@cosmology-ui/utils';\n\n<SimpleConnectModal\n  initialRef={initialRef}\n  modalHead={<SimpleModalHead />}\n  modalContent={<SimpleDisplayModalContent />|<SimpleDisplayModalList />}\n  modalOpen={false}\n  className="the class name of modal"\n  styleProps={objectOfCustomModalStyle}\n  modalOnClose={closeFunction}\n/>`,
        language: 'tsx',
        type: 'auto',
        format: true
      }
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
