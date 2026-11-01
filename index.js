/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';
import notifee from '@notifee/react-native';
import {notifeeBackgroundHandler} from './src/firebase/firebase';
 messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
  })
notifee.onBackgroundEvent(notifeeBackgroundHandler);

AppRegistry.registerComponent(appName, () => App);
