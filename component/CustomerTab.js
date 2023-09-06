import { Image, Keyboard, TouchableOpacity, Dimensions, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';

const CustomerTab = () => {
    const navigation = useNavigation();
    const route = useRoute();

    const [refresh, setRefresh] = useState(Math.random());
    const [routeName, setRouteName] = useState();
    const [keyboardStatus, setKeyboardStatus] = useState('');

    const getPage = () => {
        setRouteName(route.name);
        setTimeout(() => {
            setRouteName(route.name);
        }, 100);
    }

    const onNavigate = (page) => {
        navigation.navigate(page)
    }

    const onKeyboard = () => {
        const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
            setKeyboardStatus(1);
        });
        const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
            setKeyboardStatus(0);
        });

        return () => {
            showSubscription.remove();
            hideSubscription.remove();
        };
    }
    useFocusEffect(
        React.useCallback(() => {
            getPage();
            onKeyboard();
        }, [refresh]));

    return (
        <View style={[globalStyle.container, { opacity: keyboardStatus == 1 ? 0 : 1 }]}>
            <View style={globalStyle.bottomTabContainer}>
                <TouchableOpacity style={globalStyle.bottomTabBtn} onPress={() => { onNavigate('CustomerHome') }}>
                    <Image source={routeName == 'CustomerHome' ? require('../assets/icon/home-blue.png') : require('../assets/icon/home-grey.png')} />
                </TouchableOpacity>
                <TouchableOpacity style={globalStyle.bottomTabBtn} onPress={() => { onNavigate('CustomerHistory') }}>
                    <Image source={routeName == 'CustomerHistory' ? require('../assets/icon/history-blue.png') : require('../assets/icon/history-grey.png')} />
                </TouchableOpacity>
                <TouchableOpacity style={globalStyle.bottomTabBtn} onPress={() => { onNavigate('CustomerSearch') }}>
                    <Image source={routeName == 'CustomerSearch' ? require('../assets/icon/lup-blue.png') : require('../assets/icon/lup-grey.png')} />
                </TouchableOpacity>
                <TouchableOpacity style={globalStyle.bottomTabBtn} onPress={() => { onNavigate('CustomerProfile') }}>
                    <Image source={routeName == 'CustomerProfile' ? require('../assets/icon/profile-blue.png') : require('../assets/icon/profile-grey.png')} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default CustomerTab

const globalStyle = StyleSheet.create({
    container: {
        width: Dimensions.get('screen').width,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        position: 'absolute',
        bottom: 17
    },
    bottomTabContainer: {
        height: 50,
        borderRadius: 10,
        alignItems: 'center',
        width: Dimensions.get('screen').width * 0.88,
        position: 'absolute',
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: 0.21,
        shadowRadius: 7.68,
        elevation: 10
    },
    bottomTabBtn: {
        width: '25%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    bottomTabImg: {
        width: 50,
        height: 25,
        resizeMode: 'contain'
    }
})