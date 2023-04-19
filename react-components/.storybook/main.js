const { mergeConfig } = require('vite');
const viteTsConfigPaths = require('vite-tsconfig-paths').default;

module.exports = {
  core: { builder: '@storybook/builder-vite' },
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-toolbars',
    '@storybook/addon-docs',
    '@storybook/addon-controls',
    '@storybook/addon-a11y',
  ],
  async viteFinal(config, { configType }) {
    return mergeConfig(config, {
      base: './',
      plugins: [
        viteTsConfigPaths({
          root: '../../',
        }),
      ],
    });
  },
};

// To customize your Vite configuration you can use the viteFinal field.
// Check https://storybook.js.org/docs/react/builders/vite#configuration
// and https://nx.dev/packages/storybook/documents/custom-builder-configs
