module.exports = {
  preset: 'react-native',
  setupFiles: ['./node_modules/react-native-gesture-handler/jestSetup.js', './jest.setup.js'],
  // These packages ship untranspiled ES modules.
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?|@react-native-firebase|@react-navigation|@notifee|@fawazahmed|@likashefqet|react-native-.*|react-redux|@reduxjs|redux|immer|reselect)/)',
  ],
};
