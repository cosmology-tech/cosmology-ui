module.exports = {
  stories: [
    '../stories/**/*.stories.mdx',
    '../stories/**/*.stories.@(js|jsx|ts|tsx)'
  ],
  addons: [
    '@chakra-ui/storybook-addon',
    '@storybook/addon-links',
    'storybook-addon-next-router',
    '@storybook/addon-interactions',
    {
      name: '@storybook/addon-essentials',
      options: {
        outline: false
      }
    }
  ],
  staticDirs: ['../public'],
  framework: '@storybook/react',
  core: {
    builder: '@storybook/builder-webpack5'
  },
  features: {
    emotionAlias: false
  },
  refs: {
    '@chakra-ui/react': {
      disable: true // remove Chakra components from sidebar
    }
  }
};
