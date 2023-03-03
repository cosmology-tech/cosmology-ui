/* eslint-disable react/prop-types */
import { Box, Center, Text } from '@chakra-ui/react';
import { ConnectModalQRCode, QRCodeStatus } from '@cosmology-ui/react';
import { ArgsTable, Primary } from '@storybook/addon-docs';
import { ComponentStory } from '@storybook/react';
import React, { useEffect, useReducer } from 'react';

interface QRCodeReducer {
  descriptionText: string;
  errorTitle?: string;
  errorDesc?: string;
}
interface QRCodeReducerAction extends QRCodeReducer {
  type: QRCodeStatus;
}

function handleStatus(
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

const Template: ComponentStory<typeof ConnectModalQRCode> = ({
  link,
  qrCodeStatus
}) => {
  const [event, updateEvent] = useReducer(handleStatus, {
    descriptionText: '',
    errorTitle: '',
    errorDesc: ''
  });

  useEffect(() => {
    switch (qrCodeStatus) {
      case QRCodeStatus.Pending:
        updateEvent({
          type: QRCodeStatus.Pending,
          descriptionText: 'Initializing QRCode...',
          errorTitle: '',
          errorDesc: ''
        });
        break;
      case QRCodeStatus.Done:
        updateEvent({
          type: QRCodeStatus.Done,
          descriptionText: 'Use Wallet App to scan this QR code.',
          errorTitle: '',
          errorDesc: ''
        });
        break;
      case QRCodeStatus.Expired:
        updateEvent({
          type: QRCodeStatus.Expired,
          descriptionText: '',
          errorTitle: 'This QR Code is Expired.',
          errorDesc: 'Please refresh QR Code.'
        });
        break;
      case QRCodeStatus.Error:
        updateEvent({
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

  return (
    <Center py={16}>
      <Box
        w="full"
        maxW={80}
        pb={6}
        border="1px solid"
        borderColor="gray.300"
        borderRadius="lg"
        opacity={0.85}
      >
        <Box w="full" p={6}>
          <Text textAlign="center">I&apos;m fake header</Text>
        </Box>
        <ConnectModalQRCode
          qrCodeStatus={qrCodeStatus}
          link={link}
          description={event.descriptionText}
          errorTitle={event.errorTitle}
          errorDesc={event.errorDesc}
        />
      </Box>
    </Center>
  );
};

export const connectModalQRCode = Template.bind({});

// to hide controls
connectModalQRCode.parameters = {
  controls: {
    include: ['description', 'qrCodeStatus']
  }
};

export default {
  title: 'Components/Modals/ConnectModal',
  component: ConnectModalQRCode,
  parameters: {
    docs: {
      page: () => (
        <>
          <Text as="h1" fontSize={32} fontWeight="bold">
            Connect Modal QRCode
          </Text>
          <Primary />
          <ArgsTable of={ConnectModalQRCode} />
        </>
      ),
      source: {
        code: `import { ConnectModalQRCode } from '@cosmology-ui/react';\n\n<ConnectModalQRCode\n  qrCodeStatus={status}\n  link="wallet link"\n  description='how to connect'\n  qrCodeSize={230}\n  errorTitle="title of QR code error"\n  errorDesc="description for the QR code error"\n  className="the class name of qr code"\n  styleProps={objectOfCustomQRCodeStyle}\n/>`,
        language: 'tsx',
        type: 'auto',
        format: true
      }
    }
  },
  args: {
    link: 'https://cosmoskit.com/',
    qrCodeStatus: QRCodeStatus.Pending
  }
};
