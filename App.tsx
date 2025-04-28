import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/pages/HomeScreen';
import CalendarScreen from './src/pages/CalendarScreen';
import SelectVehicleScreen from './src/pages/SelectVehicleScreen';
import VehicleDetailsScreen from './src/pages/VehicleDetailsScreen';
import SignupScreen from './src/pages/SignupScreen';
import KycDetailsScreen from './src/pages/KycDetailsScreen';
import CarSummaryScreen from './src/pages/CarSummaryScreen';
import PaymentScreen from './src/pages/PaymentScreen';


const Stack = createNativeStackNavigator();

function RootStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name='CalendarScreen' component={CalendarScreen} />
      <Stack.Screen name='SelectVehicleScreen' component={SelectVehicleScreen} />
      <Stack.Screen name='VehicleDetailsScreen' component={VehicleDetailsScreen} />
      <Stack.Screen name='SignupScreen' component={SignupScreen} />
      <Stack.Screen name='KycDetailsScreen' component={KycDetailsScreen} />
      <Stack.Screen name='CarSummaryScreen' component={CarSummaryScreen} />
      <Stack.Screen name='PaymentScreen' component={PaymentScreen}/>
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  );
}