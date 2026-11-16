import { registerRootComponent } from 'expo';

// `npm run storybook` sets EXPO_PUBLIC_STORYBOOK_ENABLED=true and the app
// boots into on-device Storybook instead of Homebase. Metro strips Storybook
// from the bundle otherwise (see metro.config.js).
const Root =
  process.env.EXPO_PUBLIC_STORYBOOK_ENABLED === 'true'
    ? require('./.rnstorybook').default
    : require('./src/app/App').default;

registerRootComponent(Root);
