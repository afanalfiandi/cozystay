import { RefreshControl, Modal, ActivityIndicator, TextInput, Image, StyleSheet, ScrollView, StatusBar, TouchableOpacity, Text, View, Dimensions, BackHandler, SafeAreaView, ToastAndroid } from 'react-native'
import React, { useState } from 'react'
import { globalColor } from '../../style/globalColor';
import { globalStyle } from '../../style/globalStyle';
import { useFonts, Poppins_400Regular, Poppins_400Regular_Italic, Poppins_600SemiBold, Poppins_600SemiBold_Italic, Poppins_700Bold, Poppins_700Bold_Italic } from '@expo-google-fonts/poppins';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { RadioButton, Checkbox } from 'react-native-paper';
import getPayment from '../../function/getPayment';
import Rupiah from '../../component/Rupiah';
import { dirUrl } from '../../config/baseUrl';
import viewDetailSewa from '../../function/viewDetailSewa';
import bni from '../../function/payment/bni';
import paymentDb from '../../function/payment/paymentDb';
import mandiri from '../../function/payment/mandiri';
import bri from '../../function/payment/bri';
import cash from '../../function/payment/cash';
import bca from '../../function/payment/bca';

const CustomerSewaDetail = ({ route }) => {
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);
    const [modal, setModal] = useState(false);
    const [refresh, setRefresh] = useState(Math.random());
    const [status, setStatus] = useState(1);
    const [paymentModal, setPaymentModal] = useState(false);
    const [payment, setPayment] = useState(0);
    const [paymentLabel, setPaymentLabel] = useState('Metode Pembayaran Belum Diatur');

    const [paymentData, setPaymetData] = useState([]);

    const [result, setResult] = useState([]);

    const alamat = route.params.alamat;
    const fasilitas = route.params.fasilitas;
    const harga = route.params.harga;
    const label = route.params.label;
    const jenis_kos = route.params.jenis_kos;
    const nama_kos = route.params.nama_kos;
    const no_transaksi = route.params.no_transaksi;

    useFocusEffect(
        React.useCallback(() => {
            getPayment().then((result) => {
                setPaymetData(result);
            })

            viewDetailSewa(no_transaksi).then((result) => {
                setResult(result);
            })
            const backAction = () => {
                navigation.navigate('CustomerHome');
            };

            const backHandler = BackHandler.addEventListener(
                "hardwareBackPress",
                backAction
            );
            return () => backHandler.remove(); s
        }, [refresh]));


    let [fontsLoaded, fontError] = useFonts({
        Poppins_400Regular, Poppins_400Regular_Italic, Poppins_600SemiBold, Poppins_600SemiBold_Italic, Poppins_700Bold, Poppins_700Bold_Italic
    });

    if (!fontsLoaded && !fontError) {
        return null;
    }

    const onPayment = async () => {
        if (payment == '') {
            ToastAndroid.show('Mohon pilih metode pembayaran', 3000);
        } else {
            setLoading(!loading);
            setTimeout(() => {
                setLoading(false);
                if (payment == 1) { // BNI
                    bni(
                        no_transaksi,
                        harga,
                    ).then((result) => {
                        if (result.status_code == '201') {
                            console.log(result);
                            paymentDb(no_transaksi, payment).then((res) => {
                                console.log(res)
                                if (res.status == '1') {
                                    ToastAndroid.show('Berhasil!', 3000);
                                    navigation.navigate('CustomerPayment', {
                                        currency: result.currency,
                                        expiry_time: result.expiry_time,
                                        fraud_status: result.fraud_status,
                                        gross_amount: result.gross_amount,
                                        merchant_id: result.merchant_id,
                                        order_id: result.order_id,
                                        payment_type: result.payment_type,
                                        status_code: result.status_code,
                                        status_message: result.status_message,
                                        transaction_id: result.transaction_id,
                                        transaction_status: result.transaction_status,
                                        transaction_time: result.transaction_time,
                                        va_numbers: [
                                            {
                                                bank: result.va_numbers[0].bank,
                                                va_number: result.va_numbers[0].va_number,
                                            }
                                        ]
                                    });
                                } else {
                                    ToastAndroid.show('Pembayaran gagal dilakukan!', 3000);
                                }
                            })
                        } else {
                            ToastAndroid.show('Pembayaran online gagal dilakukan!', 3000);
                        }
                    })
                } else if (payment == 2) { // Mandiri
                    mandiri(
                        no_transaksi,
                        harga,
                    ).then((result) => {
                        console.log(result);
                        if (result.status_code == '201') {
                            console.log(result);
                            paymentDb(no_transaksi, payment).then((res) => {
                                console.log(res)
                                if (res.status == '1') {
                                    ToastAndroid.show('Berhasil!', 3000);
                                    navigation.navigate('MandiriPayment', {
                                        bill_key: result.bill_key,
                                        biller_code: result.biller_code,
                                        currency: result.currency,
                                        expiry_time: result.expiry_time,
                                        fraud_status: result.fraud_status,
                                        gross_amount: result.gross_amount,
                                        merchant_id: result.merchant_id,
                                        order_id: result.order_id,
                                        payment_type: result.payment_type,
                                        status_code: result.status_code,
                                        status_message: result.status_message,
                                        transaction_id: result.transaction_id,
                                        transaction_status: result.transaction_status,
                                        transaction_time: result.transaction_time,
                                        bank: 'mandiri'
                                    });
                                } else {
                                    ToastAndroid.show('Pembayaran gagal dilakukan!', 3000);
                                }
                            })
                        } else {
                            ToastAndroid.show('Pembayaran online gagal dilakukan!', 3000);
                        }
                    })
                } else if (payment == 3) { // BRI
                    bri(
                        no_transaksi,
                        harga,
                    ).then((result) => {
                        if (result.status_code == '201') {
                            console.log(result);
                            paymentDb(no_transaksi, payment).then((res) => {
                                console.log(res)
                                if (res.status == '1') {
                                    ToastAndroid.show('Berhasil!', 3000);
                                    navigation.navigate('CustomerPayment', {
                                        currency: result.currency,
                                        expiry_time: result.expiry_time,
                                        fraud_status: result.fraud_status,
                                        gross_amount: result.gross_amount,
                                        merchant_id: result.merchant_id,
                                        order_id: result.order_id,
                                        payment_type: result.payment_type,
                                        status_code: result.status_code,
                                        status_message: result.status_message,
                                        transaction_id: result.transaction_id,
                                        transaction_status: result.transaction_status,
                                        transaction_time: result.transaction_time,
                                        va_numbers: [
                                            {
                                                bank: result.va_numbers[0].bank,
                                                va_number: result.va_numbers[0].va_number,
                                            }
                                        ]
                                    });
                                } else {
                                    ToastAndroid.show('Pembayaran gagal dilakukan!', 3000);
                                }
                            })
                        } else {
                            ToastAndroid.show('Pembayaran online gagal dilakukan!', 3000);
                        }
                    })
                } else if (payment == 4) { // Bayar ditempat
                    paymentDb(no_transaksi, payment).then((res) => {
                        console.log(res)
                        if (res.status == '1') {
                            ToastAndroid.show('Berhasil, silahkan lakukan pembayaran sesuai jumlah tagihan!', 3000);
                            navigation.navigate('CustomerHistory');
                        } else {
                            ToastAndroid.show('Pembayaran gagal dilakukan!', 3000);
                        }
                    })
                } else if (payment == 7) { // BCA
                    bca(
                        no_transaksi,
                        harga,
                    ).then((result) => {
                        console.log(result);
                        if (result.status_code == '201') {
                            paymentDb(no_transaksi, payment).then((res) => {
                                console.log(res)
                                if (res.status == '1') {
                                    ToastAndroid.show('Berhasil!', 3000);
                                    navigation.navigate('CustomerPayment', {
                                        currency: result.currency,
                                        expiry_time: result.expiry_time,
                                        fraud_status: result.fraud_status,
                                        gross_amount: result.gross_amount,
                                        merchant_id: result.merchant_id,
                                        order_id: result.order_id,
                                        payment_type: result.payment_type,
                                        status_code: result.status_code,
                                        status_message: result.status_message,
                                        transaction_id: result.transaction_id,
                                        transaction_status: result.transaction_status,
                                        transaction_time: result.transaction_time,
                                        va_numbers: [
                                            {
                                                bank: result.va_numbers[0].bank,
                                                va_number: result.va_numbers[0].va_number,
                                            }
                                        ]
                                    });
                                } else {
                                    ToastAndroid.show('Pembayaran gagal dilakukan!', 3000);
                                }
                            })
                        } else {
                            ToastAndroid.show('Pembayaran online gagal dilakukan!', 3000);
                        }
                    })
                }
                // navigation.navigate('CustomerPayment');
            }, 2000);
        }
    }
    return (
        <SafeAreaView style={[globalStyle.container, { justifyContent: 'flex-start', padding: 0 }]}>
            <StatusBar
                animated={true}
                backgroundColor={globalColor.white}
                barStyle='dark-content'
            />
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
                visible={paymentModal}
                onRequestClose={() => {
                    setPaymentModal(!paymentModal);
                }}>
                <View style={[globalStyle.modalFormContainer, { backgroundColor: 'white', alignItems: 'center', justifyContent: 'flex-start', }]}>
                    <View style={{ alignItems: 'flex-end', width: '100%' }}>
                        <TouchableOpacity style={{ padding: 7 }} onPress={() => {
                            setPaymentModal(!paymentModal);
                        }}>
                            <Image style={{ width: 15, height: 15 }} source={require('../../assets/icon/close-blue.png')} />
                        </TouchableOpacity>
                    </View>
                    <View style={globalStyle.modalForm}>
                        {paymentData.map((item, index) => {
                            return (
                                <View key={index}>
                                    <Text style={[globalStyle.label, styles.semiBold, globalStyle.text, { marginTop: 7 }]}>{item.jenis_pembayaran}</Text>
                                    <View style={[globalStyle.formGroup, globalStyle.spaceBetween, globalStyle.input, { height: 50, paddingVertical: 0 }]}>
                                        <View style={[globalStyle.imgInputContainer, { marginHorizontal: 10 }]}>
                                            <Image resizeMode='contain' style={[globalStyle.imgInput, { width: 32, height: 35 }]} source={{ uri: dirUrl + 'payment/' + item.img }} />
                                        </View>
                                        <TouchableOpacity style={[globalStyle.inputSelect, { width: '70%' }]} onPress={() => {
                                            setPaymentModal(!paymentModal);
                                            setPayment(item.id_jenis_pembayaran);
                                            setPaymentLabel(item.jenis_pembayaran);
                                        }}>
                                            <Text style={[styles.regular]}> {item.jenis_pembayaran} </Text>
                                        </TouchableOpacity>
                                        <View style={globalStyle.imgInputContainer}>
                                            <Image resizeMode='contain' style={[globalStyle.imgInput, { width: 45 }]} source={require('../../assets/icon/arrow-right-sm.png')} />
                                        </View>
                                    </View>
                                </View>
                            )
                        })}
                    </View>
                </View>
            </Modal>
            <View style={[styles.header, { paddingHorizontal: 10, paddingTop: 15 }]}>
                <View style={globalStyle.headerTitleContainer}>
                    <Text style={[globalStyle.text, styles.semiBold]}>Detail Sewa</Text>
                </View>
            </View>

            <View style={[globalStyle.content, { backgroundColor: 'transparent', paddingHorizontal: 25 }]}>
                <ScrollView>
                    <View style={[globalStyle.listContainer]}>
                        <View style={[globalStyle.listCol, globalStyle.listColImg]}>
                            <Image style={globalStyle.listImg} source={require('../../assets/kost/potrait-1.png')} />
                        </View>
                        <View style={globalStyle.listCol}>
                            <View style={globalStyle.listHeader}>
                                <View style={globalStyle.listCategoryContainer}>
                                    <Text style={[globalStyle.textSm, styles.regular, globalStyle.headerTxt]}>{jenis_kos}</Text>
                                </View>
                            </View>
                            <View style={globalStyle.listContent}>
                                <Text style={[globalStyle.text, styles.semiBold]}>{nama_kos}</Text>
                                <View style={globalStyle.listAddressContainer}>
                                    <Image style={{ marginRight: 5 }} source={require('../../assets/icon/location-sm.png')} />
                                    <Text style={[globalStyle.textSm, styles.regular]}>{alamat}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'flex-start', justifyContent: 'flex-start' }}>

                                    <View style={globalStyle.facilityContainer}>
                                        <Text style={[globalStyle.textSm, styles.regular, globalStyle.headerTxt]}>{fasilitas} </Text>
                                    </View>
                                </View>
                                <View style={[globalStyle.costContainer, { alignItems: 'center' }]}>
                                    <Rupiah numb={harga} />
                                    <Text style={[globalStyle.textSm, styles.regular]}>/{label}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={globalStyle.divider}></View>
                    <View style={[globalStyle.form]}>
                        <View>
                            <Text style={[styles.semiBold, globalStyle.text, { marginTop: 7 }]}>Status Pengajuan Sewa</Text>
                            <Text style={[styles.regular, globalStyle.text, { color: globalColor.muted }]}>{result.status_sewa}</Text>
                        </View>
                        <View>
                            <View style={globalStyle.spaceBetween}>
                                <Text style={[globalStyle.label, styles.semiBold, globalStyle.text, { marginTop: 7 }]}>Metode Pembayaran</Text>
                                <TouchableOpacity style={{ opacity: status == 0 ? 0.5 : 1 }} disabled={status == 0 ? true : false} onPress={() => {
                                    setPaymentModal(!paymentModal)
                                }}>
                                    <Text style={[globalStyle.label, styles.semiBold, globalStyle.text, { marginTop: 7 }]}>Ubah</Text>
                                </TouchableOpacity>
                            </View>
                            <Text style={[styles.regular, globalStyle.text, { color: globalColor.muted }]}>{paymentLabel}</Text>
                        </View>
                    </View>
                    <View style={[globalStyle.noteContainer, globalStyle.spaceBetween, { flexWrap: 'wrap' }]}>
                        <Image source={require('../../assets/icon/outline-warning-blue.png')} style={{ marginRight: 20 }} />
                        <View style={[{ flex: 1 }]}>
                            <Text style={[styles.bold, { textAlign: 'justify' }]}>Note :
                                <Text style={[styles.regular]}> Pembayaran dilakukan setelah pemilik kos menerima pengajuan.</Text>
                            </Text>
                        </View>
                    </View>
                </ScrollView>
            </View>
            <View style={[globalStyle.formGroup, { position: 'absolute', bottom: 20, width: '90%' }]}>
                <TouchableOpacity disabled={result.id_status_sewa == 1 ? true : false} style={[globalStyle.btnPrimary, { opacity: result.id_status_sewa == 1 ? 0.5 : 1 }]} onPress={onPayment}>
                    <Text style={[globalStyle.btnText, styles.bold]}>bayar sekarang</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[globalStyle.btnOutlinePrimary, { marginTop: 10 }]} onPress={() => {
                    navigation.navigate('CustomerHome')
                }}>
                    <Text style={[globalStyle.btnText, styles.bold, { color: globalColor.primary }]}>beranda</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView >
    )
}

export default CustomerSewaDetail

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