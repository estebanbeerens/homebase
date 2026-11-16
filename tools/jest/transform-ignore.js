// Packages that ship untranspiled ESM/TS and must go through Babel in Jest.
// Extends jest-expo's default list with Gluestack and NativeWind.
const transpiled = [
  '(jest-)?react-native',
  '@react-native(-community)?',
  'expo(nent)?',
  '@expo(nent)?/.*',
  '@expo-google-fonts/.*',
  'react-navigation',
  '@react-navigation/.*',
  'react-native-svg',
  '@gluestack-ui/.*',
  '@gluestack/.*',
  '@legendapp/.*',
  'nativewind',
  'react-native-css-interop',
];

module.exports = [`node_modules/(?!(${transpiled.join('|')}))`];
