module.exports = {
  preset: '@react-native/jest-preset',
  setupFiles: ['./node_modules/react-native-gesture-handler/jestSetup.js', './jest.setup.js'],
  // These packages ship untranspiled ES modules.
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?|@react-native-firebase|@react-native-async-storage|@react-navigation|@notifee|@fawazahmed|@likashefqet|@d11|react-native-.*|react-redux|@reduxjs|redux|immer|reselect)/)',
  ],
};
