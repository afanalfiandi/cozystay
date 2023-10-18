import { Modal, ActivityIndicator, TextInput, Image, StyleSheet, ScrollView, StatusBar, TouchableOpacity, Text, View, Dimensions, BackHandler, SafeAreaView, ToastAndroid } from 'react-native'
import React, { useState } from 'react'
import { globalColor } from '../../style/globalColor';
import { globalStyle } from '../../style/globalStyle';
import { useFonts, Poppins_400Regular, Poppins_400Regular_Italic, Poppins_600SemiBold, Poppins_600SemiBold_Italic, Poppins_700Bold, Poppins_700Bold_Italic } from '@expo-google-fonts/poppins';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { RadioButton, Checkbox } from 'react-native-paper';
import Rupiah from '../../component/Rupiah';
import moment from 'moment/moment';
import * as Clipboard from 'expo-clipboard';
import BcaInstruction from '../../component/BcaInstruction';
import BriInstruction from '../../component/BriInstruction';
import BniInstruction from '../../component/BniInstruction';

const CustomerPayment = ({ route }) => {
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);

    let [fontsLoaded, fontError] = useFonts({
        Poppins_400Regular, Poppins_400Regular_Italic, Poppins_600SemiBold, Poppins_600SemiBold_Italic, Poppins_700Bold, Poppins_700Bold_Italic
    });

    if (!fontsLoaded && !fontError) {
        return null;
    }

    const currency = route.params.currency;
    const expiry_time = route.params.expiry_time;
    const fraud_status = route.params.fraud_status;
    const gross_amount = route.params.gross_amount;
    const merchant_id = route.params.merchant_id;
    const order_id = route.params.order_id;
    const payment_type = route.params.payment_type;
    const status_code = route.params.status_code;
    const status_message = route.params.status_message;
    const transaction_id = route.params.transaction_id;
    const transaction_status = route.params.transaction_status;
    const transaction_time = route.params.transaction_time;
    const bank = route.params.va_numbers[0].bank;
    const va_number = route.params.va_numbers[0].va_number;


    const copyToClipboard = async () => {
        await Clipboard.setStringAsync(va_number);
        ToastAndroid.show('Nomor VA berhasil disalin', 3000);
    };
    return (
        <SafeAreaView style={[globalStyle.container, { justifyContent: 'flex-start', padding: 0 }]}>
            <StatusBar
                animated={true}
                backgroundColor={globalColor.white}
                barStyle='dark-content'
            />
            <View style={[styles.header, { paddingHorizontal: 10, paddingTop: 15 }]}>
                <View style={globalStyle.headerTitleContainer}>
                    <Text style={[globalStyle.text, styles.semiBold]}>Pembayaran</Text>
                </View>
            </View>
            <View style={[globalStyle.content, { padding: 25 }]}>
                <View style={[globalStyle.spaceBetween, { marginVertical: 7 }]}>
                    <Text style={[styles.semiBold, globalStyle.text]}>No Transaksi</Text>
                    <Text style={[styles.semiBold, globalStyle.text]}>{order_id}</Text>
                </View>
                <View style={[globalStyle.spaceBetween, { marginVertical: 7 }]}>
                    <Text style={[styles.semiBold, globalStyle.text]}>Status Pembayaran</Text>
                    <Text style={[styles.semiBold, globalStyle.text]}>{transaction_status}</Text>
                </View>
                <View style={[globalStyle.spaceBetween, { marginVertical: 7 }]}>
                    <Text style={[styles.semiBold, globalStyle.text]}>Total Pembayaran</Text>
                    <Rupiah numb={gross_amount} />
                </View>
                <View style={[globalStyle.spaceBetween, { marginVertical: 7 }]}>
                    <Text style={[styles.semiBold, globalStyle.text]}>Tgl Transaksi</Text>
                    <Text style={[styles.semiBold, globalStyle.text]}>{moment(transaction_time).format('DD MMMM YYYY, HH:mm ')}</Text>
                </View>
                <View style={[globalStyle.spaceBetween, { marginVertical: 7 }]}>
                    <Text style={[styles.semiBold, globalStyle.text]}>Metode Pembayaran</Text>
                    <Text style={[styles.semiBold, { textTransform: 'uppercase' }]}>{bank}</Text>
                </View>
                {/* <View style={[globalStyle.spaceBetween, { marginVertical: 7 }]}>
                    <Image source={require('../../assets/payment/' + {'mandiri'} + '.png')} />
                </View> */}
                <View style={[{ marginVertical: 7 }]}>
                    <Text style={[styles.semiBold, globalStyle.text]}>No. Virtual Account :</Text>
                    <View style={[globalStyle.spaceBetween]}>
                        <Text style={[styles.semiBold, globalStyle.h1, { color: 'black' }]}>{va_number}</Text>
                        <TouchableOpacity onPress={copyToClipboard}>
                            <Text style={[styles.semiBold, { color: globalColor.muted }]}>SALIN</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <Text style={[styles.semiBold, globalStyle.text]}>Petunjuk Transfer mBanking</Text>
                {/* PAYMENT INSTRUCTION */}
                {bank == 'bca' && (
                    <BcaInstruction />
                )}
                {bank == 'bri' && (
                    <BriInstruction />
                )}
                {bank == 'bni' && (
                    <BniInstruction />
                )}
            </View>
            <View style={[globalStyle.formGroup, { position: 'absolute', bottom: 75, width: '90%' }]}>
                <TouchableOpacity style={[globalStyle.btnOutlinePrimary]} onPress={() => {
                    navigation.navigate('CustomerHome');
                }}>
                    <Text style={[globalStyle.btnText, styles.semiBold, { color: globalColor.primary }]}>SIMPAN DETAIL PEMBAYARAN</Text>
                </TouchableOpacity>
            </View>
            <View style={[globalStyle.formGroup, { position: 'absolute', bottom: 20, width: '90%' }]}>
                <TouchableOpacity style={[globalStyle.btnPrimary]} onPress={() => {
                    navigation.navigate('CustomerHome');
                }}>
                    <Text style={[globalStyle.btnText, styles.semiBold]}>Tutup</Text>
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