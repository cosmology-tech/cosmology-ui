/* eslint-disable react/prop-types */
import { Box, Center, Text } from '@chakra-ui/react';
import { QRCode as QRCodeKit, QRCodeStatus } from '@cosmology-ui/react';
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

const Template: ComponentStory<typeof QRCodeKit> = ({
  status,
  description,
  ...args
}) => {
  const [event, updateEvent] = useReducer(handleStatus, {
    descriptionText: '',
    errorTitle: '',
    errorDesc: ''
  });

  useEffect(() => {
    switch (status) {
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
  }, [status]);

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
        <QRCodeKit
          status={status}
          description={event.descriptionText}
          errorTitle={event.errorTitle}
          errorDesc={event.errorDesc}
          {...args}
        />
      </Box>
    </Center>
  );
};

export const QRCode = Template.bind({});

// to hide controls
QRCode.parameters = {
  controls: {
    include: ['link', 'description', 'loading', 'status']
  }
};

export default {
  title: 'Components/Modals',
  component: QRCodeKit,
  parameters: {
    docs: {
      page: () => (
        <>
          <Text as="h1" fontSize={32} fontWeight="bold">
            QRCode
          </Text>
          <Primary />
          <ArgsTable of={QRCodeKit} />
        </>
      ),
      source: {
        code: `import { QRCode } from '@cosmology-ui/utils';\n\n<QRCode\n  link="wallet link"\n  description='how to connect'\n  qrCodeSize={230}\n  loading={false}\n  className="the class name of qr code"\n  styleProps={objectOfCustomQRCodeStyle}\n/>`,
        language: 'tsx',
        type: 'auto',
        format: true
      }
    }
  },
  args: {
    link: 'https://cosmoskit.com/',
    description: 'Use wallet app to scan this QRCode',
    loading: false
  },
  argTypes: {
    status: {
      options: Object.values(QRCodeStatus),
      defaultValue: QRCodeStatus.Done,
      control: { type: 'radio' }
    }
  }
};
