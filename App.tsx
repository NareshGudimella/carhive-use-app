import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/pages/HomeScreen';
import SelectVehicleScreen from './src/pages/SelectVehicleScreen';
import VehicleDetailsScreen from './src/pages/VehicleDetailsScreen';
import SignupScreen from './src/pages/SignupScreen';
import KycDetailsScreen from './src/pages/KycDetailsScreen';
import CarSummaryScreen from './src/pages/CarSummaryScreen';
import PaymentScreen from './src/pages/PaymentScreen';
import PaymentSuccessScreen from './src/pages/PaymentSuccessScreen';
import FavoritesScreen from './src/pages/FavoritesScreen';
import RentalsScreen from './src/pages/RentalsScreen';
import OrderDetailsScreen from './src/pages/OrderDetailsScreen';
import ExtendServiceRequestScreen from './src/pages/ExtendServiceRequestScreen';
import ProfileScreen from './src/pages/ProfileScreen';
import ProfileDetailsScreen from './src/pages/ProfileDetailsScreen';
import HostScreen from './src/pages/HostScreen';
import BecomeHostScreen from './src/pages/BecomeHostScreen';
import { Provider } from 'react-redux';
import { store } from './src/storage/redux';
import SelectCityScreen from './src/pages/SelectCityScreen';
import { Foregroundmessage, requestfirebasePermissions } from './src/firebase/firebase';
import { getCity, setCity } from './src/storage/AsyncStorage';


const Stack = createNativeStackNavigator();

function RootStack() {
  React.useEffect(() => {
    requestfirebasePermissions()
    Foregroundmessage()
  })

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name='SelectCityScreen' component={SelectCityScreen} />
      <Stack.Screen name='SelectVehicleScreen' component={SelectVehicleScreen} />
      <Stack.Screen name='VehicleDetailsScreen' component={VehicleDetailsScreen} />
      <Stack.Screen name='SignupScreen' component={SignupScreen} />
      <Stack.Screen name='KycDetailsScreen' component={KycDetailsScreen} />
      <Stack.Screen name='CarSummaryScreen' component={CarSummaryScreen} />
      <Stack.Screen name='PaymentScreen' component={PaymentScreen} />
      <Stack.Screen name='PaymentSuccessScreen' component={PaymentSuccessScreen} />
      <Stack.Screen name='FavoritesScreen' component={FavoritesScreen} />
      <Stack.Screen name='RentalsScreen' component={RentalsScreen} />
      <Stack.Screen name='OrderDetailsScreen' component={OrderDetailsScreen} />
      <Stack.Screen name='ExtendServiceRequestScreen' component={ExtendServiceRequestScreen} />
      <Stack.Screen name='ProfileScreen' component={ProfileScreen} />
      <Stack.Screen name='ProfileDetailsScreen' component={ProfileDetailsScreen} />
      <Stack.Screen name='HostScreen' component={HostScreen} />
      <Stack.Screen name='BecomeHostScreen' component={BecomeHostScreen} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <RootStack />
      </NavigationContainer>
    </Provider>
  );
}