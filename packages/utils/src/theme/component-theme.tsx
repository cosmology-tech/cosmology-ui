import { StyleDataType, ThemeListType, Themes } from '../utils/types';

function groupBy(objectArray: any[], property: string): object {
  return objectArray.reduce((acc: object, obj: object) => {
    const key = obj[property];
    const curGroup = acc[key] ?? [];

    return { ...acc, [key]: [...curGroup, obj] };
  }, {});
}
function handleData(data: StyleDataType[]) {
  const initialObj = groupBy(data, 'category');

  let val = {};
  for (const [key, value] of Object.entries(initialObj)) {
    const valueObj = value.flatMap(({ componentName, style, theme }) =>
      theme.flatMap(({ themeName, themeValue }) => {
        const objKey = `${componentName}-${style}-${themeName}`;
        return {
          [objKey]: themeValue
        };
      })
    );
    val = { ...val, [key]: Object.assign({}, ...valueObj) };
  }

  return val;
}

export const themeList: ThemeListType[] = [
  { name: Themes.Light, displayColor: '#fff', colorMode: Themes.Light },
  { name: Themes.Dark, displayColor: '#1A202C', colorMode: Themes.Dark }
];

export const styleData: StyleDataType[] = [
  // connect-wallet-button
  {
    componentName: 'connect-wallet-button',
    category: 'colors',
    style: 'background-color',
    theme: [
      { themeName: Themes.Light, themeValue: 'primary.500' },
      { themeName: Themes.Dark, themeValue: 'primary.400' }
    ]
  },
  {
    componentName: 'connect-wallet-button',
    category: 'colors',
    style: 'hover-background-color',
    theme: [
      { themeName: Themes.Light, themeValue: 'primary.400' },
      { themeName: Themes.Dark, themeValue: 'primary.500' }
    ]
  },
  {
    componentName: 'connect-wallet-button',
    category: 'colors',
    style: 'active-background-color',
    theme: [
      { themeName: Themes.Light, themeValue: 'primary.50' },
      { themeName: Themes.Dark, themeValue: 'primary.50' }
    ]
  },
  {
    componentName: 'connect-wallet-button',
    category: 'colors',
    style: 'disabled-background-color',
    theme: [
      { themeName: Themes.Light, themeValue: 'gray.50' },
      { themeName: Themes.Dark, themeValue: 'gray.700' }
    ]
  },
  {
    componentName: 'connect-wallet-button',
    category: 'colors',
    style: 'text-color',
    theme: [
      { themeName: Themes.Light, themeValue: 'white' },
      { themeName: Themes.Dark, themeValue: 'white' }
    ]
  },
  {
    componentName: 'connect-wallet-button',
    category: 'colors',
    style: 'active-text-color',
    theme: [
      { themeName: Themes.Light, themeValue: 'primary.500' },
      { themeName: Themes.Dark, themeValue: 'primary.400' }
    ]
  },
  {
    componentName: 'connect-wallet-button',
    category: 'colors',
    style: 'active-text-color',
    theme: [
      { themeName: Themes.Light, themeValue: 'primary.500' },
      { themeName: Themes.Dark, themeValue: 'primary.400' }
    ]
  },
  {
    componentName: 'connect-wallet-button',
    category: 'shadows',
    style: 'focus-shadow',
    theme: [
      {
        themeName: Themes.Light,
        themeValue: '0 0 0 2px var(--chakra-colors-primary-200)'
      },
      {
        themeName: Themes.Dark,
        themeValue: '0 0 0 2px var(--chakra-colors-primary-200)'
      }
    ]
  },
  // copy-address-button
  {
    componentName: 'copy-address-button',
    category: 'colors',
    style: 'hover-background-color',
    theme: [
      { themeName: Themes.Light, themeValue: 'blackAlpha.50' },
      { themeName: Themes.Dark, themeValue: 'whiteAlpha.50' }
    ]
  },
  {
    componentName: 'copy-address-button',
    category: 'colors',
    style: 'text-color',
    theme: [
      { themeName: Themes.Light, themeValue: 'gray.500' },
      { themeName: Themes.Dark, themeValue: 'whiteAlpha.600' }
    ]
  },
  {
    componentName: 'copy-address-button',
    category: 'colors',
    style: 'border-color',
    theme: [
      { themeName: Themes.Light, themeValue: 'gray.200' },
      { themeName: Themes.Dark, themeValue: 'whiteAlpha.300' }
    ]
  },
  // install-wallet-button
  {
    componentName: 'install-wallet-button',
    category: 'colors',
    style: 'background-color',
    theme: [
      { themeName: Themes.Light, themeValue: 'rgba(37, 57, 201, 0.1)' },
      { themeName: Themes.Dark, themeValue: 'rgba(40, 62, 219, 0.15)' }
    ]
  },
  {
    componentName: 'install-wallet-button',
    category: 'colors',
    style: 'border-color',
    theme: [
      { themeName: Themes.Light, themeValue: 'white' },
      { themeName: Themes.Dark, themeValue: 'gray.800' }
    ]
  },
  {
    componentName: 'install-wallet-button',
    category: 'colors',
    style: 'text-color',
    theme: [
      { themeName: Themes.Light, themeValue: 'primary.400' },
      { themeName: Themes.Dark, themeValue: 'primary.100' }
    ]
  },
  {
    componentName: 'install-wallet-button',
    category: 'shadows',
    style: 'shadow',
    theme: [
      {
        themeName: Themes.Light,
        themeValue: '0 0 1px 2px rgba(37, 57, 201, 0.5)'
      },
      {
        themeName: Themes.Dark,
        themeValue: '0 0 1px 2px rgba(196, 203, 255, 0.5)'
      }
    ]
  },
  // change-chain-dropdown
  {
    componentName: 'change-chain-dropdown',
    category: 'colors',
    style: 'firefox-scrollbar-color',
    theme: [
      {
        themeName: Themes.Light,
        themeValue: 'rgba(0, 0, 0, 0.15) transparent' // thumb-color background-color
      },
      {
        themeName: Themes.Dark,
        themeValue: 'rgba(255, 255, 255, 0.15) transparent' // thumb-color background-color
      }
    ]
  },
  {
    componentName: 'change-chain-dropdown',
    category: 'colors',
    style: 'scrollbar-background-color',
    theme: [
      {
        themeName: Themes.Light,
        themeValue: 'transparent'
      },
      {
        themeName: Themes.Dark,
        themeValue: 'transparent'
      }
    ]
  },
  {
    componentName: 'change-chain-dropdown',
    category: 'colors',
    style: 'scrollbar-thumb-color',
    theme: [
      {
        themeName: Themes.Light,
        themeValue: 'blackAlpha.200'
      },
      {
        themeName: Themes.Dark,
        themeValue: 'whiteAlpha.200'
      }
    ]
  },
  {
    componentName: 'change-chain-dropdown',
    category: 'colors',
    style: 'indicator-text-color',
    theme: [
      {
        themeName: Themes.Light,
        themeValue: 'blackAlpha.600'
      },
      {
        themeName: Themes.Dark,
        themeValue: 'whiteAlpha.600'
      }
    ]
  },
  {
    componentName: 'change-chain-dropdown',
    category: 'colors',
    style: 'indicator-background-color',
    theme: [
      {
        themeName: Themes.Light,
        themeValue: 'transparent'
      },
      {
        themeName: Themes.Dark,
        themeValue: 'transparent'
      }
    ]
  },
  {
    componentName: 'change-chain-dropdown',
    category: 'colors',
    style: 'loading-indicator-color',
    theme: [
      {
        themeName: Themes.Light,
        themeValue: 'primary.200'
      },
      {
        themeName: Themes.Dark,
        themeValue: 'primary.400'
      }
    ]
  },
  {
    componentName: 'change-chain-dropdown',
    category: 'colors',
    style: 'text-color',
    theme: [
      {
        themeName: Themes.Light,
        themeValue: 'blackAlpha.800'
      },
      {
        themeName: Themes.Dark,
        themeValue: 'whiteAlpha.800'
      }
    ]
  },
  {
    componentName: 'change-chain-dropdown',
    category: 'colors',
    style: 'placeholder-text-color',
    theme: [
      {
        themeName: Themes.Light,
        themeValue: 'blackAlpha.600'
      },
      {
        themeName: Themes.Dark,
        themeValue: 'whiteAlpha.600'
      }
    ]
  },
  {
    componentName: 'change-chain-dropdown',
    category: 'colors',
    style: 'placeholder-selected-text-color',
    theme: [
      {
        themeName: Themes.Light,
        themeValue: 'blackAlpha.800'
      },
      {
        themeName: Themes.Dark,
        themeValue: 'whiteAlpha.800'
      }
    ]
  },
  {
    componentName: 'change-chain-dropdown',
    category: 'colors',
    style: 'icon-border-color',
    theme: [
      {
        themeName: Themes.Light,
        themeValue: 'blackAlpha.200'
      },
      {
        themeName: Themes.Dark,
        themeValue: 'whiteAlpha.300'
      }
    ]
  },
  {
    componentName: 'change-chain-dropdown',
    category: 'colors',
    style: 'menu-background-color',
    theme: [
      {
        themeName: Themes.Light,
        themeValue: 'white'
      },
      {
        themeName: Themes.Dark,
        themeValue: 'gray.900'
      }
    ]
  },
  {
    componentName: 'change-chain-dropdown',
    category: 'colors',
    style: 'option-background-color',
    theme: [
      {
        themeName: Themes.Light,
        themeValue: 'transparent'
      },
      {
        themeName: Themes.Dark,
        themeValue: 'transparent'
      }
    ]
  },
  {
    componentName: 'change-chain-dropdown',
    category: 'colors',
    style: 'option-hover-background-color',
    theme: [
      {
        themeName: Themes.Light,
        themeValue: 'blackAlpha.100'
      },
      {
        themeName: Themes.Dark,
        themeValue: 'whiteAlpha.100'
      }
    ]
  },
  {
    componentName: 'change-chain-dropdown',
    category: 'colors',
    style: 'option-active-background-color',
    theme: [
      {
        themeName: Themes.Light,
        themeValue: 'gray.100'
      },
      {
        themeName: Themes.Dark,
        themeValue: 'gray.700'
      }
    ]
  },
  {
    componentName: 'change-chain-dropdown',
    category: 'colors',
    style: 'option-focus-background-color',
    theme: [
      {
        themeName: Themes.Light,
        themeValue: 'primary.100'
      },
      {
        themeName: Themes.Dark,
        themeValue: 'primary.600'
      }
    ]
  },
  {
    componentName: 'change-chain-dropdown',
    category: 'colors',
    style: 'option-disabled-background-color',
    theme: [
      {
        themeName: Themes.Light,
        themeValue: 'transparent'
      },
      {
        themeName: Themes.Dark,
        themeValue: 'transparent'
      }
    ]
  },
  {
    componentName: 'change-chain-dropdown',
    category: 'colors',
    style: 'option-selected-background-color',
    theme: [
      {
        themeName: Themes.Light,
        themeValue: 'primary.50'
      },
      {
        themeName: Themes.Dark,
        themeValue: 'primary.500'
      }
    ]
  },
  {
    componentName: 'change-chain-dropdown',
    category: 'shadows',
    style: 'menu-shadow',
    theme: [
      {
        themeName: Themes.Light,
        themeValue: '0 2px 6px 1px var(--chakra-colors-blackAlpha-200)'
      },
      {
        themeName: Themes.Dark,
        themeValue: '0 3px 10px -2px var(--chakra-colors-blackAlpha-700)'
      }
    ]
  },
  {
    componentName: 'change-chain-dropdown',
    category: 'shadows',
    style: 'shadow',
    theme: [
      {
        themeName: Themes.Light,
        themeValue: '0 0 0 2px var(--chakra-colors-primary-200)'
      },
      {
        themeName: Themes.Dark,
        themeValue: '0 0 0 2px var(--chakra-colors-primary-200)'
      }
    ]
  },
  // simple-modal-head
  {
    componentName: 'simple-modal-head',
    category: 'colors',
    style: 'text-color',
    theme: [
      {
        themeName: Themes.Light,
        themeValue: 'gray.700'
      },
      {
        themeName: Themes.Dark,
        themeValue: 'whiteAlpha.900'
      }
    ]
  },
  {
    componentName: 'simple-modal-head',
    category: 'colors',
    style: 'button-icon-color',
    theme: [
      {
        themeName: Themes.Light,
        themeValue: 'blackAlpha.600'
      },
      {
        themeName: Themes.Dark,
        themeValue: 'whiteAlpha.600'
      }
    ]
  },
  // simple-display-wallet-list
  {
    componentName: 'simple-display-wallet-list',
    category: 'colors',
    style: 'button-text-color',
    theme: [
      {
        themeName: Themes.Light,
        themeValue: 'blackAlpha.800'
      },
      {
        themeName: Themes.Dark,
        themeValue: 'whiteAlpha.800'
      }
    ]
  },
  {
    componentName: 'simple-display-wallet-list',
    category: 'colors',
    style: 'button-background-color',
    theme: [
      {
        themeName: Themes.Light,
        themeValue: 'gray.100'
      },
      {
        themeName: Themes.Dark,
        themeValue: 'blackAlpha.500'
      }
    ]
  },
  {
    componentName: 'simple-display-wallet-list',
    category: 'colors',
    style: 'button-hover-background-color',
    theme: [
      {
        themeName: Themes.Light,
        themeValue: 'gray.50'
      },
      {
        themeName: Themes.Dark,
        themeValue: 'blackAlpha.600'
      }
    ]
  },
  {
    componentName: 'simple-display-wallet-list',
    category: 'colors',
    style: 'icon-border-color',
    theme: [
      {
        themeName: Themes.Light,
        themeValue: 'gray.100'
      },
      {
        themeName: Themes.Dark,
        themeValue: 'gray.800'
      }
    ]
  },
  {
    componentName: 'simple-display-wallet-list',
    category: 'colors',
    style: 'hover-icon-border-color',
    theme: [
      {
        themeName: Themes.Light,
        themeValue: 'gray.50'
      },
      {
        themeName: Themes.Dark,
        themeValue: 'gray.900'
      }
    ]
  },
  {
    componentName: 'simple-display-wallet-list',
    category: 'colors',
    style: 'shadow-background-color',
    theme: [
      {
        themeName: Themes.Light,
        themeValue:
          'linear-gradient(0deg, rgba(255,255,255,1) 6%, rgba(255,255,255,0.95) 16%, rgba(255,255,255,0.85) 24%, rgba(255,255,255,0.75) 32%, rgba(255,255,255,0.65) 48%, rgba(255,255,255,0.4) 65%, rgba(255,255,255,0.2) 80%, rgba(255,255,255,0.1) 95%)'
      },
      {
        themeName: Themes.Dark,
        themeValue:
          'linear-gradient(0deg, rgba(45,55,72,1) 6%, rgba(45,55,72,0.95) 16%, rgba(45,55,72,0.85) 36%, rgba(45,55,72,0.75) 45%, rgba(45,55,72,0.65) 55%, rgba(45,55,72,0.4) 70%, rgba(45,55,72,0.2) 80%, rgba(45,55,72,0.1) 95%)'
      }
    ]
  },
  // qr-code
  {
    componentName: 'qr-code',
    category: 'colors',
    style: 'border-color',
    theme: [
      {
        themeName: Themes.Light,
        themeValue: 'blackAlpha.200'
      },
      {
        themeName: Themes.Dark,
        themeValue: 'whiteAlpha.200'
      }
    ]
  },
  {
    componentName: 'qr-code',
    category: 'colors',
    style: 'qr-background-color',
    theme: [
      {
        themeName: Themes.Light,
        themeValue: 'var(--chakra-colors-white)'
      },
      {
        themeName: Themes.Dark,
        themeValue: 'var(--chakra-colors-gray-800)'
      }
    ]
  },
  {
    componentName: 'qr-code',
    category: 'colors',
    style: 'qr-blur-background-color',
    theme: [
      {
        themeName: Themes.Light,
        themeValue: 'whiteAlpha.700'
      },
      {
        themeName: Themes.Dark,
        themeValue: 'blackAlpha.400'
      }
    ]
  },
  {
    componentName: 'qr-code',
    category: 'colors',
    style: 'qr-text-color',
    theme: [
      {
        themeName: Themes.Light,
        themeValue: 'var(--chakra-colors-blackAlpha-900)'
      },
      {
        themeName: Themes.Dark,
        themeValue: 'var(--chakra-colors-white)'
      }
    ]
  },
  {
    componentName: 'qr-code',
    category: 'colors',
    style: 'qr-expired-text-color',
    theme: [
      {
        themeName: Themes.Light,
        themeValue: 'orange.300'
      },
      {
        themeName: Themes.Dark,
        themeValue: 'orange.200'
      }
    ]
  },
  {
    componentName: 'qr-code',
    category: 'colors',
    style: 'qr-error-text-color',
    theme: [
      {
        themeName: Themes.Light,
        themeValue: 'red.500'
      },
      {
        themeName: Themes.Dark,
        themeValue: 'red.400'
      }
    ]
  },
  {
    componentName: 'qr-code',
    category: 'shadows',
    style: 'shadow',
    theme: [
      {
        themeName: Themes.Light,
        themeValue: '0 2px 5px -1px var(--chakra-colors-blackAlpha-300)'
      },
      {
        themeName: Themes.Dark,
        themeValue: '0 2px 5px -1px var(--chakra-colors-blackAlpha-900)'
      }
    ]
  },
  {
    componentName: 'qr-code',
    category: 'shadows',
    style: 'button-shadow',
    theme: [
      {
        themeName: Themes.Light,
        themeValue:
          '0 1px 4px var(--chakra-colors-blackAlpha-600), 0 5px 12px var(--chakra-colors-blackAlpha-400), 0 0 25px 6px var(--chakra-colors-whiteAlpha-600)'
      },
      {
        themeName: Themes.Dark,
        themeValue:
          '0 1px 4px var(--chakra-colors-blackAlpha-900), 0 5px 12px var(--chakra-colors-blackAlpha-800), 0 0 25px 6px var(--chakra-colors-whiteAlpha-400)'
      }
    ]
  },
  {
    componentName: 'qr-code',
    category: 'colors',
    style: 'shadow-background-color',
    theme: [
      {
        themeName: Themes.Light,
        themeValue:
          'linear-gradient(0deg, rgba(255,255,255,1) 6%, rgba(255,255,255,0.95) 16%, rgba(255,255,255,0.85) 24%, rgba(255,255,255,0.75) 32%, rgba(255,255,255,0.65) 48%, rgba(255,255,255,0.4) 65%, rgba(255,255,255,0.2) 80%, rgba(255,255,255,0.1) 95%)'
      },
      {
        themeName: Themes.Dark,
        themeValue:
          'linear-gradient(0deg, rgba(45,55,72,1) 6%, rgba(45,55,72,0.95) 16%, rgba(45,55,72,0.85) 36%, rgba(45,55,72,0.75) 45%, rgba(45,55,72,0.65) 55%, rgba(45,55,72,0.4) 70%, rgba(45,55,72,0.2) 80%, rgba(45,55,72,0.1) 95%)'
      }
    ]
  },
  // display-modal-content
  {
    componentName: 'simple-display-modal-content',
    category: 'colors',
    style: 'loading-border-color',
    theme: [
      {
        themeName: Themes.Light,
        themeValue: 'purple.300'
      },
      {
        themeName: Themes.Dark,
        themeValue: 'purple.400'
      }
    ]
  },
  {
    componentName: 'simple-display-modal-content',
    category: 'colors',
    style: 'warning-border-color',
    theme: [
      {
        themeName: Themes.Light,
        themeValue: 'orange.300'
      },
      {
        themeName: Themes.Dark,
        themeValue: 'orange.400'
      }
    ]
  },
  {
    componentName: 'simple-display-modal-content',
    category: 'colors',
    style: 'error-border-color',
    theme: [
      {
        themeName: Themes.Light,
        themeValue: 'red.400'
      },
      {
        themeName: Themes.Dark,
        themeValue: 'red.500'
      }
    ]
  },
  {
    componentName: 'simple-display-modal-content',
    category: 'colors',
    style: 'warning-header-text-color',
    theme: [
      {
        themeName: Themes.Light,
        themeValue: 'orange.300'
      },
      {
        themeName: Themes.Dark,
        themeValue: 'orange.400'
      }
    ]
  },
  {
    componentName: 'simple-display-modal-content',
    category: 'colors',
    style: 'error-header-text-color',
    theme: [
      {
        themeName: Themes.Light,
        themeValue: 'red.400'
      },
      {
        themeName: Themes.Dark,
        themeValue: 'red.500'
      }
    ]
  },
  {
    componentName: 'simple-display-modal-content',
    category: 'colors',
    style: 'shadow-background-color',
    theme: [
      {
        themeName: Themes.Light,
        themeValue:
          'linear-gradient(0deg, rgba(255,255,255,1) 6%, rgba(255,255,255,0.95) 16%, rgba(255,255,255,0.85) 24%, rgba(255,255,255,0.75) 32%, rgba(255,255,255,0.65) 48%, rgba(255,255,255,0.4) 65%, rgba(255,255,255,0.2) 80%, rgba(255,255,255,0.1) 95%)'
      },
      {
        themeName: Themes.Dark,
        themeValue:
          'linear-gradient(0deg, rgba(45,55,72,1) 6%, rgba(45,55,72,0.95) 16%, rgba(45,55,72,0.85) 36%, rgba(45,55,72,0.75) 45%, rgba(45,55,72,0.65) 55%, rgba(45,55,72,0.4) 70%, rgba(45,55,72,0.2) 80%, rgba(45,55,72,0.1) 95%)'
      }
    ]
  },
  // simple-modal
  {
    componentName: 'simple-modal',
    category: 'colors',
    style: 'background-color',
    theme: [
      {
        themeName: Themes.Light,
        themeValue: 'white'
      },
      {
        themeName: Themes.Dark,
        themeValue: 'gray.700'
      }
    ]
  },
  {
    componentName: 'simple-modal',
    category: 'colors',
    style: 'text-color',
    theme: [
      {
        themeName: Themes.Light,
        themeValue: 'gray.700'
      },
      {
        themeName: Themes.Dark,
        themeValue: 'whiteAlpha.900'
      }
    ]
  }
];

export const semanticTokens = {
  semanticTokens: handleData(styleData)
};
