import * as React from 'react';
import { View, BackHandler, StyleSheet, Text, Image, StatusBar, Alert } from 'react-native';
import { NavigationContainer, useFocusEffect } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useFonts } from 'expo-font';
import SplashScreen from './page/SplashScreen';
import OwnerHome from './page/owner/OwnerHome';
import Auth from './page/Auth';
import RegisterCustomer from './page/RegisterCustomer';
import RegisterOwner from './page/RegisterOwner';
import ChooseLevel from './page/ChooseLevel';
import Add from './page/owner/Add';
import History from './page/owner/History';
import OwnerProfile from './page/owner/OwnerProfile';
import OwnerView from './page/owner/OwnerView';
import CustomerHome from './page/customer/CustomerHome';
import CustomerHistory from './page/customer/CustomerHistory';
import CustomerProfile from './page/customer/CustomerProfile';
import CustomerSearch from './page/customer/CustomerSearch';
import CustomerView from './page/customer/CustomerView';
import CustomerNotification from './page/customer/CustomerNotification';
import CustomerSewa from './page/customer/CustomerSewa';
import CustomerTransaction from './page/customer/CustomerTransaction';
import CustomerPayment from './page/customer/CustomerPayment';
import MandiriPayment from './page/customer/MandiriPayment';


import AsyncStorage from '@react-native-async-storage/async-storage';
import globalColor from './style/globalColor';
import { navigationRef } from './function/navigationRef';

const App = () => {
  const Tab = createBottomTabNavigator();
  const Stack = createNativeStackNavigator();

  const [refresh, setRefresh] = React.useState(Math.random());
  const getLevel = async () => {
    const lvl = 'customer';
  }

  const level = getLevel();
  return (
    <NavigationContainer ref={navigationRef}>
      <StatusBar
        animated={true}
        backgroundColor={'white'}
        barStyle='dark-content'
      />
      <Stack.Navigator screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="Auth" component={Auth} />
        <Stack.Screen name="OwnerHome" component={OwnerHome} />
        <Stack.Screen name="RegisterCustomer" component={RegisterCustomer} />
        <Stack.Screen name="RegisterOwner" component={RegisterOwner} />
        <Stack.Screen name="ChooseLevel" component={ChooseLevel} />
        <Stack.Screen name="Add" component={Add} />
        <Stack.Screen name="History" component={History} />
        <Stack.Screen name="OwnerProfile" component={OwnerProfile} />
        <Stack.Screen name="OwnerView" component={OwnerView} />
        <Stack.Screen name="CustomerHome" component={CustomerHome} />
        <Stack.Screen name="CustomerHistory" component={CustomerHistory} />
        <Stack.Screen name="CustomerSearch" component={CustomerSearch} />
        <Stack.Screen name="CustomerProfile" component={CustomerProfile} />
        <Stack.Screen name="CustomerView" component={CustomerView} />
        <Stack.Screen name="CustomerNotification" component={CustomerNotification} />
        <Stack.Screen name="CustomerSewa" component={CustomerSewa} />
        <Stack.Screen name="CustomerTransaction" component={CustomerTransaction} />
        <Stack.Screen name="CustomerPayment" component={CustomerPayment} />
        <Stack.Screen name="MandiriPayment" component={MandiriPayment} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
