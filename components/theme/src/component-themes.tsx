import { StyleDataType, ThemeListType } from './type';

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
  { name: 'light', displayColor: '#fff', colorMode: 'light' },
  { name: 'dark', displayColor: '#1A202C', colorMode: 'dark' },
  { name: 'test-theme', displayColor: '#2539c9', colorMode: 'light' }
];

export const styleData: StyleDataType[] = [
  // connect-wallet-button
  {
    componentName: 'connect-wallet-button',
    category: 'colors',
    style: 'background-color',
    theme: [
      { themeName: 'light', themeValue: 'primary.500' },
      { themeName: 'dark', themeValue: 'primary.400' },
      { themeName: 'test-theme', themeValue: 'pink.200' }
    ]
  },
  {
    componentName: 'connect-wallet-button',
    category: 'colors',
    style: 'hover-background-color',
    theme: [
      { themeName: 'light', themeValue: 'primary.400' },
      { themeName: 'dark', themeValue: 'primary.500' }
    ]
  },
  {
    componentName: 'connect-wallet-button',
    category: 'colors',
    style: 'active-background-color',
    theme: [
      { themeName: 'light', themeValue: 'primary.50' },
      { themeName: 'dark', themeValue: 'primary.50' }
    ]
  },
  {
    componentName: 'connect-wallet-button',
    category: 'colors',
    style: 'disabled-background-color',
    theme: [
      { themeName: 'light', themeValue: 'gray.50' },
      { themeName: 'dark', themeValue: 'gray.700' }
    ]
  },
  {
    componentName: 'connect-wallet-button',
    category: 'colors',
    style: 'text-color',
    theme: [
      { themeName: 'light', themeValue: 'white' },
      { themeName: 'dark', themeValue: 'white' },
      { themeName: 'test-theme', themeValue: 'pink.800' }
    ]
  },
  {
    componentName: 'connect-wallet-button',
    category: 'colors',
    style: 'active-text-color',
    theme: [
      { themeName: 'light', themeValue: 'primary.500' },
      { themeName: 'dark', themeValue: 'primary.400' }
    ]
  },
  {
    componentName: 'connect-wallet-button',
    category: 'colors',
    style: 'disabled-text-color',
    theme: [
      { themeName: 'light', themeValue: 'gray.400' },
      { themeName: 'dark', themeValue: 'gray.500' }
    ]
  },
  {
    componentName: 'connect-wallet-button',
    category: 'shadows',
    style: 'focus-shadow',
    theme: [
      {
        themeName: 'light',
        themeValue: '0 0 0 2px var(--chakra-colors-primary-200)'
      },
      {
        themeName: 'dark',
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
      { themeName: 'light', themeValue: 'blackAlpha.50' },
      { themeName: 'dark', themeValue: 'whiteAlpha.50' }
    ]
  },
  {
    componentName: 'copy-address-button',
    category: 'colors',
    style: 'text-color',
    theme: [
      { themeName: 'light', themeValue: 'gray.500' },
      { themeName: 'dark', themeValue: 'whiteAlpha.600' }
    ]
  },
  {
    componentName: 'copy-address-button',
    category: 'colors',
    style: 'border-color',
    theme: [
      { themeName: 'light', themeValue: 'gray.200' },
      { themeName: 'dark', themeValue: 'whiteAlpha.300' }
    ]
  },
  // install-wallet-button
  {
    componentName: 'install-wallet-button',
    category: 'colors',
    style: 'background-color',
    theme: [
      { themeName: 'light', themeValue: 'rgba(37, 57, 201, 0.1)' },
      { themeName: 'dark', themeValue: 'rgba(40, 62, 219, 0.15)' }
    ]
  },
  {
    componentName: 'install-wallet-button',
    category: 'colors',
    style: 'border-color',
    theme: [
      { themeName: 'light', themeValue: 'white' },
      { themeName: 'dark', themeValue: 'gray.800' }
    ]
  },
  {
    componentName: 'install-wallet-button',
    category: 'colors',
    style: 'text-color',
    theme: [
      { themeName: 'light', themeValue: 'primary.400' },
      { themeName: 'dark', themeValue: 'primary.100' }
    ]
  },
  {
    componentName: 'install-wallet-button',
    category: 'shadows',
    style: 'shadow',
    theme: [
      { themeName: 'light', themeValue: '0 0 1px 2px rgba(37, 57, 201, 0.5)' },
      { themeName: 'dark', themeValue: '0 0 1px 2px rgba(196, 203, 255, 0.5)' }
    ]
  },
  // chain-dropdown
  {
    componentName: 'chain-dropdown',
    category: 'colors',
    style: 'firefox-scrollbar-color',
    theme: [
      {
        themeName: 'light',
        themeValue: 'rgba(0, 0, 0, 0.15) transparent' // thumb-color background-color
      },
      {
        themeName: 'dark',
        themeValue: 'rgba(255, 255, 255, 0.15) transparent' // thumb-color background-color
      }
    ]
  },
  {
    componentName: 'chain-dropdown',
    category: 'colors',
    style: 'scrollbar-background-color',
    theme: [
      {
        themeName: 'light',
        themeValue: 'transparent'
      },
      {
        themeName: 'dark',
        themeValue: 'transparent'
      }
    ]
  },
  {
    componentName: 'chain-dropdown',
    category: 'colors',
    style: 'scrollbar-thumb-color',
    theme: [
      {
        themeName: 'light',
        themeValue: 'blackAlpha.200'
      },
      {
        themeName: 'dark',
        themeValue: 'whiteAlpha.200'
      }
    ]
  },
  {
    componentName: 'chain-dropdown',
    category: 'colors',
    style: 'indicator-text-color',
    theme: [
      {
        themeName: 'light',
        themeValue: 'blackAlpha.600'
      },
      {
        themeName: 'dark',
        themeValue: 'whiteAlpha.600'
      }
    ]
  },
  {
    componentName: 'chain-dropdown',
    category: 'colors',
    style: 'indicator-background-color',
    theme: [
      {
        themeName: 'light',
        themeValue: 'transparent'
      },
      {
        themeName: 'dark',
        themeValue: 'transparent'
      }
    ]
  },
  {
    componentName: 'chain-dropdown',
    category: 'colors',
    style: 'loading-indicator-color',
    theme: [
      {
        themeName: 'light',
        themeValue: 'primary.200'
      },
      {
        themeName: 'dark',
        themeValue: 'primary.400'
      }
    ]
  },
  {
    componentName: 'chain-dropdown',
    category: 'colors',
    style: 'text-color',
    theme: [
      {
        themeName: 'light',
        themeValue: 'blackAlpha.800'
      },
      {
        themeName: 'dark',
        themeValue: 'whiteAlpha.800'
      }
    ]
  },
  {
    componentName: 'chain-dropdown',
    category: 'colors',
    style: 'placeholder-text-color',
    theme: [
      {
        themeName: 'light',
        themeValue: 'blackAlpha.600'
      },
      {
        themeName: 'dark',
        themeValue: 'whiteAlpha.600'
      }
    ]
  },
  {
    componentName: 'chain-dropdown',
    category: 'colors',
    style: 'placeholder-selected-text-color',
    theme: [
      {
        themeName: 'light',
        themeValue: 'blackAlpha.800'
      },
      {
        themeName: 'dark',
        themeValue: 'whiteAlpha.800'
      }
    ]
  },
  {
    componentName: 'chain-dropdown',
    category: 'colors',
    style: 'icon-border-color',
    theme: [
      {
        themeName: 'light',
        themeValue: 'blackAlpha.200'
      },
      {
        themeName: 'dark',
        themeValue: 'whiteAlpha.300'
      }
    ]
  },
  {
    componentName: 'chain-dropdown',
    category: 'colors',
    style: 'menu-background-color',
    theme: [
      {
        themeName: 'light',
        themeValue: 'white'
      },
      {
        themeName: 'dark',
        themeValue: 'gray.900'
      }
    ]
  },
  {
    componentName: 'chain-dropdown',
    category: 'colors',
    style: 'option-background-color',
    theme: [
      {
        themeName: 'light',
        themeValue: 'transparent'
      },
      {
        themeName: 'dark',
        themeValue: 'transparent'
      }
    ]
  },
  {
    componentName: 'chain-dropdown',
    category: 'colors',
    style: 'option-hover-background-color',
    theme: [
      {
        themeName: 'light',
        themeValue: 'blackAlpha.100'
      },
      {
        themeName: 'dark',
        themeValue: 'whiteAlpha.100'
      }
    ]
  },
  {
    componentName: 'chain-dropdown',
    category: 'colors',
    style: 'option-active-background-color',
    theme: [
      {
        themeName: 'light',
        themeValue: 'gray.100'
      },
      {
        themeName: 'dark',
        themeValue: 'gray.700'
      }
    ]
  },
  {
    componentName: 'chain-dropdown',
    category: 'colors',
    style: 'option-focus-background-color',
    theme: [
      {
        themeName: 'light',
        themeValue: 'primary.100'
      },
      {
        themeName: 'dark',
        themeValue: 'primary.600'
      }
    ]
  },
  {
    componentName: 'chain-dropdown',
    category: 'colors',
    style: 'option-disabled-background-color',
    theme: [
      {
        themeName: 'light',
        themeValue: 'transparent'
      },
      {
        themeName: 'dark',
        themeValue: 'transparent'
      }
    ]
  },
  {
    componentName: 'chain-dropdown',
    category: 'colors',
    style: 'option-selected-background-color',
    theme: [
      {
        themeName: 'light',
        themeValue: 'primary.50'
      },
      {
        themeName: 'dark',
        themeValue: 'primary.500'
      }
    ]
  },
  {
    componentName: 'chain-dropdown',
    category: 'shadows',
    style: 'menu-shadow',
    theme: [
      {
        themeName: 'light',
        themeValue: '0 2px 6px 1px var(--chakra-colors-blackAlpha-200)'
      },
      {
        themeName: 'dark',
        themeValue: '0 3px 10px -2px var(--chakra-colors-blackAlpha-700)'
      }
    ]
  },
  {
    componentName: 'chain-dropdown',
    category: 'shadows',
    style: 'shadow',
    theme: [
      {
        themeName: 'light',
        themeValue: '0 0 0 2px var(--chakra-colors-primary-200)'
      },
      {
        themeName: 'dark',
        themeValue: '0 0 0 2px var(--chakra-colors-primary-200)'
      }
    ]
  },
  // connect-modal-head
  {
    componentName: 'connect-modal-head',
    category: 'colors',
    style: 'text-color',
    theme: [
      {
        themeName: 'light',
        themeValue: 'gray.700'
      },
      {
        themeName: 'dark',
        themeValue: 'whiteAlpha.900'
      }
    ]
  },
  {
    componentName: 'connect-modal-head',
    category: 'colors',
    style: 'button-icon-color',
    theme: [
      {
        themeName: 'light',
        themeValue: 'blackAlpha.600'
      },
      {
        themeName: 'dark',
        themeValue: 'whiteAlpha.600'
      }
    ]
  },
  // connect-modal-wallet-list
  {
    componentName: 'connect-modal-wallet-list',
    category: 'colors',
    style: 'button-text-color',
    theme: [
      {
        themeName: 'light',
        themeValue: 'blackAlpha.800'
      },
      {
        themeName: 'dark',
        themeValue: 'whiteAlpha.800'
      }
    ]
  },
  {
    componentName: 'connect-modal-wallet-list',
    category: 'colors',
    style: 'button-background-color',
    theme: [
      {
        themeName: 'light',
        themeValue: 'gray.100'
      },
      {
        themeName: 'dark',
        themeValue: 'blackAlpha.500'
      }
    ]
  },
  {
    componentName: 'connect-modal-wallet-list',
    category: 'colors',
    style: 'button-hover-background-color',
    theme: [
      {
        themeName: 'light',
        themeValue: 'gray.50'
      },
      {
        themeName: 'dark',
        themeValue: 'blackAlpha.600'
      }
    ]
  },
  {
    componentName: 'connect-modal-wallet-list',
    category: 'colors',
    style: 'icon-border-color',
    theme: [
      {
        themeName: 'light',
        themeValue: 'gray.100'
      },
      {
        themeName: 'dark',
        themeValue: 'gray.800'
      }
    ]
  },
  {
    componentName: 'connect-modal-wallet-list',
    category: 'colors',
    style: 'hover-icon-border-color',
    theme: [
      {
        themeName: 'light',
        themeValue: 'gray.50'
      },
      {
        themeName: 'dark',
        themeValue: 'gray.900'
      }
    ]
  },
  {
    componentName: 'connect-modal-wallet-list',
    category: 'colors',
    style: 'shadow-background-color',
    theme: [
      {
        themeName: 'light',
        themeValue:
          'linear-gradient(0deg, rgba(255,255,255,1) 6%, rgba(255,255,255,0.95) 16%, rgba(255,255,255,0.85) 24%, rgba(255,255,255,0.75) 32%, rgba(255,255,255,0.65) 48%, rgba(255,255,255,0.4) 65%, rgba(255,255,255,0.2) 80%, rgba(255,255,255,0.1) 95%)'
      },
      {
        themeName: 'dark',
        themeValue:
          'linear-gradient(0deg, rgba(45,55,72,1) 6%, rgba(45,55,72,0.95) 16%, rgba(45,55,72,0.85) 36%, rgba(45,55,72,0.75) 45%, rgba(45,55,72,0.65) 55%, rgba(45,55,72,0.4) 70%, rgba(45,55,72,0.2) 80%, rgba(45,55,72,0.1) 95%)'
      }
    ]
  },
  {
    componentName: 'connect-modal-wallet-list',
    category: 'shadows',
    style: 'button-hover-shadow',
    theme: [
      {
        themeName: 'light',
        themeValue: '0 0 0 1px #6A66FF'
      },
      {
        themeName: 'dark',
        themeValue: '0 0 0 1px #6A66FF'
      }
    ]
  },
  // connect-modal-qr-code
  {
    componentName: 'connect-modal-qr-code',
    category: 'colors',
    style: 'border-color',
    theme: [
      {
        themeName: 'light',
        themeValue: 'blackAlpha.200'
      },
      {
        themeName: 'dark',
        themeValue: 'whiteAlpha.200'
      }
    ]
  },
  {
    componentName: 'connect-modal-qr-code',
    category: 'colors',
    style: 'qr-background-color',
    theme: [
      {
        themeName: 'light',
        themeValue: 'var(--chakra-colors-white)'
      },
      {
        themeName: 'dark',
        themeValue: 'var(--chakra-colors-gray-800)'
      }
    ]
  },
  {
    componentName: 'connect-modal-qr-code',
    category: 'colors',
    style: 'qr-text-color',
    theme: [
      {
        themeName: 'light',
        themeValue: 'var(--chakra-colors-blackAlpha-900)'
      },
      {
        themeName: 'dark',
        themeValue: 'var(--chakra-colors-white)'
      }
    ]
  },
  {
    componentName: 'connect-modal-qr-code',
    category: 'shadows',
    style: 'shadow',
    theme: [
      {
        themeName: 'light',
        themeValue: '0 2px 5px -1px var(--chakra-colors-blackAlpha-300)'
      },
      {
        themeName: 'dark',
        themeValue: '0 2px 5px -1px var(--chakra-colors-blackAlpha-900)'
      }
    ]
  },
  // connect-modal-content
  {
    componentName: 'connect-modal-content',
    category: 'colors',
    style: 'loading-border-color',
    theme: [
      {
        themeName: 'light',
        themeValue: 'purple.300'
      },
      {
        themeName: 'dark',
        themeValue: 'purple.400'
      }
    ]
  },
  {
    componentName: 'connect-modal-content',
    category: 'colors',
    style: 'warning-border-color',
    theme: [
      {
        themeName: 'light',
        themeValue: 'orange.300'
      },
      {
        themeName: 'dark',
        themeValue: 'orange.400'
      }
    ]
  },
  {
    componentName: 'connect-modal-content',
    category: 'colors',
    style: 'error-border-color',
    theme: [
      {
        themeName: 'light',
        themeValue: 'red.400'
      },
      {
        themeName: 'dark',
        themeValue: 'red.500'
      }
    ]
  },
  {
    componentName: 'connect-modal-content',
    category: 'colors',
    style: 'warning-header-text-color',
    theme: [
      {
        themeName: 'light',
        themeValue: 'orange.300'
      },
      {
        themeName: 'dark',
        themeValue: 'orange.400'
      }
    ]
  },
  {
    componentName: 'connect-modal-content',
    category: 'colors',
    style: 'error-header-text-color',
    theme: [
      {
        themeName: 'light',
        themeValue: 'red.400'
      },
      {
        themeName: 'dark',
        themeValue: 'red.500'
      }
    ]
  },
  {
    componentName: 'connect-modal-content',
    category: 'colors',
    style: 'shadow-background-color',
    theme: [
      {
        themeName: 'light',
        themeValue:
          'linear-gradient(0deg, rgba(255,255,255,1) 6%, rgba(255,255,255,0.95) 16%, rgba(255,255,255,0.85) 24%, rgba(255,255,255,0.75) 32%, rgba(255,255,255,0.65) 48%, rgba(255,255,255,0.4) 65%, rgba(255,255,255,0.2) 80%, rgba(255,255,255,0.1) 95%)'
      },
      {
        themeName: 'dark',
        themeValue:
          'linear-gradient(0deg, rgba(45,55,72,1) 6%, rgba(45,55,72,0.95) 16%, rgba(45,55,72,0.85) 36%, rgba(45,55,72,0.75) 45%, rgba(45,55,72,0.65) 55%, rgba(45,55,72,0.4) 70%, rgba(45,55,72,0.2) 80%, rgba(45,55,72,0.1) 95%)'
      }
    ]
  },
  // swap-dropdown
  {
    componentName: 'swap-dropdown',
    category: 'colors',
    style: 'background-color',
    theme: [
      {
        themeName: 'light',
        themeValue: 'gray.100'
      },
      {
        themeName: 'dark',
        themeValue: 'gray.900'
      }
    ]
  },
  {
    componentName: 'swap-dropdown',
    category: 'colors',
    style: 'text-color',
    theme: [
      {
        themeName: 'light',
        themeValue: 'gray.700'
      },
      {
        themeName: 'dark',
        themeValue: 'gray.900'
      }
    ]
  },
  {
    componentName: 'swap-dropdown',
    category: 'colors',
    style: 'option-hover-background-color',
    theme: [
      {
        themeName: 'light',
        themeValue: 'gray.200'
      },
      {
        themeName: 'dark',
        themeValue: 'gray.900'
      }
    ]
  },
  {
    componentName: 'swap-dropdown',
    category: 'colors',
    style: 'option-selected-background-color',
    theme: [
      {
        themeName: 'light',
        themeValue: 'gray.300'
      },
      {
        themeName: 'dark',
        themeValue: 'gray.900'
      }
    ]
  },
  // swap-panel
  {
    componentName: 'swap-panel',
    category: 'colors',
    style: 'header-color',
    theme: [
      {
        themeName: 'light',
        themeValue: 'gray.500'
      },
      {
        themeName: 'dark',
        themeValue: 'gray.500'
      }
    ]
  },
  {
    componentName: 'swap-panel',
    category: 'colors',
    style: 'available-value-color',
    theme: [
      {
        themeName: 'light',
        themeValue: 'gray.800'
      },
      {
        themeName: 'dark',
        themeValue: 'whiteAlpha.900'
      }
    ]
  },
  {
    componentName: 'swap-panel',
    category: 'colors',
    style: 'input-control-button-background-color',
    theme: [
      {
        themeName: 'light',
        themeValue: 'gray.400'
      },
      {
        themeName: 'dark',
        themeValue: 'gray.700'
      }
    ]
  },
  {
    componentName: 'swap-panel',
    category: 'colors',
    style: 'input-control-button-color',
    theme: [
      {
        themeName: 'light',
        themeValue: 'white'
      },
      {
        themeName: 'dark',
        themeValue: 'white'
      }
    ]
  },
  {
    componentName: 'swap-editable-input',
    category: 'colors',
    style: 'invalid-color',
    theme: [
      {
        themeName: 'light',
        themeValue: 'red.500'
      },
      {
        themeName: 'dark',
        themeValue: 'red.500'
      }
    ]
  }
];

export const semanticTokens = {
  semanticTokens: handleData(styleData)
};
