import {Keyboard, Image, TouchableOpacity, Dimensions, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';

const OwnerTab = () => {
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
        <View style={[globalStyle.bottomTabContainer, { bottom: routeName == 'OwnerProfile' ? 17 : 7, opacity: keyboardStatus == 1 ? 0 : 1 }]}>
            <TouchableOpacity onPress={() => { onNavigate('OwnerHome') }} style={globalStyle.bottomTabBtn}>
                <Image style={globalStyle.bottomTabImg} source={routeName == 'OwnerHome' ? require('../assets/icon/home-blue.png') : require('../assets/icon/home-grey.png')} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { onNavigate('History') }} style={globalStyle.bottomTabBtn}>
                <Image style={globalStyle.bottomTabImg} source={routeName == 'History' ? require('../assets/icon/history-blue.png') : require('../assets/icon/history-grey.png')} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { onNavigate('OwnerProfile') }} style={globalStyle.bottomTabBtn}>
                <Image style={globalStyle.bottomTabImg} source={routeName == 'OwnerProfile' ? require('../assets/icon/profile-blue.png') : require('../assets/icon/profile-grey.png')} />
            </TouchableOpacity>
        </View>
    )
}

export default OwnerTab

const globalStyle = StyleSheet.create({
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
        width: '33%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    bottomTabImg: {
        width: 50,
        height: 25,
        resizeMode: 'contain'
    }
})