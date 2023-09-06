import { Modal, ActivityIndicator, TextInput, Image, StyleSheet, ScrollView, StatusBar, TouchableOpacity, Text, View, Dimensions, BackHandler, SafeAreaView, ToastAndroid } from 'react-native'
import React, { useState } from 'react'
import { globalColor } from '../../style/globalColor';
import { globalStyle } from '../../style/globalStyle';
import { useFonts, Poppins_400Regular, Poppins_400Regular_Italic, Poppins_600SemiBold, Poppins_600SemiBold_Italic, Poppins_700Bold, Poppins_700Bold_Italic } from '@expo-google-fonts/poppins';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { RadioButton, Checkbox } from 'react-native-paper';

const CustomerPayment = () => {
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);

    let [fontsLoaded, fontError] = useFonts({
        Poppins_400Regular, Poppins_400Regular_Italic, Poppins_600SemiBold, Poppins_600SemiBold_Italic, Poppins_700Bold, Poppins_700Bold_Italic
    });

    if (!fontsLoaded && !fontError) {
        return null;
    }

    return (
        <SafeAreaView style={[globalStyle.container, { justifyContent: 'flex-start', padding: 0 }]}>
            <View style={[styles.header, { paddingHorizontal: 10, paddingTop: 15 }]}>
                <View style={globalStyle.headerTitleContainer}>
                    <Text style={[globalStyle.text, styles.semiBold]}>Pembayaran</Text>
                </View>
            </View>
            <View style={[globalStyle.content, { padding: 25 }]}>
                <View style={[globalStyle.spaceBetween, { marginVertical: 7 }]}>
                    <Text style={styles.bold}>Total Pembayaran</Text>
                    <Text style={styles.bold}>Rp. 500.000</Text>
                </View>
                <View style={[globalStyle.spaceBetween, { marginVertical: 7 }]}>
                    <Text style={styles.bold}>Jatuh Tempo</Text>
                    <Text style={styles.bold}>Senin, 1 Januari 2023</Text>
                </View>
                <View style={[globalStyle.spaceBetween, { marginVertical: 7 }]}>
                    <Text style={styles.bold}>Metode Pembayaran</Text>
                    <Text style={styles.bold}>Mandiri</Text>
                </View>
                <View style={[globalStyle.spaceBetween, { marginVertical: 7 }]}>
                    <Image source={require('../../assets/payment/mandiri.png')} />
                </View>
                <View style={[{ marginVertical: 7 }]}>
                    <Text style={styles.bold}>No. Rekening :</Text>
                    <View style={[globalStyle.spaceBetween]}>
                        <Text style={[styles.bold, globalStyle.h1, { color: 'black' }]}>8806 123 123 123 123</Text>
                        <TouchableOpacity>
                            <Text style={[styles.bold, { color: globalColor.muted }]}>SALIN</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={[{ marginVertical: 7 }]}>
                    <Text style={styles.bold}>Petunjuk Transfer mBanking</Text>
                    <View style={[globalStyle.spaceArround, { marginVertical: 7, alignItems: 'center' }]}>
                        <View style={globalStyle.circle}>
                            <Text style={[styles.bold, globalStyle.textWhite]}>1</Text>
                        </View>
                        <Text style={styles.regular}>Pilih Transfer {'>'} Virtual Account Billing</Text>
                    </View>
                </View>
                <View style={[{ marginVertical: 7 }]}>
                    <View style={[globalStyle.spaceArround, { marginVertical: 7, alignItems: 'center' }]}>
                        <View style={globalStyle.circle}>
                            <Text style={[styles.bold, globalStyle.textWhite]}>2</Text>
                        </View>
                        <Text style={styles.regular}>Pilih Transfer {'>'} Pilih Rekening Debet</Text>
                    </View>
                </View>
                <View style={[{ marginVertical: 7 }]}>
                    <View style={[globalStyle.spaceArround, { marginVertical: 7, alignItems: 'center' }]}>
                        <View style={globalStyle.circle}>
                            <Text style={[styles.bold, globalStyle.textWhite]}>3</Text>
                        </View>
                        <Text style={styles.regular}>Masukkan Nomor Rekening Yang Tertera Diatas</Text>
                    </View>
                </View>
                <View style={[{ marginVertical: 7 }]}>
                    <View style={[globalStyle.spaceArround, { marginVertical: 7, alignItems: 'center' }]}>
                        <View style={globalStyle.circle}>
                            <Text style={[styles.bold, globalStyle.textWhite]}>4</Text>
                        </View>
                        <Text style={styles.regular}>Masukkan Nominal Yang Harus Dibayar</Text>
                    </View>
                </View>
            </View>
            <View style={[globalStyle.formGroup, { position: 'absolute', bottom: 20, width: '90%' }]}>
                <TouchableOpacity style={[globalStyle.btnPrimary]} onPress={() => {
                    navigation.navigate('CustomerHome');
                }}>
                    <Text style={[globalStyle.btnText, styles.bold]}>Tutup</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}


export default CustomerPayment

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
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
})