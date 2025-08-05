import React, { useEffect, useState } from 'react';
import {
  NavigationContainer,
  createNavigationContainerRef,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';
import NetInfo from '@react-native-community/netinfo';
import { store } from './src/storage/redux';

import HomeScreen from './src/pages/HomeScreen';
import SelectVehicleScreen from './src/pages/SelectVehicleScreen';
import VehicleDetailsScreen from './src/pages/VehicleDetailsScreen';
import SignupScreen from './src/pages/SignupScreen';
import KycDetailsScreen from './src/pages/KycDetailsScreen';
import CarSummaryScreen from './src/pages/CarSummaryScreen';
import PaymentScreen from './src/pages/PaymentScreen';
import PaymentSuccessScreen from './src/pages/PaymentSuccessScreen';
import RentalsScreen from './src/pages/RentalsScreen';
import OrderDetailsScreen from './src/pages/OrderDetailsScreen';
import ExtendServiceRequestScreen from './src/pages/ExtendServiceRequestScreen';
import ProfileScreen from './src/pages/ProfileScreen';
import ProfileDetailsScreen from './src/pages/ProfileDetailsScreen';
import HostScreen from './src/pages/HostScreen';
import BecomeHostScreen from './src/pages/BecomeHostScreen';
import SelectCityScreen from './src/pages/SelectCityScreen';
import NotificationScreen from './src/pages/notificationScreen';
import RattingScreen from './src/pages/RattingScreen';
import SplaceScreen from './src/pages/SplaceScreen';
import NoNetworkScreen from './src/pages/NoNetworkScreen';
import NetworkListener from './src/components/NetworkListener';


export const navigationRef = createNavigationContainerRef();
const Stack = createNativeStackNavigator();

function RootStack() {
  return (
    <Stack.Navigator initialRouteName='SplaceScreen' screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SplaceScreen" component={SplaceScreen} />
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="SelectCityScreen" component={SelectCityScreen} />
      <Stack.Screen name="SelectVehicleScreen" component={SelectVehicleScreen} />
      <Stack.Screen name="VehicleDetailsScreen" component={VehicleDetailsScreen} />
      <Stack.Screen name="SignupScreen" component={SignupScreen} />
      <Stack.Screen name="KycDetailsScreen" component={KycDetailsScreen} />
      <Stack.Screen name="CarSummaryScreen" component={CarSummaryScreen} />
      <Stack.Screen name="PaymentScreen" component={PaymentScreen} />
      <Stack.Screen name="PaymentSuccessScreen" component={PaymentSuccessScreen} />
      <Stack.Screen name="RentalsScreen" component={RentalsScreen} />
      <Stack.Screen name="OrderDetailsScreen" component={OrderDetailsScreen} />
      <Stack.Screen name="ExtendServiceRequestScreen" component={ExtendServiceRequestScreen} />
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen name="ProfileDetailsScreen" component={ProfileDetailsScreen} />
      <Stack.Screen name="HostScreen" component={HostScreen} />
      <Stack.Screen name="BecomeHostScreen" component={BecomeHostScreen} />
      <Stack.Screen name="NotificationScreen" component={NotificationScreen} />
      <Stack.Screen name="RattingScreen" component={RattingScreen} />
      <Stack.Screen name="NoNetworkScreen" component={NoNetworkScreen} />
    </Stack.Navigator>
  );
}

export default function App() {

  const [isConnected, setIsConneted] = React.useState(true)

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      const hasInternet = state.isConnected
      setIsConneted(isConnected);
      console.log('Network status:', hasInternet);
    });

    return () => unsubscribe();
  }, []);

  if (!isConnected) {
    return <NoNetworkScreen />;
  }


  return (
    <Provider store={store}>
      <NavigationContainer ref={navigationRef}>
        <NetworkListener />
        <RootStack />
      </NavigationContainer>
    </Provider>
  );
}
