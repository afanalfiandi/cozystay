import * as React from 'react';
import { View, BackHandler, StyleSheet, Text, Image, StatusBar, Alert } from 'react-native';
import { NavigationContainer, useFocusEffect } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useFonts } from 'expo-font';
import SplashScreen from './page/SplashScreen';
import OwnerHome from './page/owner/OwnerHome';
import Auth from './page/Auth';
import RegisterUser from './page/RegisterUser';
import RegisterOwner from './page/RegisterOwner';
import ChooseLevel from './page/ChooseLevel';
import Add from './page/owner/Add';
import History from './page/owner/History';
import OwnerProfile from './page/owner/OwnerProfile';
import OwnerView from './page/owner/OwnerView';
import CustomerHome from './page/customer/CustomerHome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import globalColor from './style/globalColor';

const App = () => {
  const Tab = createBottomTabNavigator();
  const [refresh, setRefresh] = React.useState(Math.random());
  const getLevel = async () => {
    const lvl = 'customer';
    console.warn(lvl);
  }

  const level = getLevel();
  return (
    <NavigationContainer>
      <StatusBar
        animated={true}
        backgroundColor={'white'}
        barStyle='dark-content'
      />
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarHideOnKeyboard: true,
          tabBarShowLabel: false,
          tabBarStyle: {
            position: 'absolute',
            marginHorizontal: 25,
            backgroundColor: 'white',
            marginBottom: 15,
            borderRadius: 10,
            elevation: 2
          },
        }}
        initialRouteName='SplashScreen'>

        {/* GLOBAL */}
        <Tab.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{ tabBarStyle: { display: 'none' }, tabBarButton: () => null }}
        />
        <Tab.Screen
          name="Auth"
          component={Auth}
          options={{ tabBarStyle: { display: 'none' }, tabBarButton: () => null }}
        />
        <Tab.Screen
          name="ChooseLevel"
          component={ChooseLevel}
          options={{ tabBarStyle: { display: 'none' }, tabBarButton: () => null }}
        />
        <Tab.Screen
          name="RegisterUser"
          component={RegisterUser}
          options={{ tabBarStyle: { display: 'none' }, tabBarButton: () => null }}
        />
        <Tab.Screen
          name="RegisterOwner"
          component={RegisterOwner}
          options={{ tabBarStyle: { display: 'none' }, tabBarButton: () => null }}
        />
        <Tab.Screen
          name="Add"
          component={Add}
          options={{ tabBarStyle: { display: 'none' }, tabBarButton: () => null }}
        />

        {/* END GLOBAL */}

        {/* OWNER */}
        <Tab.Screen
          name="OwnerView"
          component={OwnerView}
          options={{ tabBarStyle: { display: 'none' }, tabBarButton: () => null }}
        />
        <Tab.Screen
          name="OwnerHome"
          component={OwnerHome}
          options={{
            headerShown: false,
            headerTransparent: true,
            title: " Home",
            tabBarIcon: ({ focused }) => {
              return (
                <View style={[{ opacity: focused ? 1 : 0.5 }]}>
                  <Image
                    source={
                      focused
                        ? require("./assets/icon/home-blue.png")
                        : require("./assets/icon/home-grey.png")
                    }
                    resizeMode="contain"
                    style={{
                      alignItems: "center",
                      width: 25,
                      height: 25,
                    }}
                  />
                </View>
              );
            },
          }}
        />
        <Tab.Screen
          name="History"
          component={History}
          options={{
            headerShown: false,
            headerTransparent: true,
            title: " Riwayat",
            tabBarIcon: ({ focused }) => {
              return (
                <View style={[{ opacity: focused ? 1 : 0.5 }]}>
                  <Image
                    source={
                      focused
                        ? require("./assets/icon/history-blue.png")
                        : require("./assets/icon/history-grey.png")
                    }
                    resizeMode="contain"
                    style={{
                      alignItems: "center",
                      width: 25,
                      height: 25,
                    }}
                  />
                </View>
              );
            },
          }}
        />
        <Tab.Screen
          name="OwnerProfile"
          component={OwnerProfile}
          options={{
            headerShown: false,
            headerTransparent: true,
            title: " Akun",
            tabBarIcon: ({ focused }) => {
              return (
                <View style={[{ opacity: focused ? 1 : 0.5 }]}>
                  <Image
                    source={
                      focused
                        ? require("./assets/icon/profile-blue.png")
                        : require("./assets/icon/profile-grey.png")
                    }
                    resizeMode="contain"
                    style={{
                      alignItems: "center",
                      width: 25,
                      height: 25,
                    }}
                  />
                </View>
              );
            },
          }}
        />
        {/* END OWNER */}
      </Tab.Navigator>
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
