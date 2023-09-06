import { Modal, ActivityIndicator, TextInput, Image, StyleSheet, ScrollView, StatusBar, TouchableOpacity, Text, View, Dimensions, BackHandler, SafeAreaView, ToastAndroid } from 'react-native'
import React, { useState } from 'react'
import { globalColor } from '../../style/globalColor';
import { globalStyle } from '../../style/globalStyle';
import { useFonts, Poppins_400Regular, Poppins_400Regular_Italic, Poppins_600SemiBold, Poppins_600SemiBold_Italic, Poppins_700Bold, Poppins_700Bold_Italic } from '@expo-google-fonts/poppins';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { RadioButton, Checkbox } from 'react-native-paper';

const CustomerSewa = () => {
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);
    const [modal, setModal] = useState(false);
    const [refresh, setRefresh] = useState(Math.random());

    useFocusEffect(
        React.useCallback(() => {

        }, [refresh]));

    let [fontsLoaded, fontError] = useFonts({
        Poppins_400Regular, Poppins_400Regular_Italic, Poppins_600SemiBold, Poppins_600SemiBold_Italic, Poppins_700Bold, Poppins_700Bold_Italic
    });

    if (!fontsLoaded && !fontError) {
        return null;
    }

    const onSewa = () => {
        setLoading(!loading);
        setTimeout(() => {
            ToastAndroid.show('Pengajuan sewa berhasil!', 3000);
            navigation.navigate('CustomerSewaDetail');
            setLoading(false);
        }, 2000);
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
            <View style={[styles.header, { paddingHorizontal: 10, paddingTop: 15 }]}>
                <TouchableOpacity style={globalStyle.leftBtnTop} onPress={()=>{
                    navigation.goBack();
                }}>
                    <Image source={require('../../assets/icon/arrow-left.png')} />
                </TouchableOpacity>
                <View style={globalStyle.headerTitleContainer}>
                    <Text style={[globalStyle.text, styles.semiBold]}>Pengajuan Sewa</Text>
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
                    <View style={globalStyle.form}>
                        <Text style={[globalStyle.text, styles.bold]}>Informasi Penyewa</Text>
                        <View>
                            <Text style={[styles.semiBold, globalStyle.text, { marginTop: 7 }]}>Nama</Text>
                            <Text style={[styles.semiBold, globalStyle.text, { color: globalColor.muted }]}>Nama</Text>
                        </View>
                        <View>
                            <Text style={[styles.semiBold, globalStyle.text, { marginTop: 7 }]}>No. Telepon/Whatsapp</Text>
                            <Text style={[styles.semiBold, globalStyle.text, { color: globalColor.muted }]}>+628123123213</Text>
                        </View>
                        <View>
                            <Text style={[styles.semiBold, globalStyle.text, { marginTop: 7 }]}>Jenis Kelamin</Text>
                            <Text style={[styles.semiBold, globalStyle.text, { color: globalColor.muted }]}>Perempuan</Text>
                        </View>
                    </View>
                    <View style={globalStyle.divider}></View>
                    <View style={globalStyle.form}>
                        <Text style={[globalStyle.text, styles.bold]}>Dokumen Persyaratan</Text>
                        <View>
                            <TouchableOpacity style={globalStyle.photoBtn}>
                                <Image source={require('../../assets/icon/outline-camera-blue-lg.png')} />
                            </TouchableOpacity>
                            <Text style={[styles.semiBold, globalStyle.text, { color: globalColor.muted }]}>Upload Foto KTP</Text>
                        </View>
                    </View>
                    <View style={globalStyle.form}>
                        <View>
                            <View style={globalStyle.spaceBetween}>
                                <Text style={[globalStyle.label, styles.semiBold, globalStyle.text, { marginTop: 7 }]}>Tanggal Mulai Kos</Text>
                                <TouchableOpacity>
                                    <Text style={[globalStyle.label, styles.semiBold, globalStyle.text, { marginTop: 7 }]}>Atur</Text>
                                </TouchableOpacity>
                            </View>
                            <Text style={[styles.semiBold, globalStyle.text, { color: globalColor.muted }]}>Tanggal Belum Diatur</Text>
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
                    <View style={{ paddingBottom: 100 }}></View>
                </ScrollView>
                <View style={[globalStyle.contentFooter, { paddingTop: 15, position: 'absolute', bottom: 0, width: Dimensions.get("screen").width, backgroundColor: 'white' }]}>
                    <Text style={[globalStyle.text, styles.bold]}>Rp. 500.000/bulan</Text>
                    <TouchableOpacity style={globalStyle.footerBtn} onPress={onSewa}>
                        <Text style={[globalStyle.textWhite, styles.bold]}>Ajukan sewa</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </SafeAreaView >
    )
}

export default CustomerSewa

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