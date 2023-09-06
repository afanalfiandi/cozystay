import { Alert, ActivityIndicator, BackHandler, Modal, Image, StyleSheet, ScrollView, StatusBar, TouchableOpacity, Text, View, ToastAndroid } from 'react-native'
import React, { useState } from 'react'
import { globalStyle } from '../style/globalStyle';
import { globalColor } from '../style/globalColor';
import { TextInput } from 'react-native';
import { useFonts, Poppins_400Regular, Poppins_400Regular_Italic, Poppins_600SemiBold, Poppins_600SemiBold_Italic, Poppins_700Bold, Poppins_700Bold_Italic } from '@expo-google-fonts/poppins';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Auth = () => {
    const [refresh, setRefresh] = useState(Math.random());
    const [loading, setLoading] = useState(false);
    const [modal, setModal] = useState(false);
    const [levelLabel, setLevelLabel] = useState('Masuk sebagai')
    const navigation = useNavigation();

    // form
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [level, setLevel] = useState();

    const onSubmit = async () => {
        setLoading(!loading);
        setTimeout(() => {
            if (level == 1) {
                AsyncStorage.setItem('level', 'customer');
                navigation.navigate('CustomerHome')
            } else if (level == 2) {
                AsyncStorage.setItem('level', 'owner');
                navigation.navigate('OwnerHome')
            } else {
                ToastAndroid.show('Silahkan lengkapi form terlebih dahulu!', 3000);
            }
            setLoading(false);
        }, 2000);
    }
    useFocusEffect(
        React.useCallback(() => {
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


    let [fontsLoaded, fontError] = useFonts({
        Poppins_400Regular, Poppins_400Regular_Italic, Poppins_600SemiBold, Poppins_600SemiBold_Italic, Poppins_700Bold, Poppins_700Bold_Italic
    });

    if (!fontsLoaded && !fontError) {
        return null;
    }

    const signUp = () => {
        navigation.navigate('ChooseLevel');
    }


    return (
        <ScrollView style={globalStyle.scrollView} scrollEnabled={false}>
            <Modal
                animationType="fade"
                transparent={true}
                visible={loading}
                onRequestClose={() => {
                    setLoading(!loading);
                }}>
                <View style={globalStyle.loadingContainer}>
                    <ActivityIndicator size="large" color={globalColor.primary} />
                </View>
            </Modal>
            <Modal
                animationType="fade"
                transparent={true}
                visible={modal}
                onRequestClose={() => {
                    setModal(!modal);
                }}>
                <View style={globalStyle.modalFormContainer}>
                    <View style={globalStyle.modalContainer}>
                        <View style={globalStyle.modalFormHeader}>
                            <View style={globalStyle.headerTitleContainer}>
                                <Text style={[globalStyle.text, styles.regular]}>Masuk Sebagai</Text>
                            </View>
                            <View style={globalStyle.headerBtnContainer}>
                                <TouchableOpacity style={globalStyle.closeBtn} onPress={() => { setModal(!modal) }}>
                                    <Image source={require('../assets/icon/close-blue.png')} style={globalStyle.closeImg} />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={globalStyle.modalForm}>
                            <TouchableOpacity style={globalStyle.modalOptBtn} onPress={() => {
                                setLevel(1);
                                setLevelLabel('Pencari Kost');
                                setModal(!modal);
                            }}>
                                <Text style={styles.regular}>Pencari Kost</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={globalStyle.modalOptBtn} onPress={() => {
                                setLevel(2);
                                setLevelLabel('Pemilik Kost');
                                setModal(!modal);
                            }}>
                                <Text style={styles.regular}>Pemilik Kost</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
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
                    <Text style={[globalStyle.h1, styles.bold]}>Selamat Datang</Text>
                    <Text style={[globalStyle.text, styles.regular, globalStyle.mb20]}>Silahkan masuk untuk melanjutkan</Text>
                    <View style={[globalStyle.formGroup, globalStyle.spaceBetween, globalStyle.input]}>
                        <View style={globalStyle.imgInputContainer}>
                            <Image resizeMode='contain' style={globalStyle.imgInput} source={require('../assets/icon/input-user.png')} />
                        </View>
                        <TextInput value={username} onChangeText={setUsername} placeholder='Masukkan username Anda' style={[globalStyle.inputText, styles.regular]} />
                    </View>
                    <View style={[globalStyle.formGroup, globalStyle.spaceBetween, globalStyle.input]}>
                        <View style={globalStyle.imgInputContainer}>
                            <Image resizeMode='contain' style={globalStyle.imgInput} source={require('../assets/icon/input-password.png')} />
                        </View>
                        <TextInput value={password} onChangeText={setPassword} secureTextEntry placeholder='Masukkan kata sandi Anda' style={[globalStyle.inputText, styles.regular]} />
                    </View>
                    <View style={[globalStyle.formGroup, globalStyle.spaceBetween, globalStyle.input]}>
                        <View style={globalStyle.imgInputContainer}>
                            <Image resizeMode='contain' style={globalStyle.imgInput} source={require('../assets/icon/input-user-level.png')} />
                        </View>
                        <TouchableOpacity style={globalStyle.inputSelect} onPress={() => {
                            setModal(!modal);
                        }}>
                            <Text style={[styles.regular, { color: globalColor.muted }]}> {levelLabel} </Text>
                        </TouchableOpacity>
                        <View style={globalStyle.imgInputContainer}>
                            <Image resizeMode='contain' style={globalStyle.imgInput} source={require('../assets/icon/arrow-right-sm.png')} />
                        </View>
                    </View>
                    <View style={[globalStyle.formGroup]}>
                        <TouchableOpacity style={globalStyle.btnPrimary} onPress={onSubmit}>
                            <Text style={[globalStyle.btnText, styles.bold]}>masuk</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={[globalStyle.formGroup]}>
                        <View style={[globalStyle.spaceBetween, { justifyContent: 'center' }]}>
                            <Text style={[globalStyle.text, styles.regular]}>Belum punya akun? </Text>
                            <TouchableOpacity onPress={signUp}>
                                <Text style={[globalStyle.text, styles.bold, { color: globalColor.primary }]}>Daftar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}

export default Auth

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