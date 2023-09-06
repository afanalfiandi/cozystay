import { Modal, ActivityIndicator, TextInput, Image, StyleSheet, ScrollView, StatusBar, TouchableOpacity, Text, View, Dimensions, BackHandler, SafeAreaView, ToastAndroid } from 'react-native'
import React, { useState } from 'react'
import { globalColor } from '../../style/globalColor';
import { globalStyle } from '../../style/globalStyle';
import { useFonts, Poppins_400Regular, Poppins_400Regular_Italic, Poppins_600SemiBold, Poppins_600SemiBold_Italic, Poppins_700Bold, Poppins_700Bold_Italic } from '@expo-google-fonts/poppins';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { RadioButton, Checkbox } from 'react-native-paper';

const CustomerSewaDetail = () => {
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);
    const [modal, setModal] = useState(false);
    const [refresh, setRefresh] = useState(Math.random());
    const [status, setStatus] = useState(1);
    const [paymentModal, setPaymentModal] = useState(false);
    const [payment, setPayment] = useState(0);
    const [paymentLabel, setPaymentLabel] = useState('Metode Pembayaran Belum Diatur')
    useFocusEffect(
        React.useCallback(() => {
            const backAction = () => {
                navigation.navigate('CustomerView');
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

    const fasilitas = [
        {
            id: 1,
            facility: 'Kamar mandi dalam'
        },
        {
            id: 2,
            facility: 'AC'
        },
        {
            id: 3,
            facility: 'Wi-Fi'
        },
        {
            id: 4,
            facility: 'Listrik'
        },
        {
            id: 5,
            facility: 'PDAM'
        },
        {
            id: 6,
            facility: 'Dapur bersama'
        },
    ]

    const onPayment = async () => {
        setLoading(!loading);
        setTimeout(() => {
            setLoading(false);
            navigation.navigate('CustomerPayment');
        }, 2000);
    }
    return (
        <SafeAreaView style={[globalStyle.container, { justifyContent: 'flex-start', padding: 0 }]}>
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
                        <View>
                            <Text style={[globalStyle.label, styles.semiBold, globalStyle.text, { marginTop: 7 }]}>Cash</Text>
                            <View style={[globalStyle.formGroup, globalStyle.spaceBetween, globalStyle.input, { height: 50, paddingVertical: 0 }]}>
                                <View style={[globalStyle.imgInputContainer, { marginHorizontal: 10 }]}>
                                    <Image resizeMode='contain' style={[globalStyle.imgInput, { width: 30 }]} source={require('../../assets/payment/cash.png')} />
                                </View>
                                <TouchableOpacity style={[globalStyle.inputSelect, { width: '70%' }]} onPress={() => {
                                    setPaymentModal(!paymentModal);
                                    setPaymentLabel('Bayar Ditempat');
                                }}>
                                    <Text style={[styles.regular]}> Bayar Ditempat </Text>
                                </TouchableOpacity>
                                <View style={globalStyle.imgInputContainer}>
                                    <Image resizeMode='contain' style={[globalStyle.imgInput, { width: 45 }]} source={require('../../assets/icon/arrow-right-sm.png')} />
                                </View>
                            </View>
                        </View>

                        <View>
                            <Text style={[globalStyle.label, styles.semiBold, globalStyle.text, { marginTop: 7 }]}>E-Money</Text>
                            <View style={[globalStyle.formGroup, globalStyle.spaceBetween, globalStyle.input, { height: 50, paddingVertical: 0 }]}>
                                <View style={[globalStyle.imgInputContainer, { marginHorizontal: 10 }]}>
                                    <Image resizeMode='contain' style={[globalStyle.imgInput, { width: 45 }]} source={require('../../assets/payment/qris.png')} />
                                </View>
                                <TouchableOpacity style={[globalStyle.inputSelect, { width: '70%' }]} onPress={() => {
                                    setPaymentModal(!paymentModal);
                                    setPaymentLabel('QRIS');
                                }}>
                                    <Text style={[styles.regular]}> QRIS</Text>
                                </TouchableOpacity>
                                <View style={globalStyle.imgInputContainer}>
                                    <Image resizeMode='contain' style={globalStyle.imgInput} source={require('../../assets/icon/arrow-right-sm.png')} />
                                </View>
                            </View>
                        </View>
                        <View>
                            <Text style={[globalStyle.label, styles.semiBold, globalStyle.text, { marginTop: 7 }]}>Bank Transfer</Text>
                            <View style={[globalStyle.formGroup, globalStyle.spaceBetween, globalStyle.input, { height: 50, paddingVertical: 0 }]}>
                                <View style={[globalStyle.imgInputContainer, { marginHorizontal: 10 }]}>
                                    <Image resizeMode='contain' style={[globalStyle.imgInput, { width: 45 }]} source={require('../../assets/payment/bni.png')} />
                                </View>
                                <TouchableOpacity style={[globalStyle.inputSelect, { width: '70%' }]} onPress={() => {
                                    setPaymentModal(!paymentModal);
                                    setPaymentLabel('BNI');
                                }}>
                                    <Text style={[styles.regular]}> BNI</Text>
                                </TouchableOpacity>
                                <View style={globalStyle.imgInputContainer}>
                                    <Image resizeMode='contain' style={globalStyle.imgInput} source={require('../../assets/icon/arrow-right-sm.png')} />
                                </View>
                            </View>
                            <View style={[globalStyle.formGroup, globalStyle.spaceBetween, globalStyle.input, { height: 50, paddingVertical: 0 }]}>
                                <View style={[globalStyle.imgInputContainer, { marginHorizontal: 10 }]}>
                                    <Image resizeMode='contain' style={[globalStyle.imgInput, { width: 45 }]} source={require('../../assets/payment/mandiri.png')} />
                                </View>
                                <TouchableOpacity style={[globalStyle.inputSelect, { width: '70%' }]} onPress={() => {
                                    setPaymentModal(!paymentModal);
                                    setPaymentLabel('Mandiri');
                                }}>
                                    <Text style={[styles.regular]}> MANDIRI</Text>
                                </TouchableOpacity>
                                <View style={globalStyle.imgInputContainer}>
                                    <Image resizeMode='contain' style={globalStyle.imgInput} source={require('../../assets/icon/arrow-right-sm.png')} />
                                </View>
                            </View>
                            <View style={[globalStyle.formGroup, globalStyle.spaceBetween, globalStyle.input, { height: 50, paddingVertical: 0 }]}>
                                <View style={[globalStyle.imgInputContainer, { marginHorizontal: 10 }]}>
                                    <Image resizeMode='contain' style={[globalStyle.imgInput, { width: 45 }]} source={require('../../assets/payment/bri.png')} />
                                </View>
                                <TouchableOpacity style={[globalStyle.inputSelect, { width: '70%' }]} onPress={() => {
                                    setPaymentModal(!paymentModal);
                                    setPaymentLabel('BRI');
                                }}>
                                    <Text style={[styles.regular]}> BRI</Text>
                                </TouchableOpacity>
                                <View style={globalStyle.imgInputContainer}>
                                    <Image resizeMode='contain' style={globalStyle.imgInput} source={require('../../assets/icon/arrow-right-sm.png')} />
                                </View>
                            </View>
                        </View>
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
                                    <Text style={[globalStyle.textSm, styles.regular, globalStyle.headerTxt]}>Putri</Text>
                                </View>
                            </View>
                            <View style={globalStyle.listContent}>
                                <Text style={[globalStyle.text, styles.semiBold]}>Bauhaus Kost</Text>
                                <View style={globalStyle.listAddressContainer}>
                                    <Image style={{ marginRight: 5 }} source={require('../../assets/icon/location-sm.png')} />
                                    <Text style={[globalStyle.textSm, styles.regular]}>Jl. Dr. Angka</Text>
                                </View>
                                <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                                    {fasilitas.map((val, index) => {
                                        return (
                                            <View style={globalStyle.facilityContainer} key={index}>
                                                <Text style={[globalStyle.textSm, styles.regular, globalStyle.headerTxt]}>{val.facility} </Text>
                                            </View>
                                        )
                                    })}
                                </View>
                                <View style={globalStyle.costContainer}>
                                    <Text style={[globalStyle.textSm, styles.bold]}>Rp. 500.000</Text>
                                    <Text style={[globalStyle.textSm, styles.regular]}>/bulan</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={globalStyle.divider}></View>
                    <View style={[globalStyle.form]}>
                        <View>
                            <Text style={[styles.semiBold, globalStyle.text, { marginTop: 7 }]}>Status Pengajuan Sewa</Text>
                            <Text style={[styles.regular, globalStyle.text, { color: globalColor.muted }]}>Menunggu Persetujuan</Text>
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
                <TouchableOpacity disabled={status == 0 ? true : false} style={[globalStyle.btnPrimary, { opacity: status == 0 ? 0.5 : 1 }]} onPress={onPayment}>
                    <Text style={[globalStyle.btnText, styles.bold]}>bayar sekarang</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[globalStyle.btnOutlinePrimary, { marginTop: 10 }]} onPress={()=>{
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