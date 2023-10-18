import { Alert, StyleSheet, Button, Text, View, Image, StatusBar, Dimensions, BackHandler } from 'react-native'
import React, { useEffect, useState } from 'react'
import { globalColor } from '../style/globalColor';
import Animated, { withRepeat, useSharedValue, withTiming, useAnimatedStyle, Easing, withSpring } from 'react-native-reanimated';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SplashScreen = () => {
  const [refresh, setRefresh] = useState(Math.random());
  const navigation = useNavigation();
  const width = useSharedValue(10);
  const fSize = useSharedValue(10);
  const duration = 2000;
  const easing = Easing.bezier(0.25, -0.5, 0.25, 1);
  const sv = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${sv.value * 360}deg` }],
  }));

  useEffect(() => {
    sv.value = withRepeat(withTiming(1, { duration, easing }), -1);
  }, []);
  useFocusEffect(
    React.useCallback(() => {
      animate();

      setTimeout(() => {
        animateOut();
        setTimeout(() => {
          navig();
        }, 500);
      }, 3000);

      const backAction = () => {
        Alert.alert("", "Apakah Anda yakin ingin keluar dari aplikasi?", [
          {
            text: "Batal",
            onPress: () => null,
            style: "cancel",
          },
          { text: "Keluar", onPress: () => BackHandler.exitApp() },
        ]);
        return true;
      };

      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        backAction
      );
      return () => backHandler.remove();
    }, [refresh]));

  const animate = () => {
    width.value = withSpring(50);
    fSize.value = withSpring(18);
  };

  const animateOut = () => {
    width.value = withSpring(0);
    fSize.value = withSpring(0);
  };

  const navig = async () => {
    const isLoggedIn = await AsyncStorage.getItem('loggedIn');
    const userData = JSON.parse(await AsyncStorage.getItem('userData'));
    // console.log(userData.id_level);
    if (isLoggedIn == 'true') {
      if (userData.id_level == 1) {
        navigation.navigate('CustomerHome');
      } else {
        navigation.navigate('OwnerHome');
      }
    } else {
      navigation.navigate('Auth');
    }
  }
  return (
    <View style={styles.container}>
      <StatusBar
        animated={true}
        backgroundColor={globalColor.primary}
        barStyle='light-content'
      />

      <View style={styles.content}>
        <Animated.Image resizeMode='contain' style={[styles.img, { width: width }, animatedStyle]} source={require('../assets/logo/app-logo-white.png')} />
        <Animated.Text style={[styles.text, { fontSize: fSize }]}>cozystay</Animated.Text>
      </View>
    </View >
  )
}

export default SplashScreen

const styles = StyleSheet.create({
  semiBold: {
  },
  container: {
    backgroundColor: globalColor.primary,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  content: {
    width: Dimensions.get("screen").width,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  img: {
    marginRight: 5,
  },
  text: {
    color: globalColor.white,
    textTransform: 'uppercase',
    fontWeight: 'bold',
    letterSpacing: 5,
  },
  box: {
    height: 100,
    backgroundColor: '#b58df1',
    borderRadius: 20,
    marginVertical: 64,
  },
})