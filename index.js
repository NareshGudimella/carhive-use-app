/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {getMessaging, setBackgroundMessageHandler} from '@react-native-firebase/messaging';
import notifee from 'react-native-notify-kit';
import {notifeeBackgroundHandler} from './src/firebase/firebase';
setBackgroundMessageHandler(getMessaging(), async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
  })
notifee.onBackgroundEvent(notifeeBackgroundHandler);

AppRegistry.registerComponent(appName, () => App);
