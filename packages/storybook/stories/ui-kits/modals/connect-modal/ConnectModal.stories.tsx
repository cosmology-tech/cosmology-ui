import {
  Button,
  Center,
  Icon,
  Text,
  useColorMode,
  useDisclosure
} from '@chakra-ui/react';
import {
  Astronaut,
  ButtonShape,
  ConnectModal,
  ConnectModalContent,
  ConnectModalHead,
  ConnectModalQRCode,
  ConnectModalType,
  ConnectModalView,
  ConnectModalWalletList,
  ConnectWalletButton,
  CopyAddressButton,
  Downloads,
  InstallWalletButton,
  LogoStatus,
  QRCodeStatus,
  Wallet,
  WalletMode,
  WalletStatus
} from '@cosmology-ui/react';
import { ArgsTable, Primary } from '@storybook/addon-docs';
import { ComponentMeta, Story } from '@storybook/react';
import Bowser from 'bowser';
import NextLink from 'next/link';
import React, {
  ReactNode,
  useEffect,
  useReducer,
  useRef,
  useState
} from 'react';

import { WalletData } from '../../../util/config';
import { UserDeviceInfoType } from '../../../util/types';

interface TypeWithStatus extends ConnectModalType {
  walletStatus: WalletStatus;
  qrCodeStatus: QRCodeStatus;
}
interface QRCodeReducer {
  descriptionText: string;
  errorTitle?: string;
  errorDesc?: string;
}
interface QRCodeReducerAction extends QRCodeReducer {
  type: QRCodeStatus;
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
  qrCodeStatus: QRCodeStatus,
  selectedItem: Wallet,
  qrCode: QRCodeReducer,
  browserInfo?: UserDeviceInfoType
) {
  const installInfo =
    selectedItem.downloads && browserInfo
      ? handleDownloadData(selectedItem.downloads, browserInfo)
      : undefined;

  if (selectedItem.mode === WalletMode.WalletConnect) {
    return (
      <ConnectModalQRCode
        qrCodeStatus={qrCodeStatus}
        link={selectedItem.downloads ? selectedItem.downloads.default : ''}
        description={qrCode.descriptionText}
        errorTitle={qrCode.errorTitle}
        errorDesc={qrCode.errorDesc}
      />
    );
  }
  if (selectedItem.mode === WalletMode.Extension && browserInfo) {
    switch (status) {
      case WalletStatus.Disconnected:
        return (
          <ConnectModalContent
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
          <ConnectModalContent
            logo={selectedItem.logo}
            status={LogoStatus.Error}
            contentHeader="Wallet Not Installed"
            contentDesc="Please install wallet"
            bottomButton={
              <InstallWalletButton
                buttonText={`Install ${selectedItem.prettyName}`}
                leftIcon={<Icon as={installInfo?.icon} />}
                disabled={false}
              />
            }
          />
        );
      case WalletStatus.Connecting:
        return (
          <ConnectModalContent
            logo={selectedItem.logo}
            status={LogoStatus.Loading}
            contentHeader="Connecting Wallet"
            contentDesc="Open browser extension/app to connect your wallet."
          />
        );
      case WalletStatus.Connected:
        return (
          <ConnectModalContent
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
          <ConnectModalContent
            logo={selectedItem.logo}
            status={LogoStatus.Error}
            contentHeader="Request Rejected"
            contentDesc="Connection permission is denied. Please retry again."
            bottomButton={<ConnectWalletButton buttonText="Reconnect" />}
          />
        );
      case WalletStatus.Error:
        return (
          <ConnectModalContent
            logo={selectedItem.logo}
            status={LogoStatus.Error}
            contentHeader="Oops! Something wrong..."
            contentDesc={`Seems something went wrong :(\nLorem ipsum, dolor sit amet consectetur adipisicing elit. Eaque repellat exercitationem, obcaecati, ipsa deleniti iure consequuntur excepturi optio quas nihil perferendis suscipit pariatur nulla amet beatae itaque unde fuga! Laboriosam, veniam? Beatae, rem rerum perspiciatis placeat obcaecati earum itaque laboriosam fugiat et ipsa praesentium non repellendus officia dolore quos ullam sint voluptates eligendi debitis magnam? Voluptas quis error, facere aspernatur velit suscipit cumque voluptate excepturi accusantium cum architecto rem, totam harum minus odio voluptatum illo veritatis voluptates nulla repellat culpa! At repellendus nemo harum, vitae enim autem natus quaerat possimus, eum, mollitia neque dolore accusantium! Officiis repellat itaque quae qui.`}
            bottomButton={<ConnectWalletButton buttonText="Change Wallet" />}
          />
        );

      default:
        return (
          <ConnectModalContent
            bottomButton={<ConnectWalletButton buttonText="Change Wallet" />}
          />
        );
    }
  }
}
function handleQRCodeStatus(
  state: QRCodeReducer,
  action: QRCodeReducerAction
): QRCodeReducer {
  switch (action.type) {
    case QRCodeStatus.Pending:
      return {
        ...state,
        descriptionText: action.descriptionText,
        errorTitle: action.errorTitle,
        errorDesc: action.errorDesc
      };
    case QRCodeStatus.Done:
      return {
        ...state,
        descriptionText: action.descriptionText,
        errorTitle: action.errorTitle,
        errorDesc: action.errorDesc
      };
    case QRCodeStatus.Expired:
      return {
        ...state,
        descriptionText: action.descriptionText,
        errorTitle: action.errorTitle,
        errorDesc: action.errorDesc
      };
    case QRCodeStatus.Error:
      return {
        ...state,
        descriptionText: action.descriptionText,
        errorTitle: action.errorTitle,
        errorDesc: action.errorDesc
      };

    default: {
      return state;
    }
  }
}

// eslint-disable-next-line react/prop-types
const Template: Story<TypeWithStatus> = ({
  walletStatus,
  qrCodeStatus,
  ...rest
}) => {
  const { colorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialFocus = useRef<HTMLButtonElement>(null);
  const [selectedItem, setSelectedItem] = useState<Wallet>();
  const [walletList, setWalletList] = useState<Wallet[]>([]);
  const [modalContent, setModalContent] = useState<ReactNode>();
  const [browserInfo, setBrowserInfo] = useState<UserDeviceInfoType>();
  const [qrCode, updateQRCode] = useReducer(handleQRCodeStatus, {
    descriptionText: '',
    errorTitle: '',
    errorDesc: ''
  });

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
    switch (qrCodeStatus) {
      case QRCodeStatus.Pending:
        updateQRCode({
          type: QRCodeStatus.Pending,
          descriptionText: 'Initializing QRCode...',
          errorTitle: '',
          errorDesc: ''
        });
        break;
      case QRCodeStatus.Done:
        updateQRCode({
          type: QRCodeStatus.Done,
          descriptionText: 'Use Wallet App to scan this QR code.',
          errorTitle: '',
          errorDesc: ''
        });
        break;
      case QRCodeStatus.Expired:
        updateQRCode({
          type: QRCodeStatus.Expired,
          descriptionText: '',
          errorTitle: 'This QR Code is Expired.',
          errorDesc: 'Please refresh QR Code.'
        });
        break;
      case QRCodeStatus.Error:
        updateQRCode({
          type: QRCodeStatus.Error,
          descriptionText: '',
          errorTitle: 'Seems something went wrong :(',
          errorDesc:
            'Dolor lorem ipsum sit amet consectetur adipisicing elit. Eos necessitatibus eveniet ipsa itaque provident recusandae exercitationem numquam aperiam officia facere.'
        });
        break;

      default:
        break;
    }
  }, [qrCodeStatus]);

  useEffect(() => {
    if (selectedItem)
      setModalContent(
        <ConnectModalView
          modalHead={
            <ConnectModalHead
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
            qrCodeStatus,
            selectedItem,
            qrCode,
            browserInfo
          )}
        />
      );

    if (!selectedItem)
      setModalContent(
        <ConnectModalView
          modalHead={
            <ConnectModalHead
              title="Select a wallet"
              backButton={false}
              onClose={handleClose}
            />
          }
          modalContent={
            <ConnectModalWalletList
              initialFocus={initialFocus}
              walletsData={walletList}
            />
          }
        />
      );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    colorMode,
    selectedItem,
    walletList,
    walletStatus,
    browserInfo,
    qrCodeStatus
  ]);

  return (
    <Center py={16}>
      <Button onClick={onOpen}>open modal</Button>
      <ConnectModal
        initialRef={initialFocus}
        modalOpen={isOpen}
        modalOnClose={handleClose}
        modalView={modalContent}
      />
    </Center>
  );
};

export const connectModal = Template.bind({});

// to hide controls
connectModal.parameters = {
  controls: {
    include: ['walletStatus', 'qrCodeStatus']
  }
};

export default {
  title: 'Components/Modals/ConnectModal',
  component: ConnectModal,
  parameters: {
    docs: {
      page: () => (
        <>
          <Text as="h1" fontSize={32} fontWeight="bold">
            Connect Modal
          </Text>
          <Primary />
          <ArgsTable of={ConnectModal} />
        </>
      ),
      source: {
        code: `import { ConnectModal } from '@cosmology-ui/react';\n\n<SimpleConnectModal\n  initialRef={initialRef}\n  modalHead={<SimpleModalHead />}\n  modalContent={<SimpleDisplayModalContent />|<SimpleDisplayModalList />}\n  modalOpen={false}\n  className="the class name of modal"\n  styleProps={objectOfCustomModalStyle}\n  modalOnClose={closeFunction}\n/>`,
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
    },
    qrCodeStatus: {
      options: Object.values(QRCodeStatus),
      defaultValue: QRCodeStatus.Pending,
      control: { type: 'radio' }
    }
  }
} as ComponentMeta<typeof ConnectModal>;
