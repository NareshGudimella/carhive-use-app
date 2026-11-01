const reactNativeConfig = require('@react-native/eslint-config/flat');

// The app is TypeScript, not Flow. eslint-plugin-ft-flow (enabled for .js files by the
// React Native config) still calls context.getAllComments, which ESLint 9 removed.
const flowRulesOff = Object.fromEntries(
  reactNativeConfig
    .flatMap(entry => Object.keys(entry.rules || {}))
    .filter(rule => rule.startsWith('ft-flow/'))
    .map(rule => [rule, 'off']),
);

module.exports = [
  {
    // Native projects, CocoaPods, Ruby gems and build output are not app source.
    ignores: ['android/**', 'ios/**', 'vendor/**', 'coverage/**'],
  },
  ...reactNativeConfig,
  { rules: flowRulesOff },
  {
    // Jest setup runs inside Jest (the legacy config gave it the jest env).
    files: ['jest.setup.js'],
    languageOptions: { globals: { jest: 'readonly' } },
  },
];
