import { StyleDataType, ThemeListType } from '../utils/types';

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
    style: 'active-text-color',
    theme: [
      { themeName: 'light', themeValue: 'primary.500' },
      { themeName: 'dark', themeValue: 'primary.400' }
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
  }
];

export const semanticTokens = {
  semanticTokens: handleData(styleData)
};
