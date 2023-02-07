module.exports = {
  stories: [
    '../stories/**/*.stories.mdx',
    '../stories/**/*.stories.@(js|jsx|ts|tsx)'
  ],
  addons: [
    {
      name: '@storybook/addon-essentials',
      options: {
        outline: false
      }
    },
    '@storybook/addon-links',
    '@storybook/addon-interactions'
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
