jest.mock('expo/src/winter/ImportMetaRegistry', () => ({
  ImportMetaRegistry: {
    get url() {
      return null;
    },
  },
}));

// Expo SDK 55+ installs lazy winter-runtime globals (fetch, URL, etc.) that
// require files Jest treats as "outside of the scope of the test code" in a
// monorepo. Replace them with the runtime's own globals so the lazy getters
// never fire during tests.
const defineGlobal = (name: string, value: unknown) => {
  try {
    Object.defineProperty(global, name, {
      value,
      configurable: true,
      writable: true,
    });
  } catch {
    // Ignore environments that don't allow redefining these globals.
  }
};
defineGlobal('fetch', globalThis.fetch);
defineGlobal('Headers', globalThis.Headers);
defineGlobal('Request', globalThis.Request);
defineGlobal('Response', globalThis.Response);
defineGlobal('FormData', globalThis.FormData);
defineGlobal('URL', globalThis.URL);
defineGlobal('URLSearchParams', globalThis.URLSearchParams);

if (typeof global.structuredClone === 'undefined') {
  global.structuredClone = (object: unknown) => JSON.parse(JSON.stringify(object));
}

// react-aria (used by Gluestack) probes window.screen at import time, which
// the React Native Jest environment does not provide.
const testWindow = globalThis as { window?: { screen?: object } };
if (testWindow.window && !testWindow.window.screen) {
  testWindow.window.screen = {};
}

// NativeWind reads darkMode from the Tailwind config at Metro build time,
// which Jest never runs. Homebase is light-only, so pin the scheme.
jest.mock('nativewind', () => ({
  ...jest.requireActual('nativewind'),
  useColorScheme: () => ({
    colorScheme: 'light',
    setColorScheme: jest.fn(),
    toggleColorScheme: jest.fn(),
  }),
}));
