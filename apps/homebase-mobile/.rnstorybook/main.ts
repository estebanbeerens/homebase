import type { StorybookConfig } from '@storybook/react-native';

const main: StorybookConfig = {
  // Stories live next to their components in the UI libraries.
  stories: [
    '../../../libs/ui/atoms/src/**/*.stories.?(ts|tsx)',
    '../../../libs/ui/molecules/src/**/*.stories.?(ts|tsx)',
    '../../../libs/ui/organisms/src/**/*.stories.?(ts|tsx)',
  ],
  deviceAddons: [
    '@storybook/addon-ondevice-controls',
    '@storybook/addon-ondevice-actions',
  ],
};

export default main;
