import { Modal, Image, StyleSheet, ScrollView, StatusBar, TouchableOpacity, Text, View } from 'react-native'
import React, { useState } from 'react'
import { globalStyle } from '../style/globalStyle'
import { globalColor } from '../style/globalColor';
import { useFonts, Poppins_400Regular, Poppins_400Regular_Italic, Poppins_600SemiBold, Poppins_600SemiBold_Italic, Poppins_700Bold, Poppins_700Bold_Italic } from '@expo-google-fonts/poppins';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { BackHandler } from 'react-native';

const ChooseLevel = () => {
    const navigation = useNavigation();
    const [refresh, setRefresh] = useState(Math.random());
    
    useFocusEffect(
        React.useCallback(() => {
            const backAction = () => {
                navigation.navigate('Auth')
                return true;
            };

            const backHandler = BackHandler.addEventListener(
                "hardwareBackPress",
                backAction
            );
            return () => backHandler.remove();
        }, [refresh]));
        
    let [fontsLoaded, fontError] = useFonts({
        Poppins_400Regular, Poppins_400Regular_Italic, Poppins_600SemiBold, Poppins_600SemiBold_Italic, Poppins_700Bold, Poppins_700Bold_Italic
    });

    if (!fontsLoaded && !fontError) {
        return null;
    }

    const signIn = () => {
        navigation.navigate('Auth');
    }

    const onSubmit = (level) => {
        if (level == 1) {
            navigation.navigate('RegisterUser', {
                level: level
            })
        } else {
            navigation.navigate('RegisterOwner', {
                level: level
            })
        }
    }
    return (
        <View style={globalStyle.container}>
            <StatusBar
                animated={true}
                backgroundColor={globalColor.white}
                barStyle='dark-content'
            />
            <View style={styles.header}>
                <Image resizeMode='contain' source={require('../assets/logo/app-logo-blue.png')} />
                <Text style={[styles.bold, globalStyle.pageTitle]}>cozystay</Text>
            </View>
            <View style={globalStyle.form}>
                <Text style={[globalStyle.h1, styles.bold]}>Pendaftaran Akun</Text>
                <Text style={[globalStyle.text, styles.regular, globalStyle.mb20]}>Daftar sebagai</Text>
                <View style={[globalStyle.formGroup, globalStyle.spaceBetween, globalStyle.input]}>
                    <View style={globalStyle.imgInputContainer}>
                        <Image resizeMode='contain' style={globalStyle.imgInput} source={require('../assets/icon/input-user.png')} />
                    </View>
                    <TouchableOpacity style={globalStyle.inputSelect} onPress={() => { onSubmit(1) }}>
                        <Text style={[styles.regular, { color: globalColor.muted }]}> Pencari Kost </Text>
                    </TouchableOpacity>
                    <View style={globalStyle.imgInputContainer}>
                        <Image resizeMode='contain' style={globalStyle.imgInput} source={require('../assets/icon/arrow-right-sm.png')} />
                    </View>
                </View>
                <View style={[globalStyle.formGroup, globalStyle.spaceBetween, globalStyle.input]}>
                    <View style={globalStyle.imgInputContainer}>
                        <Image resizeMode='contain' style={globalStyle.imgInput} source={require('../assets/icon/input-owner.png')} />
                    </View>
                    <TouchableOpacity style={globalStyle.inputSelect} onPress={() => { onSubmit(2) }}>
                        <Text style={[styles.regular, { color: globalColor.muted }]}> Pemilik Kost </Text>
                    </TouchableOpacity>
                    <View style={globalStyle.imgInputContainer}>
                        <Image resizeMode='contain' style={globalStyle.imgInput} source={require('../assets/icon/arrow-right-sm.png')} />
                    </View>
                </View>
                <View style={[globalStyle.formGroup]}>
                    <View style={[globalStyle.spaceBetween, { justifyContent: 'center' }]}>
                        <Text style={[globalStyle.text, styles.regular]}>Sudah punya akun? </Text>
                        <TouchableOpacity onPress={signIn}>
                            <Text style={[globalStyle.text, styles.bold, { color: globalColor.primary }]}>Masuk</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default ChooseLevel

const styles = StyleSheet.create({
    regular: {
        fontFamily: 'Poppins_400Regular'
    },
    regularItalic: {
        fontFamily: 'Poppins_400Regular_Italic'
    },
    semiBold: {
        fontFamily: 'Poppins_600SemiBold'
    },
    semiBoldItalic: {
        fontFamily: 'Poppins_600SemiBold_Italic'
    },
    bold: {
        fontFamily: 'Poppins_700Bold'
    },
    boldItalic: {
        fontFamily: 'Poppins_700Bold_Italic'
    },
    header: {
        position: 'absolute',
        top: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
    }
})