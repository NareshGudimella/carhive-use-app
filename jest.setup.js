/* eslint-env jest */
// Mocks for native modules so the App smoke test can render under Jest.

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest'),
);

jest.mock('@react-native-community/netinfo', () =>
  require('@react-native-community/netinfo/jest/netinfo-mock.js'),
);

jest.mock('react-native-device-info', () =>
  require('react-native-device-info/jest/react-native-device-info-mock'),
);

jest.mock('react-native-permissions', () => require('react-native-permissions/mock'));

jest.mock('@react-native-firebase/messaging', () => ({
  getMessaging: jest.fn(() => ({})),
  AuthorizationStatus: {
    NOT_DETERMINED: -1,
    DENIED: 0,
    AUTHORIZED: 1,
    PROVISIONAL: 2,
  },
  requestPermission: jest.fn(() => Promise.resolve(1)),
  getToken: jest.fn(() => Promise.resolve('')),
  onMessage: jest.fn(() => jest.fn()),
  onTokenRefresh: jest.fn(() => jest.fn()),
  onNotificationOpenedApp: jest.fn(() => jest.fn()),
  getInitialNotification: jest.fn(() => Promise.resolve(null)),
  setBackgroundMessageHandler: jest.fn(),
}));

jest.mock('@notifee/react-native', () => ({
  __esModule: true,
  default: {
    createChannel: jest.fn(() => Promise.resolve('default')),
    displayNotification: jest.fn(() => Promise.resolve()),
    getInitialNotification: jest.fn(() => Promise.resolve(null)),
    onForegroundEvent: jest.fn(() => jest.fn()),
    onBackgroundEvent: jest.fn(),
  },
  EventType: { DISMISSED: 0, PRESS: 1, ACTION_PRESS: 2, DELIVERED: 3 },
}));

jest.mock('react-native-razorpay', () => ({
  __esModule: true,
  default: { open: jest.fn(() => Promise.reject(new Error('mock'))) },
}));

// Reanimated 4 / Worklets need their native runtime, so the libraries built on
// them are stubbed for the render smoke test.
jest.mock('react-native-worklets', () => require('react-native-worklets/lib/module/mock'));

jest.mock('react-native-reanimated', () => ({
  __esModule: true,
  default: {
    View: require('react-native').View,
    createAnimatedComponent: component => component,
  },
}));

jest.mock('react-native-reanimated-carousel', () => ({
  Carousel: () => null,
  Pagination: () => null,
}));

jest.mock('@likashefqet/react-native-image-zoom', () => ({
  ImageZoom: () => null,
}));

jest.mock('@react-native-community/geolocation', () => ({
  __esModule: true,
  default: {
    getCurrentPosition: jest.fn(),
    watchPosition: jest.fn(),
    clearWatch: jest.fn(),
    requestAuthorization: jest.fn(),
    setRNConfiguration: jest.fn(),
  },
}));

jest.mock('react-native-keychain', () => {
  let store = {};
  return {
    setGenericPassword: jest.fn((username, password, options = {}) => {
      store[options.service || 'default'] = { username, password };
      return Promise.resolve({ service: options.service || 'default' });
    }),
    getGenericPassword: jest.fn((options = {}) =>
      Promise.resolve(store[options.service || 'default'] || false),
    ),
    resetGenericPassword: jest.fn((options = {}) => {
      delete store[options.service || 'default'];
      return Promise.resolve(true);
    }),
  };
});
