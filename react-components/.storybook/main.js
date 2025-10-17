const { mergeConfig } = require('vite');

module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-toolbars',
    '@storybook/addon-docs',
    '@storybook/addon-controls',
    '@storybook/addon-a11y',
    '@storybook/addon-mdx-gfm',
  ],
  async viteFinal(config, { configType }) {
    return mergeConfig(config, {
      base: './',
      css: {
        preprocessorOptions: {
          scss: {
            implementation: require('sass'),
          },
        },
      },
    });
  },
  framework: {
    name: '@storybook/react-vite',
    options: {
      builder: {
        viteConfigPath: 'react-components/vite.config.ts',
      },
    },
  },
  docs: {
    autodocs: true,
  },
};
